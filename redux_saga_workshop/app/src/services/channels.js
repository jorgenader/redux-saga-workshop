import ReconnectingWebSocket from 'reconnecting-websocket';
import EventEmitter from 'events';
import uuid from 'uuid';

/**
 * Django Channels Connection service
 *
 * Expects connection through demultiplexer.
 */
export default class ChannelsService extends EventEmitter {
    /**
     * Create Channel Service
     * @param {string} url - path to connect to.
     * @returns {Promise}
     */
    static createService(url) {
        return new Promise((resolve, reject) => {
            const connection = new ChannelsService(url);

            connection.socket.addEventListener('error', reject);
            connection.once('connect', () => {
                connection.socket.removeEventListener('error', reject);
                resolve(connection);
            });
        });
    }

    /**
     * Generate UUID for request to be able to handle only correct message.
     * @returns {string} - Unique ID.
     */
    static generateUUID() {
        return uuid.v4();
    }

    /**
     * Instantiate Service object.
     * @param url - Full path to server, uses current `window.location.host` as base URI.
     */
    constructor(url) {
        super();

        const scheme = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        this.socket = new ReconnectingWebSocket(`${scheme}//${window.location.host}/${url}`);
        this.connected = false;

        this.socket.onopen = () => {
            this.init();
        };
        this.socket.onclose = (e) => {
            this.emit('close', e);
        };
    }

    /**
     * Called after connection is established.
     *
     * Emits: `connect` when connection is created.
     */
    init() {
        // when reconnecting, we don't need to recreate notification listener
        if (!this.connected) {
            const onSubscribers = (jsonMessage) => {
                if (!jsonMessage.data) {
                    return;
                }
                const message = JSON.parse(jsonMessage.data);
                if (message.payload && !message.payload.request_id) {
                    this.emit('notification', message);
                }
            };

            this.addEventListener('notification', onSubscribers);
        }

        // only emit when connection is ready
        if (this.socket.readyState === 1) {
            this.connected = true;
            this.emit('connect');
        }
    }

    /**
     * Close WebSocket and remove all listeners.
     */
    close() {
        this.removeAllListeners();
        this.socket.close();
    }

    /**
     * Format outgoing message.
     * @param {string} stream - Stream name
     * @param {Object} payload - Payload to send
     * @returns {Object} Formatted message - {{stream: *, payload: {request_id: string, *}}}
     */
    static createMessage(stream, payload) {
        return {
            stream,
            payload: {...payload, request_id: ChannelsService.generateUUID()},
        };
    }

    /**
     * Subscribe for event.
     * @param {string} stream - Stream name.
     * @param {string} action - Event action to subscribe for.
     * @param {Number} [pk] - Optionally subscribe only for single Model object.
     */
    subscribe(stream, action, pk = undefined) {
        const message = {
            stream,
            payload: {
                action: 'subscribe',
                data: {
                    action,
                    pk,
                },
            },
        };
        this.socket.send(JSON.stringify(message));
    }

    /**
     * Send message to server and receive correct message.
     * @param stream
     * @param payload
     * @returns {Promise.<{result}>}
     */
    send(stream, payload) {
        const message = ChannelsService.createMessage(stream, payload);
        return new Promise((resolve, reject) => {
            const onMessage = (data) => {
                const incomingMessage = JSON.parse(data.data);
                const incomingPayload = incomingMessage.payload;

                if (incomingPayload.request_id === message.payload.request_id) {
                    this.socket.removeEventListener('message', onMessage);
                } else {
                    return;
                }

                if (incomingPayload.errors && incomingPayload.errors.length > 0) {
                    reject({
                        statusCode: incomingPayload.response_code,
                        errors: incomingPayload.errors,
                    });
                } else {
                    resolve(incomingMessage);
                }
            };
            this.socket.addEventListener('message', onMessage);
            this.socket.send(JSON.stringify(message));
        })
            .then(result => ({result}))
            .catch(error => ({error}));
    }

    /**
     * Add Subscriber callback
     * @param {function} cb
     */
    addSubscriber(cb) {
        this.on('notification', cb);
    }

    /**
     * Remove Subscriber callback
     * @param {function} cb
     */
    removeSubscriber(cb) {
        this.removeListener('notification', cb);
    }
}
