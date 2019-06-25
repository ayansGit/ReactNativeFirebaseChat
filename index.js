/**
 * @format
 */
import React from "react";
import {AppRegistry} from 'react-native';
import Chat from './src/screens/Chat';
import {name as appName} from './app.json';
import { Root } from "native-base"
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux"
import createSagaMiddleware from "redux-saga"
import allReducers from "./src/reducers"
import rootSaga from "./src/sagas/rootSaga"

const sagaMiddleware = createSagaMiddleware()
let store = createStore(allReducers, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

const app = () => {
    return (
        <Root>
            <Provider store={store}>
                <Chat />
            </Provider>
        </Root>
    )
}


AppRegistry.registerComponent(appName, () => app);
