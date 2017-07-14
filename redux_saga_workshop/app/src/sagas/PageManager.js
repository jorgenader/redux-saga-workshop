import {take, fork, cancel, select} from 'redux-saga/effects';

// page sagas
import {SAGA_PAGE_LOAD, SAGA_PAGE_UNLOAD} from 'actions';
import counterSagaWatcher from 'sagas/CounterSaga';


const locationSelector = ({router: {location}}) => (location);

const matches = [
    {filter: /^\/counter/g, saga: counterSagaWatcher},
];

export default function* PageManager() {
    let location = yield select(locationSelector);

    // if no location in store yet, wait for page to be mounted to start any saga
    if (!location) {
        yield take(SAGA_PAGE_LOAD);
    }

    const matcher = item => location.pathname.match(item.filter);
    while (true) {
        location = yield select(locationSelector);
        const result = matches.find(matcher);

        let currentPageSaga = null;
        if (result) {
            currentPageSaga = yield fork(result.saga);
        }

        yield take(SAGA_PAGE_UNLOAD);

        if (currentPageSaga) {
            yield cancel(currentPageSaga);
        }
    }
}
