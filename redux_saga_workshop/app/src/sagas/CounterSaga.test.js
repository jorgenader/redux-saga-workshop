import {describe, it} from 'mocha';
import {expect} from 'chai';

import {delay} from 'redux-saga';
import {select, put, call} from 'redux-saga/effects';

import {actions, selectCounter} from 'ducks/counter';
import {decrease, increase, reset} from './CounterSaga';


describe('Counter saga', () => {
    const state = {
        counter: 10,
    };

    it('decrease should decrease counter by 1', () => {
        const iter = decrease();
        expect(iter.next(state).value).to.eql(select(selectCounter));
        expect(iter.next(selectCounter(state)).value).to.eql(put(actions.setCounter(9)));
    });

    it('increase should increase counter by 100', () => {
        const iter = increase();
        expect(iter.next(state).value).to.eql(select(selectCounter));
        expect(iter.next(selectCounter(state)).value).to.eql(put(actions.setCounter(110)));
    });

    it('reset should count down', () => {
        const iter = reset();
        expect(iter.next(state).value).to.eql(select(selectCounter));

        for (let i = state.counter; i >= 0; i -= 1) {
            expect(iter.next(selectCounter(state)).value).to.eql(put(actions.setCounter(i)));
            expect(iter.next().value).to.eql(call(delay, 1000));
            expect(iter.next(state).value).to.eql(select(selectCounter));
            state.counter = i;
        }
    });
});
