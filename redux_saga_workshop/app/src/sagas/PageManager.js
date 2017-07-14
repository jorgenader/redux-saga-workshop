import {take, fork, cancel} from 'redux-saga/effects';

// page sagas
import {SAGA_PAGE_LOAD, SAGA_PAGE_UNLOAD} from 'actions';


const matches = [
    // {filter: /^\/$/g, saga: dashboardPageWatcher},
    // {filter: /^\/status$/g, saga: statusPageWatcher},
];

export default function* PageManager() {
    while (true) {
        const {location} = yield take(SAGA_PAGE_LOAD);
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
