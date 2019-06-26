import firebaseService from './firebaseService'
import RNFetchBlob from 'react-native-fetch-blob'
import { uploadImage } from '../sagas/chatSaga'
const FIREBASE_REF_MESSAGES = firebaseService.database().ref('chats')
const FIREBASE_REF_MESSAGES_LIMIT = 20
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export const storage = {
  uploadImage: async (uri, chatToken) => {
    try {
      let response = await uploadImageToStorage(uri, chatToken)
      console.log(response)
      return response
    } catch (error) {
      throw error
    }
  },
  uploadVideo: async(uri, chatToken) => {
    try {
      let response = await uploadVideoToStorage(uri, chatToken)
      console.log(response)
      return response
    } catch (error) {
      throw error
    }
  }
}

const uploadImageToStorage = (
  uri,
  chatToken,
  mime = 'application/octet-stream'
) => {
  return new Promise((resolve, reject) => {
    const uploadUri = uri
    let uploadBlob = null

    var date = new Date()
    console.log("date",date.toUTCString);
    const imageRef = firebaseService
      .storage()
      .ref('images')
      .child(chatToken)
      .child(date.toString())

    fs.readFile(uploadUri, 'base64')
      .then(data => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then(blob => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()

      })
      .then(url => {
        let data = {
          mediaType: "image",
          url: url
        }
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

const uploadVideoToStorage = (
  uri,
  chatToken,
  mime = 'video/mp4'
) => {
  return new Promise((resolve, reject) => {
    const uploadUri = uri
    let uploadBlob = null

    var date = new Date()
    console.log("date",date.toUTCString);
    const videoRef = firebaseService
      .storage()
      .ref('videos')
      .child(chatToken)
      .child(date.toString())

    fs.readFile(uploadUri, 'base64')
      .then(data => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then(blob => {
        uploadBlob = blob
        return videoRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return videoRef.getDownloadURL()

      })
      .then(url => {
        let data = {
          mediaType: "video",
          url: url
        }
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
