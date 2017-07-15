import {take, put, fork, all} from 'redux-saga/effects';

import {pushData} from './ChannelsSaga';

/**
 * Handle any incoming data.
 *
 * @param {string} stream - Stream name for incoming or sent response.
 * @param {Object} payload - Response object.
 * @param {string} payload.action - Response action.
 * @param {Object} payload.data - Response data for action.
 * @param {Array} [payload.errors] - Response errors, not present for subscriptions.
 * @param {Number} [payload.response_status] - Response status, not present for subscriptions.
 * @param {string} [payload.request_id] - Response request ID, not present for subscriptions.
 * @param {string} [payload.model] - Response model name formatted as [app.model], only present for subscriptions.
 */
export function* processData({stream, payload}) {
    // TODO : add data processing (part of the workshop
    console.log(stream, payload);
}

/**
 * Create subscription for 'stream'.
 * @param stream
 */
export function* subscribeForStream(stream) {
    yield put(pushData(stream, {action: 'subscribe', data: {action: 'create'}}));
    yield put(pushData(stream, {action: 'subscribe', data: {action: 'update'}}));
    yield put(pushData(stream, {action: 'subscribe', data: {action: 'delete'}}));
}
