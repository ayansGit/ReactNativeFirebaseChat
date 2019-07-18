import { put, call, take, fork, takeLatest } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import {
  CHAT_LOAD_MESSAGES_ERROR,
  CHAT_LOAD_MESSAGES_REQUEST,
  CHAT_LOAD_MESSAGES_SUCCESS,
  CHAT_MESSAGE_ERROR,
  CHAT_MESSAGE_REQUEST,
  CHAT_MESSAGE_SUCCESS,
  FIREBASE_IMAGE_UPLOAD_REQUEST,
  FIREBASE_VIDEO_UPLOAD_REQUEST,
  FIREBASE_MEDIA_UPLOAD_SUCCESS,
  FIREBASE_MEDIA_UPLOAD_ERROR
} from '../actions/types'

import { storage } from '../firebase/databaseHelper'
import firebaseService from '../firebase/firebaseService'
import RNFetchBlob from 'react-native-fetch-blob'

const FIREBASE_REF_MESSAGES = firebaseService.database().ref('chats')

export function * uploadImage (action) {
  try {
    let response = yield call(
      storage.uploadImage,
      action.payload.uri,
      action.payload.chatToken
    )
    yield put({ type: FIREBASE_MEDIA_UPLOAD_SUCCESS, data: response })
  } catch (error) {
    yield put({ type: FIREBASE_MEDIA_UPLOAD_ERROR, error: error })
  }
}

export function * uploadVideo (action) {
  try {
    let response = yield call(
      storage.uploadVideo,
      action.payload.uri,
      action.payload.chatToken
    )
    yield put({ type: FIREBASE_MEDIA_UPLOAD_SUCCESS, data: response })
  } catch (error) {
    yield put({ type: FIREBASE_MEDIA_UPLOAD_ERROR, error: error })
  }
}


export function * getChatMessages (action) {
  console.log('payload', action.payload)
  // Creates an eventChannel and starts the listener;
  const channel = eventChannel(emiter => {
    const listener = FIREBASE_REF_MESSAGES.child('chatToken1').on(
      'value',
      dataSnapshot => {
        var items = []
        dataSnapshot.forEach(child => {
          items.push({
            chatId: child.key,
            message: child.val().content,
            senderId: child.val().senderId,
            imageUrl: child.val().imageUrl,
            videoUrl: child.val().videoUrl
          })
        })

        console.log('chatMessage: ', items)
        emiter({ data: items.reverse() || {} })
      }
    )

    // Return the shutdown method;
    return () => {
      listener.off()
    }
  })

  // Creates a loops to keep the execution in memory;
  while (true) {
    const { data } = yield take(channel)
    // Pause the task until the channel emits a signal and dispatch an action in the store;
    yield put({ type: CHAT_LOAD_MESSAGES_SUCCESS, data: data })
  }
}

export function * sendChatMessages (action) {
  const channel = eventChannel(emiter => {
    const listener = FIREBASE_REF_MESSAGES.child(action.payload.chatToken).push(
      action.payload.chatBody,
      error => {
        emiter({ error: error || null })
      }
    )

    // Return the shutdown method;
    return () => {
      listener.off()
    }
  })

  const { error } = yield take(channel)
  console.log('chatMessageError: ', error)
  if (error) {
    yield put({ type: CHAT_MESSAGE_ERROR, error: error })
  } else {
    yield put({ type: CHAT_MESSAGE_SUCCESS, data: 'Message sent successfully' })
  }
}

export function * watchLoadMessages () {
  yield takeLatest(CHAT_LOAD_MESSAGES_REQUEST, getChatMessages)
}

export function * watchSendMessage () {
  yield takeLatest(CHAT_MESSAGE_REQUEST, sendChatMessages)
}

export function * watchImageUpload () {
  yield takeLatest(FIREBASE_IMAGE_UPLOAD_REQUEST, uploadImage)
}

export function * watchVideoUpload () {
  yield takeLatest(FIREBASE_VIDEO_UPLOAD_REQUEST, uploadVideo)
}
