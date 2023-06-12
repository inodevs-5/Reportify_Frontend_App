/* eslint-disable quotes */
import React, { useEffect, useState } from 'react';
import {StyleSheet,Modal, View,Text,TextInput,TouchableOpacity,Platform, ActivityIndicator, Linking, Alert, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { propsStack } from '../../Routes/Stack/Models';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';
import Icone from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
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

  const accept = async () => {
    try {
      const response = await api.post('/notificacao/accept/', {id:usuario._id});

    } catch (error) {
      console.error(error);
    }
  }

  const [isEnabled, setIsEnabled] = useState(usuario.email_notificacao);
  const toggleSwitch = async () => {
    try {
      const response = await api.patch('/notificacao/email', {id:usuario._id});
      accept()

      updateEmail()

    } catch (error) {
      console.error(error);
    }
    
    setIsEnabled(previousState => !previousState);
  }
  

  const navigation = useNavigation<propsStack>()
  const [input, setInput] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [showModalTermo, setShowModalTermo] = useState(false);
  const [termo, setTermo] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/termo/' + usuario._id);
        
        if (!response.data.status) {
          setTermo(response.data.termo)
          setShowModalTermo(true)
        }
      } catch (response) {
        Alert.alert(response.data.msg);
      }
    })();
  }, []);

  const sair = async() => {
    await signOut()
    navigation.navigate('Login')
  }

  const handlePress = () => {
    setShowModal(true);
  }

  const acceptTermo = async() => {
    try {
      const response = await api.post('/termo/accept', {usuario: usuario._id, versaoTermo: termo._id});
      setShowModalTermo(false)
    } catch (response) {
      Alert.alert(response.data.msg);
    }
  }

  return (
    <View style={style.container}>
        <Text style={style.title}>Olá, {usuario.nome}!</Text>
        <TouchableOpacity onPress={sair} style={style.exitIcon}>
          <Icon name='exit-outline' size={30} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('OpcoesExtras')} style={style.settingsIcon}>
          <Icon name='settings-outline' size={30} />
        </TouchableOpacity>

        <View style={style.containericone}>
          <TouchableOpacity onPress={handlePress} style={style.userIcon}>
            
            <Icone name='user-circle' size={30}  />
          </TouchableOpacity>
          <Modal visible={showModal} animationType="slide">
            <View style={style.modal}>
              <Text style={style.title1}>Informações de perfil</Text>
              <Text style={style.text}>Nome:  {usuario.nome}</Text>
              <Text style={style.text}>Email:  {usuario.email}</Text>
              <Text style={style.text}>Tipo de perfil: {usuario.perfil}</Text>
              <Text style={style.text}>Empresa: {usuario.empresa}</Text>
              <Text style={style.text}>Contato da Empresa: {usuario.contato_empresa}</Text>
              <View style={style.containerbotao}>        
                <Text style={style.text}>Notificação por Email:</Text>        
                <Switch
                  trackColor={{false: '#767577', true: '#80d8f4'}}
                  thumbColor={isEnabled ? '#618fff' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                  style={style.botaozin}
                />
              </View>
              <TouchableOpacity onPress={() => setShowModal(false) } style={style.containerClose}>
                <Text style={style.close} >Fechar</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>

        <Modal visible={showModalTermo} animationType="slide">
            <View style={style.modalTermo}>
              <Text style={style.title1}>Termo de Compromisso</Text>
              <Text style={style.text2}>Uma nova versão {termo && `(${termo._id})`} de termo de compromisso foi adicionada.</Text>
              {termo &&               
                <Text style={style.text2}>  
                <Text
                    style={style.hyperlinkStyle}
                    onPress={() => {
                      Linking.openURL(termo.url);
                  }}>
                    Clique aqui
                  </Text>
                  , para mais informações.
                </Text>
              }
              <View style={style.check}>
              <TouchableOpacity style={style.buttonCenter} onPress={acceptTermo}>
                <Text style={style.closeTermo}>Estou ciente do Termo de Compromisso do app</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.buttonCenter} onPress={sair}>
                <Text style={style.closeTermo}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        
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

              <TouchableOpacity style={style.buttonAdm}
                onPress={() => navigation.navigate('Dashboard')}>
                <Text style={style.enterButton}>Relatórios</Text>
              </TouchableOpacity>

            {mostrarNotificacaoChat === 0 ? (
              <>
                <TouchableOpacity style={style.buttonChat}
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
                <TouchableOpacity style={style.buttonChat2}
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
    width:130,
    borderRadius:300,
    height: 40,
    backgroundColor: '#72A2FA',
    color: 'white',
    marginTop:10,
    marginBottom:10
  },
  closeTermo: {
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical:'center',
    width:'75%',
    borderRadius:300,
    height: 50,
    backgroundColor: '#72A2FA',
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
  modalTermo: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  buttonCenter: {
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 20,
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
  text2: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10
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
    marginBottom:20,
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
    right: 86,
    top: 30
  },

  settingsIcon: {
    position: 'absolute',
    right: 53,
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
    height: 100,
},

  iconchat:{
    color:'white'
  },
  
  hyperlinkStyle: {
    color: '#72A2FA',
  },

  check:{
    backgroundColor:'E9EFF7',
    marginTop: 10,
  },

  checkbox: {
    marginTop: 5,
  },

  paragraph: {
    margin: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 5,
    fontSize:15,
    fontWeight: 'bold',
    textAlign: 'left',
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
    justifyContent: 'center',
    height: 50,
    width: 275,
    flexDirection: "row",
    marginLeft: -5,
  },

  botaozin: {
    marginBottom: 14,
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },

  containerClose: {
    alignItems: 'center',
  }

});


export default Home;