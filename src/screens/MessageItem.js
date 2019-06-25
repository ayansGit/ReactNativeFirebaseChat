import React, { Component } from 'react'
import { Container, Content, Text, View, Input, Icon } from 'native-base'
import { FlatList, Image, TouchableOpacity } from 'react-native'

export default class MessageItem extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <View style={{ margin: 10 }}>
        <View
          style={
            this.props.isReceiver
              ? {
                backgroundColor: '#bcbcbc',
                borderRadius: 5,
                width: '70%',
                alignSelf: 'flex-start'
              }
              : {
                backgroundColor: '#4286f4',
                borderRadius: 5,
                width: '70%',
                alignSelf: 'flex-end'
              }
          }
        >
          {this.props.message != '' ? (
            <Text style={{ padding: 10 }}>{this.props.message}</Text>
          ) : this.props.image != '' ? (
            <TouchableOpacity
              onPress={() => {
                this.props.onImageDownload()
              }}
            >
              <Image
                style={{ height: 300, width: "100%", alignSelf:"center" , padding: 10}}
                resizeMode="contain"
                source={{ uri: this.props.image }}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    )
  }
}
