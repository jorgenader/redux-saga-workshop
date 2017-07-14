// straight store actions
const SET = 'counter/SET';

export default function reducer(state = 0, action) {
    switch (action.type) {
        case SET:
            return action.value;

        default:
            return state;
    }
}

// actions
export const actions = {
    setCounter: value => ({type: SET, value}),
};

// triggers for sagas (could be in saga file for SoC)
export const TRIGGER_INCREASE = 'trigger/counter/increase';
export const TRIGGER_DECREASE = 'trigger/counter/decrease';
export const TRIGGER_RESET = 'trigger/counter/reset';

export const triggers = {
    increase: () => ({type: TRIGGER_INCREASE}),
    decrease: () => ({type: TRIGGER_DECREASE}),
    reset: () => ({type: TRIGGER_RESET}),
};
