import React, { useState, useCallback, useEffect } from 'react'
import { Bubble, GiftedChat, InputToolbar, MessageText, Send } from 'react-native-gifted-chat'
import style from './style';
import Icon from 'react-native-vector-icons/Ionicons'
import { Platform, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Menu from '../../components/menu';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../../services/api';

export const Chat = ({route}) =>{

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
  const { usuario, signOut } = useAuth();
  const [messages, setMessages] = useState<Imessage[]>([]);
  const navigation = useNavigation<propsStack>()
  const [loading, setLoading] = useState(true);
  const destinatario = route.params.destinatario
  // const a = route.params.a

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 2,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: 'suporte',
  //       },
  //     },
  //     {
  //       _id: 3,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 3,
  //         name: 'suporte',
  //       },
  //     },
  //     {
  //       _id: 1,
  //       text: 'Hello developerlll',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'suporte',
  //       },
  //     },
      
  //   ])
  // }, [])
  useEffect(()=>{
    (async () => {
      try {
    const response = await api.get(`/mensagem/${usuario._id}/${destinatario}`)
    setMessages(response.data)
    setLoading(false);
    } catch (response) {
      setErrorMessage(response.data.msg);
    }
  })();
}, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => 
      GiftedChat.append(previousMessages, messages))
      console.warn(`${destinatario}`)
  }, [])

//  Container das messagens
  const renderBubble = (props) => {
    return(
    <Bubble
    {... props}
    wrapperStyle={{
      right:{
        backgroundColor:'#2B3467',
      },
      left:{
        backgroundColor:'#F8F9FB',
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
  const CustomInputToolbar = (props) =>{
    return(
      <InputToolbar
      {...props}
      containerStyle={style.inputToolbar}
    />
    )
  }


  return (
    <SafeAreaView style={style.container}>
    <Icon name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'} 
     size={50} 
     color='black' 
     onPress={() => 
      navigation.navigate('Contatos')
      }/>
      {/* <View> */}
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      locale='pt-br'
      timeFormat='HH:mm'
      renderUsernameOnMessage={true}
      alwaysShowSend={true}
      renderSend={renderSend}
      // minInputToolbarHeight={232}
      isLoadingEarlier={true}
      scrollToBottom
      renderInputToolbar={CustomInputToolbar}
      placeholder='Digite sua mensagem'
      // renderMessageText={renderMessageText}
      // scrollToBottomComponent={scrollToBottomComponent}
    /> 
    </SafeAreaView>
  )
  }
  export default Chat;