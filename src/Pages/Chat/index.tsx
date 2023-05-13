import React, { useState, useCallback, useEffect } from 'react'
import { Bubble, GiftedChat, InputToolbar, Message, MessageText, Send } from 'react-native-gifted-chat'
import style from './style';
import Icon from 'react-native-vector-icons/Ionicons'
import { Alert, Platform, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Menu from '../../components/menu';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';

export const Chat = ({route}) =>{

  interface Imessage{
    conteudo?:string,
    Enviado?:Date,
    remetente?:{
      _id?:number;
      nome?:string;
    };
    destinatario?:{
      _id?:number;
      nome?:string
    };
  }
  const { usuario, signOut } = useAuth();
  const [messages, setMessages] = useState<Imessage[]>([]);
  const navigation = useNavigation<propsStack>();
  const [refresh, setRefresh] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const destinatario = route.params.destinatario


  useEffect(()=>{
    (async () => {
      try {
    const response = await api.get(`/mensagem/${usuario._id}/${destinatario}/`)
    setMessages(response.data)
    console.log(messages)
    setLoading(false);
    } catch (response) {
      setErrorMessage(response.data.msg);
    }
    setLoading(false)
  })();
}, []);

useEffect(() => {
  (async () => {
    try {
      const response = await api.get(`/mensagem/${usuario._id}/${destinatario}`)
      setMessages(response.data)
      setLoading(false);
      setRefresh(false);
    } catch (response) {
      setErrorMessage(response.data.msg);
    }
  })();
}, [refresh]);

const uniqueId = Math.floor(Math.random() * 1000000000000000).toString(16);
const now = new Date();
const options = { timeZone: "Europe/London" };
const horarioAtual = now.toLocaleTimeString("en-GB", options);

console.log(horarioAtual)

async function enviarMensagem (novaMensagem) {
  setLoading(true);
  try{
 const reponse2 = api.post('/mensagem/', {
    _id :  uniqueId,
    conteudo: novaMensagem[0].text,
    enviadoEm: new Date(),
    remetente: usuario._id,
    destinatario: destinatario,
    // enviadoEm: new Date(),
  })
  Alert.alert(reponse2.data.msg)
}catch(reponse2){
  // Alert.alert(reponse2.data.msg)
}
setLoading(false)

}

let giftedChatMessages = messages.map((chatMessage) => {
  let gcm = {
    _id: chatMessage._id,
    text: chatMessage.conteudo,
    createdAt: chatMessage.enviadoEm,
    user:{
      _id:chatMessage.destinatario?._id,
      name: chatMessage.destinatario?.nome,
      _id:chatMessage.remetente?._id,
      name: chatMessage.remetente?.nome,
      // _id:usuario._id,
    },
  }
  return gcm;
});
   
// console.log(giftedChatMessages)
  const onSend = useCallback((messages = []) => {
    setRefresh(true)
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    enviarMensagem(messages);
    console.log(messages)
  }, [enviarMensagem]);  
    
    
    
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
      messages={giftedChatMessages}
      onSend={messages => onSend(messages)}
      user={{
        _id: usuario._id, // ou qualquer outra propriedade do usuário que você queira utilizar
        name: usuario.nome,
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
    {/* <Text>
      {messages.conteudo}
    </Text> */}
    </SafeAreaView>
  )
  }
  export default Chat;