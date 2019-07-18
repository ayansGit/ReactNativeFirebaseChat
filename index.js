/**
 * @format
 */
import React from "react";
import { AppRegistry } from 'react-native';
import Reactotron from "reactotron-react-native";
import Chat from './src/screens/Chat';
import { name as appName } from './app.json';
import allReducers from "./src/reducers"
import rootSaga from "./src/sagas/rootSaga"
import { Root } from "native-base"

import { Provider } from "react-redux"

import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga"

import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import storage from 'redux-persist/es/storage';

const persistConfig = {
    key: 'root',
    storage,
}

const middleware = []
const enhancers = []


const sagaMiddleware = createSagaMiddleware()
middleware.push(sagaMiddleware)

enhancers.push(applyMiddleware(...middleware))

const persistedReducer = persistReducer(persistConfig, allReducers)

//const createAppropriateStore = __DEV__ ? console.tron.createStore : createStore;
let store = createStore(persistedReducer, compose(...enhancers))

/* Redux-Persist + Store */
export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga)

const app = () => {
    return (
        <Root>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Chat />
                </PersistGate>
            </Provider>
        </Root>
    )
}


AppRegistry.registerComponent(appName, () => app);
