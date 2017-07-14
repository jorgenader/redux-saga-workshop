import {all, fork} from 'redux-saga/effects';

import PageManager from 'sagas/PageManager';

export default function* rootSaga() {
    yield all([
        fork(PageManager),
    ]);
}
