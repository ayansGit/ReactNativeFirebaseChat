import React, { Component } from 'react'
import { Modal, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'

import type from 'type-detect'

export default class FileAttachDialog extends Component {
  constructor (props) {
    super(props)
    state = {
      modalVisible: true
    }
  }

  render () {
    const {
      visible,
      takePicture,
      takeVideo,
      chooseMediaFromGallery,
      closeDialog
    } = this.props

    return (
      <Modal
        animationType='none'
        visible={type(visible) === 'boolean' ? visible : false}
        transparent
        onRequestClose={() => closeDialog()}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
          onPress={() => closeDialog()}
          activeOpacity = {0}
        >
          <View
            style={{
              width: '90%',
              backgroundColor: '#ffffff',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold', padding: 15 }}>
              Choose from
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: 10,
                marginBottom: 10
              }}
            >
              <Icon
                type='FontAwesome'
                name='camera'
                style={{ fontSize: 25, color: '#4286f4' }}
                onPress={() => takePicture()}
              />
              <Icon
                type='Ionicons'
                name='videocam'
                style={{ fontSize: 30, color: '#4286f4' }}
                onPress={() => takeVideo()}
              />
              <Icon
                type='Ionicons'
                name='photos'
                style={{ fontSize: 30, color: '#4286f4' }}
                onPress={() => chooseMediaFromGallery()}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }
}
