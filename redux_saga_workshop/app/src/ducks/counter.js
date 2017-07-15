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


export const selectCounter = ({counter}) => counter;
