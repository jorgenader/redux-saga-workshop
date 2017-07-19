/* eslint-disable global-require */
import React from "react";

import {Appear, Deck, Slide, Heading, Link, Text, Image, CodePane, List, ListItem} from "spectacle";

import preloader from "spectacle/lib/utils/preloader";
import createTheme from "spectacle/lib/themes/default";

require("normalize.css");
require("spectacle/lib/themes/default/index.css");

const images = {
    reduxSaga: require("../assets/Redux-Saga-Logo-Landscape.png"),
};

preloader(images);

const theme = createTheme({
    primary: '#000',
    secondary: '#999999',
    tertiary: "#FFFFFF",
    quartenary: "#89D96D",
}, {
    primary: "Montserrat",
    secondary: "Helvetica",
});

const generatorExample = `
    function* myGenerator () {
        yield 1;
        yield 2;
        yield 3;
    }
    
    var gen = myGenerator();
    console.log(gen.next()) // { value: 1, done: false }
    console.log(gen.next()) // { value: 2, done: false }
    console.log(gen.next()) // { value: 3, done: true }
`;

const setupExample = `
// ...
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'

// ...
import {rootSaga} from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

// start your main saga
sagaMiddleware.run(rootSaga)
`;

const apiCall = `
import { call, put } from 'redux-saga/effects'

export function* fetchData(action) {
   try {
      const data = yield call(action.resource.post, action.data)
      // dispatch({type: "FETCH_SUCCEEDED", data})
      yield put({type: "FETCH_SUCCEEDED", data})
   } catch (error) {
      // dispatch({type: "FETCH_FAILED", error})
      yield put({type: "FETCH_FAILED", error})
   }
}

`;

const watcherStart = `
import { takeEvery, takeLatest } from 'redux-saga/effects'

function* watchFetchData() {
  yield takeEvery('FETCH_REQUESTED', fetchData)
}
`;


const testingExample = `
    const iterator = fetchProducts();
    assert.deepEqual(iterator.next().value, ??)
`;

const testingResult = `
{
  CALL: {
    fn: Resource.post,
    args: [{example: 1}]
  }
}
`;

const testingPart2 = `
import { call } from 'redux-saga/effects'
import Resource from '...'

const iterator = fetchProducts()

// expects a call instruction
assert.deepEqual(
  iterator.next().value,
  call(Resource.post, {example: 1}),
  "fetchProducts should yield an Effect call(Resource.post, './products')"
);
`;

const Presentation = () => (
    <Deck transition={["zoom", "slide"]} theme={theme} transitionDuration={500} progress="none">
        <Slide textColor="secondary">
            <Heading size={1} fit lineHeight={1}>
                Introduction to
            </Heading>
            <Link href="https://github.com/redux-saga/redux-saga">
                <Image src={images.reduxSaga} />
            </Link>
            <Text textSize="1em" marginTop="20px" textColor="secondary">
                Jorgen Ader
            </Text>
            <Text textSize="1em" textColor="secondary">
                18.07.2017
            </Text>
        </Slide>
        <Slide>
            <Heading size={2} fit lineHeight={1}>
                What is Redux-Saga?
            </Heading>
            <Appear>
                <Text textSize="1em" textColor="secondary">
                    Redux middleware for handling side-effects
                </Text>
            </Appear>
        </Slide>
        <Slide>
            <Heading size={1} fit lineHeight={1}>
                Advantages
            </Heading>
            <List>
                <Appear><ListItem>Synchronous looking code</ListItem></Appear>
                <Appear><ListItem>Sagas are composable</ListItem></Appear>
                <Appear><ListItem>Action Creators become pure again.</ListItem></Appear>
                <Appear><ListItem>Side-effects management are in one place</ListItem></Appear>
                <Appear><ListItem>Easy to test with, little to no mocking required</ListItem></Appear>
            </List>
        </Slide>
        <Slide>
            <Heading size={1} fit caps lineHeight={1}>
                How does it work?
            </Heading>
            <Appear>
                <Text textSize="1em" textColor="secondary">
                    Sagas are implemented using ES6 generator function's and declarative effects
                </Text>
            </Appear>
        </Slide>
        <Slide>
            <Heading size={1} fit caps lineHeight={1}>
                What are generators?
            </Heading>
            <Appear>
                <Text textSize="1em" textColor="secondary">
                    Functions that can be paused or exited any time.
                </Text>
            </Appear>
            <Appear>
                <CodePane lang="javascript" source={generatorExample} />
            </Appear>
        </Slide>
        <Slide>
            <Heading size={1} fit caps lineHeight={1}>
                How would you use it?
            </Heading>
            <Appear>
                <CodePane lang="javascript" source={setupExample} />
            </Appear>
        </Slide>
        <Slide>
            <CodePane lang="javascript" source={apiCall} />
            <CodePane lang="javascript" source={watcherStart} />
        </Slide>
        <Slide>
            <Heading size={1} fit caps lineHeight={1}>
                Declarative Effects & Testing
            </Heading>
            <Appear>
                <CodePane lang="javascript" source={testingExample} />
            </Appear>
            <Appear>
                <CodePane lang="javascript" source={testingResult} />
            </Appear>
            <Appear>
                <CodePane lang="javascript" source={testingPart2} />
            </Appear>
        </Slide>
        <Slide>
            <Heading size={1} fit caps lineHeight={1}>
                Questions?
            </Heading>
        </Slide>
        <Slide>
            <Heading size={1} fit caps lineHeight={1}>
                Workshop time
            </Heading>
            <Link href="https://github.com/metsavaht/redux-saga-workshop">
                <Text textSize="1em" textColor="secondary">
                    https://github.com/metsavaht/redux-saga-workshop
                </Text>
            </Link>
        </Slide>
    </Deck>
);


export default Presentation;
