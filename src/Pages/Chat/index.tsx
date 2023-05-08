import React, { useState, useCallback, useEffect } from 'react'
import { Bubble, GiftedChat, MessageText, Send } from 'react-native-gifted-chat'
import style from './style';
import Icon from 'react-native-vector-icons/Ionicons'
import { Platform, View } from 'react-native';
import 'dayjs/locale/fr'
import { SafeAreaView } from 'react-native-safe-area-context';
import Menu from '../../components/menu';

export const Chat = () =>{

  interface Imessage{
    id:number;
    text:string;
    createAt:Date;
    user:{
      _id:number;
      name:string;
      avatar:string
    };
  }

  const [messages, setMessages] = useState<Imessage[]>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 2,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'suporte',
        },
      },
      {
        _id: 3,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 3,
          name: 'suporte',
        },
      },
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'suporte',
        },
      },
      
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => 
      GiftedChat.append(previousMessages, messages))
  }, [])

//  Container das messagens
  const renderBubble = (props) => {
    return(
    <Bubble
    {... props}
    wrapperStyle={{
      right:{
        backgroundColor:'#2B3467'
      },
      left:{
        backgroundColor:'#F8F9FB'
      }
    }}
    textStyle={{
      right:{
        color:'#fff',
        ...Platform.select({
          ios: { fontFamily: 'Arial', }, 
          android: { fontFamily: 'Roboto' }}),
      },
      left:{
        color:'black',
        ...Platform.select({
          ios: { fontFamily: 'Arial', }, 
          android: { fontFamily: 'Roboto' }}),
      }
    }}
    
    />
    )
  }
  const renderSend = (props) =>{
    return(
      <Send {...props}>
          <View>
            <Icon 
            style={style.send}
             name='send'
             size={32}/>
          </View>
      </Send>
    )
  } 


  return (
    <SafeAreaView style={style.container}>
    <Icon name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'} 
     size={50} 
     color='black' 
     
     />
    <GiftedChat
      messages={messages}
      // inverted={false}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      locale='pt-br'
      timeFormat='HH:mm'
      renderUsernameOnMessage={true}
      alwaysShowSend={false}
      renderSend={renderSend}
      isLoadingEarlier={true}
      scrollToBottom
      placeholder='Digite sua mensagem'
      // renderMessageText={renderMessageText}
      // scrollToBottomComponent={scrollToBottomComponent}
    />
    </SafeAreaView>
  )
  }
  export default Chat;