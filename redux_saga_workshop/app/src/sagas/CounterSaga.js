import {delay} from 'redux-saga';
import {select, put, call, all, takeLatest, takeEvery} from 'redux-saga/effects';

import {actions, selectCounter} from 'ducks/counter';

const TRIGGER_INCREASE = 'trigger/counter/increase';
const TRIGGER_DECREASE = 'trigger/counter/decrease';
const TRIGGER_RESET = 'trigger/counter/reset';

export const triggerIncrease = () => ({type: TRIGGER_INCREASE});
export const triggerDecrease = () => ({type: TRIGGER_DECREASE});
export const triggerReset = () => ({type: TRIGGER_RESET});

export function* increase() {
    const counter = yield select(selectCounter);
    yield put(actions.setCounter(counter + 100));
}

export function* decrease() {
    const counter = yield select(selectCounter);
    if (counter > 0) {
        yield put(actions.setCounter(counter - 1));
    }
}

export function* reset() {
    let counter = yield select(selectCounter);
    let i = counter;

    while (i >= 0) {
        yield put(actions.setCounter(i));
        yield call(delay, 1000);
        counter = yield select(selectCounter);
        i = counter;
        i -= 1;
    }
}

export default function* rootSaga() {
    yield all([
        yield takeEvery(TRIGGER_INCREASE, increase),
        yield takeEvery(TRIGGER_DECREASE, decrease),
        yield takeLatest(TRIGGER_RESET, reset),
    ]);
}
