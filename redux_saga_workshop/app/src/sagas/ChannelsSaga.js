import {eventChannel} from 'redux-saga';
import {take, put, fork, race} from 'redux-saga/effects';

import Channels from 'services/channels';


function createEventChannel(kodi) {
    return eventChannel((emit) => {
        const onNotification = (data) => {
            emit(data);
        };

        kodi.addSubscriber(onNotification);

        return () => {
            kodi.close();
        };
    });
}

export default function* () {
    const channelsService = yield Channels.createService('/stream');
    const channel = yield createEventChannel(channelsService);

    try {
        while (true) {
            const data = yield take(channel);
            console.log(data);
        }
    } finally {
        console.log('Channels terminated');
        channelsService.close();
    }
}
