import { CHAT_MESSAGE_REQUEST, CHAT_LOAD_MESSAGES_REQUEST, CHAT_LOAD_MESSAGES_SUCCESS, FIREBASE_IMAGE_UPLOAD_REQUEST, FIREBASE_VIDEO_UPLOAD_REQUEST } from './types'

export const sendChatMessageRequest = chatPayload => ({
  type: CHAT_MESSAGE_REQUEST,
  payload: chatPayload
})

export const loadChatMessageRequest = chatToken => ({
  type: CHAT_LOAD_MESSAGES_REQUEST,
  payload: chatToken
})

export const uploadmageRequest = uploadData => ({
    type: FIREBASE_IMAGE_UPLOAD_REQUEST,
    payload: uploadData
  })

  export const uploadVideoRequest = uploadData => ({
    type: FIREBASE_VIDEO_UPLOAD_REQUEST,
    payload: uploadData
  })
