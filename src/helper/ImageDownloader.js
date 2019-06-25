import RNFetchBlob from 'react-native-fetch-blob'
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const downloadImage = imageUrl => {
  return new Promise((resolve, rejects) => {
    RNFetchBlob.config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache: true
    })
      .fetch('GET', imageUrl)
      .then(res => {
        // the temp file path
        console.log('The file saved to ', res.path())
        resolve(res.path())
      })
      .catch(error => {
        rejects(error)
      })
  })
}
