import { all } from 'redux-saga/effects';
import { watchLoadMessages, watchSendMessage, watchImageUpload } from './chatSaga';

function* rootSaga(){
    yield all([
        watchLoadMessages(),
        watchSendMessage(),
        watchImageUpload(),
    ])
}

export default rootSaga;