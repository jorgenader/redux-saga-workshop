import ReconnectingWebSocket from 'reconnecting-websocket';
import EventEmitter from 'events';
import uuid from 'uuid';

/**
 * Django Channels Connection service
 *
 * Expects connection through demultiplexer
 */
export default class ChannelsService extends EventEmitter {
    /**
     * Create Channel Service
     * @param url
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

    static generateUUID() {
        return uuid.v4();
    }

    constructor(url) {
        super();

        const scheme = window.location.protocol === 'https:' ? 'wss' : 'ws';
        this.socket = new ReconnectingWebSocket(`${scheme}//${window.location.host}/${url}`);

        this.socket.onopen = () => {
            this.init();
            this.socket.onopen = undefined;
        };
        this.socket.onclose = (e) => {
            this.emit('close', e);
        };
    }

    init() {
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
        this.emit('connect');
    }

    close() {
        this.removeAllListeners();
        this.socket.close();
    }

    static createMessage(stream, payload) {
        return {
            stream,
            payload: {...payload, request_id: ChannelsService.generateUUID()},
        };
    }

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

    addSubscriber(cb) {
        this.on('notification', cb);
    }

    removeSubscriber(cb) {
        this.removeListener('notification', cb);
    }
}
