import React, { useState, useCallback, useEffect } from 'react'
import { Bubble, GiftedChat, InputToolbar, MessageText, Send } from 'react-native-gifted-chat'
import style from './style';
import Icon from 'react-native-vector-icons/Ionicons'
import { Alert, Platform, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Menu from '../../components/menu';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../../services/api';
import axios from 'axios';

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

useEffect(() => {
  (async () => {
    try {
      const response = await api.get(`/mensagem/${usuario._id}/${destinatario}`)
      setMessages(response.data)
      setLoading(false);
    } catch (response) {
      setErrorMessage(response.data.msg);
    }
  })();
}, [refresh]);
// useEffect(() => {
//   const fetchMessages = async () => {
//     try {
//       const response = await api.get(`/mensagem/${usuario._id}/${destinatario._id}`);
//       const mensagens = response.data.map((mensagem) => ({
//         _id: mensagem._id,
//         text: mensagem.conteudo,
//         createdAt: new Date(mensagem.enviadoEm),
//         user: {
//           _id: mensagem.remetente._id,
//           name: mensagem.remetente.nome,
//         },
//       }));
//       setMessages(mensagens);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   fetchMessages();
// }, []);
const uniqueId = Math.floor(Math.random() * 1000000000000000).toString(16);


async function enviarMensagem (novaMensagem) {
  setLoading(true);
  try{
 const reponse2 = api.post('/mensagem/', {
    _id :  uniqueId,
    conteudo: novaMensagem[0].text,
    remetente: usuario._id,
    destinatario: destinatario,
    enviadoEm: new Date().toLocaleString("en-US", {timezone: 'America/Sao_Paulo'}),
  })
  // Alert.alert(reponse2.data.msg)
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
    user: {
      _id: usuario._id,
      name: usuario.nome,
    }
  };
  return gcm;
});
// const novasMensagens = response.data.map(mensagem => ({
//   _id: mensagem._id,
//   text: mensagem.conteudo,
//   createdAt: mensagem.enviadoEm,
//   user: {
//     _id: mensagem.remetente._id,
//     name: mensagem.remetente.nome,
//   },
// user:{
//     _id:mensagem.destinatario_id,
//     name:mensagem.destinatario_nome
// }

  // const onSend = () => {
  //   api.post('/mensagem', async (req, res) => {
  //     try {
  //       const { conteudo, remetente, destinatario } = req.body;
    
  //       // Cria um novo documento de mensagem
  //       const novaMensagem = new Mensagem({ conteudo, remetente, destinatario });
    
  //       // Salva a nova mensagem no banco de dados
  //       await novaMensagem.save();
    
  //       res.status(201).send(novaMensagem);
  //     } catch (error) {
  //       console.error(error);
  //       res.status(500).send(error);
  //     }
  //   }
  //   )
  // }
    
  const onSend = useCallback((messages = []) => {
    setRefresh(true)
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    // console.log(m)
    enviarMensagem(messages);
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
 console.log(usuario.nome)

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