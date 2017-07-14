import {select, put, all, takeLatest, takeEvery} from 'redux-saga/effects';

import {
    actions, TRIGGER_RESET, TRIGGER_INCREASE, TRIGGER_DECREASE,
} from 'ducks/counter';

const selectCounter = ({counter}) => counter;

function* increase() {
    const counter = yield select(selectCounter);
    yield put(actions.setCounter(counter + 1));
}

function* decrease() {
    const counter = yield select(selectCounter);
    if (counter > 0) {
        yield put(actions.setCounter(counter - 1));
    }
}

function* reset() {
    yield put(actions.setCounter(0));
}

export default function* rootSaga() {
    yield all([
        yield takeEvery(TRIGGER_INCREASE, increase),
        yield takeEvery(TRIGGER_DECREASE, decrease),
        yield takeLatest(TRIGGER_RESET, reset),
    ]);
}
