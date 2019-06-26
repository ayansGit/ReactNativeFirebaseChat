import React, { Component } from 'react'
import { Container, Content, Text, View, Input, Icon } from 'native-base'
import { FlatList, TouchableOpacity, YellowBox, Platform } from 'react-native'
import { connect } from 'react-redux'
import {
  loadChatMessageRequest,
  sendChatMessageRequest,
  uploadmageRequest
} from '../actions/chatAction'
import {
  FIREBASE_MEDIA_UPLOAD_REQUEST,
  FIREBASE_MEDIA_UPLOAD_SUCCESS,
  FIREBASE_MEDIA_UPLOAD_ERROR
} from '../actions/types'
import MessageItem from './MessageItem'
import FileAttachDialog from '../helper/FileAttachDialog'
import ImagePicker from 'react-native-image-picker'
class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      myId: 'abc123',
      receiverId: 'def123',
      message: '',
      showMediaChooserDialog: false
    }
    this.createChatBody = this.createChatBody.bind(this)
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    console.log('nextProps', nextProps)
    console.log('prevState', prevState)
    if (nextProps.operation_type != null) {
      switch (nextProps.operation_type) {
        case 'INITIAL_STATE':
          nextProps.getChatMessage('chatToken1')
          return nextProps

        case FIREBASE_MEDIA_UPLOAD_REQUEST:
          return nextProps

        case FIREBASE_MEDIA_UPLOAD_SUCCESS:
          let imageUrl = ''
          let videoUrl = ''

          if (nextProps.chatMediaData.mediaType == 'image') {
            imageUrl = nextProps.chatMediaData.url
          } else if (nextProps.chatMediaData.mediaType == 'video') {
            videoUrl = nextProps.chatMediaData.url
          }
          let chatBody = (chatPayload = {
            chatToken: 'chatToken1',
            chatBody: {
              content: '',
              imageUrl: imageUrl,
              videoUrl: videoUrl,
              senderId: prevState.receiverId
            }
          })

          nextProps.sendMessage(chatBody)

          return nextProps
      }
    }
    return nextProps
  }

  createChatBody (
    chatToken = '',
    message = '',
    imageUrl = '',
    videoUrl = '',
    senderId
  ) {
    return (chatPayload = {
      chatToken: chatToken,
      chatBody: {
        content: message,
        imageUr: imageUrl,
        videoUrl: videoUrl,
        senderId: senderId
      }
    })
  }

  takePhoto () {
    const options = {
      quality: 0.8,
      maxWidth: 500,
      maxHeight: 500,
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true
      }
    }

    ImagePicker.launchCamera(options, response => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        const source = { uri: response.uri }
        console.log('imageUri: ', source)
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        var photo = {
          name: response.fileName,
          type: response.type,
          uri:
            Platform.OS === 'android'
              ? response.uri
              : response.uri.replace('file://', '')
        }

        let uploadData = {
          uri:
            Platform.OS === 'android'
              ? response.uri
              : response.uri.replace('file://', ''),

          chatToken: 'chatToken1'
        }
        this.props.uploadImage(uploadData)
      }
    })
  }

  takeVideo () {
    const options = {
      videoQuality: 'medium',
      mediaType: 'video',
      storageOptions: {
        skipBackup: true
      }
    }

    ImagePicker.launchCamera(options, response => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        const source = { uri: response.uri }
        console.log('videoUri: ', source)
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        var video = {
          name: response.fileName,
          type: response.type,
          uri:
            Platform.OS === 'android'
              ? response.uri
              : response.uri.replace('file://', '')
        }

        console.log('video: ', video)
      }
    })
  }

  choosetMedia () {
    const options = {
      noData: true,
      videoQuality: 'medium',
      quality: 0.8,
      mediaType: 'video',
      storageOptions: {
        skipBackup: true
      }
    }

    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        const source = { uri: response.uri }

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        var media = {
          name: response.fileName,
          type: response.type,
          uri:
            Platform.OS === 'android'
              ? response.uri
              : response.uri.replace('file://', '')
        }

        console.log('media: ', media)
      }
    })
  }

  renderItem (data) {
    return (
      <MessageItem
        isReceiver={this.state.myId != data.item.senderId}
        message={data.item.message}
        image={data.item.imageUrl}
        video={data.item.videoUrl}
        onImageDownload={() => {}}
      />
    )
  }

  render () {
    return (
      <Container>
        <FileAttachDialog
          visible={this.state.showMediaChooserDialog}
          takePicture={() => {
            this.setState({ showMediaChooserDialog: false })
            this.takePhoto()
          }}
          takeVideo={() => {
            this.setState({ showMediaChooserDialog: false })
            this.takeVideo()
          }}
          chooseMediaFromGallery={() => {
            this.setState({ showMediaChooserDialog: false })
            this.choosetMedia()
          }}
          closeDialog={() => {
            this.setState({ showMediaChooserDialog: false })
          }}
        />
        <View
          style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}
        >
          <View style={{ width: '100%', flex: 0.88 }}>
            <FlatList
              // initialScrollIndex={this.props.chatData - 1}
              data={this.props.chatData}
              inverted
              renderItem={this.renderItem.bind(this)}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <View
            style={{
              width: '100%',
              flex: 0.12,
              flexDirection: 'row',
              // justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Input
              value={this.state.message}
              onChangeText={text => this.setState({ message: text })}
              style={{
                flex: 0.83,
                borderRadius: 25,
                marginLeft: 10,
                paddingLeft: 50,
                paddingRight: 20,
                backgroundColor: '#bcbcbc'
              }}
            />

            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                alignSelf: 'flex-start',
                marginLeft: 15,
                height: '100%',
                padding: 15
              }}
              onPress={() => {
                this.setState({ showMediaChooserDialog: true })
              }}
            >
              <Icon type='Ionicons' name={'attach'} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 0.17
              }}
              onPress={() => {
                let chatPayload = (chatPayload = {
                  chatToken: 'chatToken1',
                  chatBody: {
                    content: this.state.message,
                    imageUrl: '',
                    videoUrl: '',
                    senderId: this.state.receiverId
                  }
                })
                if (this.state.message.trim() != '') {
                  this.props.sendMessage(chatPayload)
                }
                this.setState({ message: '' })
              }}
            >
              <Icon
                type='Ionicons'
                name={'send'}
                style={{ fontSize: 25, color: '#4286f4' }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    isSending: state.chat.isSending,
    isMessageLoading: state.chat.isMessageLoading,
    isMediaUploading: state.chat.isMediaUploading,
    sendingError: state.chat.sendingError,
    messageLoadingError: state.chat.messageLoadingError,
    chatData: state.chat.chatData,
    chatSentSuccessMessage: state.chat.chatSentSuccessMessage,
    chatMediaData: state.chat.chatMediaData,
    operation_type: state.chat.operation_type
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getChatMessage: chatToken => {
      dispatch(loadChatMessageRequest(chatToken))
    },
    sendMessage: chatPayload => {
      dispatch(sendChatMessageRequest(chatPayload))
    },
    uploadImage: uploadData => {
      dispatch(uploadmageRequest(uploadData))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
