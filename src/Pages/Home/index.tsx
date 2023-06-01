/* eslint-disable quotes */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Modal, View, Text, TouchableOpacity, Platform, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { propsStack } from '../../Routes/Stack/Models';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';
import Icone from 'react-native-vector-icons/FontAwesome';
import api from '../../services/api';
import Menu from '../../components/menu';

export const Home = () =>{
  const { usuario, updateEmail , signOut } = useAuth();
  
  const [mostrarNotificacaoChat, setMostrarNotificacaoChat] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/mensagem/'+ usuario._id);
        const constanteBackendChat = response.data.numeroNotificacoeschat;
        setMostrarNotificacaoChat(constanteBackendChat);
      } catch (error) {
        console.error(error);
      }
    };
    const intervalId = setInterval(fetchData, 1000); // Buscar dados a cada 10 segundos

    return () => {
      clearInterval(intervalId); // Limpar o intervalo quando o componente for desmontado
    };
  }, []);

  const marcarNotificacaoChat = async () => {
    try {
      const response = await api.post('/mensagem/marcar/', {id:usuario._id});
      navigation.navigate('Contatos')

    } catch (error) {
      console.error(error);
    }
  }

  const [isEnabled, setIsEnabled] = useState(usuario.email_notificacao);
  const toggleSwitch = async () => {
    try {
      const response = await api.patch('/notificacao/email', {id:usuario._id});

      updateEmail()

    } catch (error) {
      console.error(error);
    }
    
    setIsEnabled(previousState => !previousState);
  }
  

  const navigation = useNavigation<propsStack>()
  const [input, setInput] = useState('');

  const [showModal, setShowModal] = useState(false);

  const sair = () => {
    navigation.navigate('Home')
    signOut()
  }

  const handlePress = () => {
    setShowModal(true);
  }
  return (
    
   
    <View style={style.container}>
        <Text style={style.title}>Olá, {usuario.nome}!</Text>
        <TouchableOpacity onPress={sair} style={style.exitIcon}>
          <Icon name='exit-outline' size={30} />
        </TouchableOpacity>
        

        <View style={style.containericone}>
          <TouchableOpacity onPress={handlePress} style={style.userIcon}>
            
            <Icone name='user-circle' size={30}  />
          </TouchableOpacity>
          <Modal visible={showModal} animationType="slide">
            <View style={style.modal}>
              <Text style={style.title1}>Informações de perfil</Text>
              <Text style={style.text}>Nome:  {usuario.nome}!</Text>
              <Text style={style.text}>Email:  {usuario.email}!</Text>
              <Text style={style.text}>Tipo de perfil: {usuario.perfil}!</Text>
              <Text style={style.text}>Empresa: {usuario.empresa}!</Text>
              <Text style={style.text}>Contato da Empresa: {usuario.contato_empresa}!</Text>
              <View style={style.containerbotao}>
                <TouchableOpacity>                 
                  <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text style={style.close}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>

        

        <View style={style.buttons}>

          {usuario.perfil === "admin" ? (
            <>
              <TouchableOpacity style={style.buttonAdm}
                onPress={() => navigation.navigate('TabelaROs')}>
                <Text style={style.enterButton}>Registro de Ocorrência</Text>
              </TouchableOpacity>

              <TouchableOpacity style={style.buttonAdm}
                onPress={() => navigation.navigate('MembroSuporte')}>
                <Text style={style.enterButton}>Membros do Suporte</Text>
              </TouchableOpacity>

              <TouchableOpacity style={style.buttonAdm}
                onPress={() => navigation.navigate('CadastroRO')}>
                <Text style={style.enterButton}>Novo Registro de Ocorrência</Text>
              </TouchableOpacity>

              <TouchableOpacity style={style.buttonAdm}
                onPress={() => navigation.navigate('CadastroUsuario')}>
                <Text style={style.enterButton}>Cadastrar Novo Usuário</Text>
              </TouchableOpacity>
            {mostrarNotificacaoChat === 0 ? (
              <>
                <TouchableOpacity style={style.buttonChat2}
                  onPress={marcarNotificacaoChat}>
                  <Text style={style.enterButton}>Meus Chats</Text><Icon style={style.iconchat} name='ios-chatbubbles' size={30} color={'black'} ></Icon>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity style={style.buttonChat}
                onPress={marcarNotificacaoChat}>
                  <Text style={style.enterButton}>Meus Chats</Text><Icon style={style.iconchat} name='ios-chatbubbles' size={30} color={'black'} ></Icon>
                  <View style={style.mensagem}>
                      <Text style={style.numero}>{mostrarNotificacaoChat}</Text>
                  </View>
                </TouchableOpacity>
                </>
            )}
            </>
          ) : (
            <>
              <TouchableOpacity style={style.buttonClt}
                onPress={() => navigation.navigate('CadastroRO')}>
                <Text style={style.enterButton}>Novo Registro de Ocorrência</Text>
              </TouchableOpacity>

              <TouchableOpacity style={style.buttonClt2}
                onPress={() => navigation.navigate('TabelaROs')}>
                <Text style={style.enterButton}>Acompanhar Meus Registros de Ocorrência</Text>
              </TouchableOpacity>

            {mostrarNotificacaoChat === 0 ? (
              <>
                <TouchableOpacity style={style.buttonChat2}
                  onPress={marcarNotificacaoChat}>
                  <Text style={style.enterButton}>Meus Chats</Text><Icon style={style.iconchat} name='ios-chatbubbles' size={30} color={'black'} ></Icon>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity style={style.buttonChat}
                onPress={marcarNotificacaoChat}>
                  <Text style={style.enterButton}>Meus Chats</Text><Icon style={style.iconchat} name='ios-chatbubbles' size={30} color={'black'} ></Icon>
                  <View style={style.mensagem}>
                      <Text style={style.numero}>{mostrarNotificacaoChat}</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
            </>
          )}

        </View>

        <View style={{position:'absolute',  bottom: 10,}}>
          <Menu/>
        </View>

      </View>
  );
}

const style = StyleSheet.create({

 close: {
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical:'center',
    textDecorationLine: 'underline',
    width:130,
    borderRadius:300,
    height: 40,
    backgroundColor: '#72A2FA',
    marginTop:10,
    marginBottom:10
  },
  containericone: {
    position: 'absolute',
    top: '3.2%',
    right: '2%',
    padding: 10,
  },
  modal: {
    flex: 1,
   
    backgroundColor: 'white',
    padding: 20,
    
  },
  title1: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 30,
    textAlign: 'left',
    color: 'black',
   
  },
  text: {
    fontSize: 20,
  },

 buttons:{
    // margin:'auto',
    width:300,
    marginBottom: 170,

  },

  div: {
    position: 'relative',
    alignItems: 'center',
    width: 300,
    height: 70,
    backgroundColor: '#2B3467',
    marginBottom: 10,
    marginTop: 160,
    borderRadius: 35,
  },

  title:{
    fontSize: 35,
    marginTop: 30,
    marginRight: 115,
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    ...Platform.select({
      ios: { fontFamily: 'Arial', }, 
      android: { fontFamily: 'Roboto' }}), 
    display:'flex',
    justifyContent: 'space-between',
    margin:'auto',
    alignItems: 'center',
    flexDirection: 'column'
  },

  buttonAdm :{
    alignItems: 'center',
    width: 300,
    padding: 15,
    backgroundColor: '#72A2FA',
    marginBottom: 20,
    borderRadius: 7,
  },

  buttonClt :{
    alignItems: 'center',
    width: 300,
    paddingTop: 40,
    padding: 15,
    backgroundColor: '#72A2FA',
    marginBottom: 20,
    borderRadius: 7,
    height: 100,
  },

  buttonClt2 :{
    alignItems: 'center',
    width: 300,
    paddingTop: 25,
    padding: 15,
    backgroundColor: '#72A2FA',
    marginBottom: 20,
    borderRadius: 7,
    height: 100,
  },

  enterButton:{
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  
  exitIcon: {
    position: 'absolute',
    right: 60,
    top: 30
  },

  buttonChat:{
      backgroundColor: '#72A2FA',
      flexDirection:'row',
      justifyContent:'space-around',
      // width:'18%',
      alignItems:'center',
      width: 300,
      padding: 15,
      marginBottom: 20,
      borderRadius: 7,
  },

  buttonChat2:{
    backgroundColor: '#72A2FA',
    flexDirection:'row',
    justifyContent:'space-around',
    // width:'18%',
    alignItems:'center',
    width: 300,
    padding: 15,
    marginBottom: 20,
    borderRadius: 7,
    height: 70,
},

  iconchat:{
    color:'white'
  },

  mensagem:{
    marginLeft: 255,
    bottom: 50,
    backgroundColor: 'red',
    position: 'absolute',
    borderRadius: 30,
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  numero: {
    color: 'white',
  },

  containerbotao: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});


export default Home;