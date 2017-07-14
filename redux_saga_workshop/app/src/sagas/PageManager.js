import {take, fork, cancel, select} from 'redux-saga/effects';

// page sagas
import {SAGA_PAGE_UNLOAD} from 'actions';
import counterSagaWatcher from 'sagas/CounterSaga';


const locationSelector = ({router: {location}}) => (location);

const matches = [
    {filter: /^\/counter/g, saga: counterSagaWatcher},
];

export default function* PageManager() {
    while (true) {
        const location = yield select(locationSelector);
        const result = matches.find(item => location.pathname.match(item.filter));

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
