import {eventChannel} from 'redux-saga';
import {take, fork, race} from 'redux-saga/effects';

import Channels from 'services/channels';
import {processData} from 'sagas/DataProcessingSaga';

const OUTGOING_STREAM = 'channels/OUTGOING_STREAM';

export const pushData = (stream, payload) => ({
    type: OUTGOING_STREAM, stream, payload,
});

/**
 * Create event channel and push data to it when notifications are received from server.
 * @param {Channels} channelsService - Create ChannelsService subscriptions.
 * @param {function} channelsService.addSubscriber - Add ChannelsService subscriptions.
 * @param {function} channelsService.removeSubscriber - Remove ChannelsService subscriptions.
 * @returns {Channel} Created Event channel.
 */
function createEventChannel(channelsService) {
    return eventChannel((emit) => {
        const onNotification = (data) => {
            emit(data);
        };

        channelsService.addSubscriber(onNotification);

        return () => {
            channelsService.removeSubscriber(onNotification);
        };
    });
}

/**
 * Send payload to server and wait for response, process data in forked saga.
 * @param {Channels} service - Channels service connection.
 * @param {function} service.send - Send data to server, returns a Promise.
 * @param {Object} data - Data to send to server
 * @param {string} data.stream - Stream name to send to server.
 * @param {Object} data.payload - Payload object to send to server.
 */
function* sendPayload(service, data) {
    const {stream, payload} = data;
    const {result, error} = yield service.send(stream, payload);
    yield fork(processData, result, error);
}

export default function* (mocked = false) {
    const channelsService = yield Channels.createService('/stream', {mocked});
    const notificationsChannel = yield createEventChannel(channelsService);

    try {
        while (true) {
            const {incoming, outgoing} = yield race({
                incoming: yield take(notificationsChannel),
                outgoing: yield take(OUTGOING_STREAM),
            });

            if (outgoing) {
                // fork this so that this saga would always be available to take in data
                yield fork(sendPayload, channelsService, outgoing);
            } else {
                yield fork(processData, incoming);
            }
        }
    } finally {
        channelsService.close();
    }
}
