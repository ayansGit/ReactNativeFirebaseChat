import { all } from 'redux-saga/effects';
import { watchLoadMessages, watchSendMessage, watchImageUpload, watchVideoUpload } from './chatSaga';

function* rootSaga(){
    yield all([
        watchLoadMessages(),
        watchSendMessage(),
        watchImageUpload(),
        watchVideoUpload()
    ])
}

export default rootSaga;