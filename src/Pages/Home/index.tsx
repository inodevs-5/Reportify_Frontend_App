/* eslint-disable quotes */
import React, { useState } from 'react';
import {StyleSheet,Modal, View,Text,TextInput,TouchableOpacity,Platform, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { propsStack } from '../../Routes/Stack/Models';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';
import Icone from 'react-native-vector-icons/FontAwesome';
export const Home = () =>{
  const { usuario, signOut } = useAuth();

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

              <TouchableOpacity style={style.buttonChat}
                onPress={() => 
                  navigation.navigate('Contatos')
                }>
              <Text style={style.enterButton}>Meus Chats</Text><Icon style={style.iconchat} name='ios-chatbubbles' size={30} color={'black'} ></Icon>
          </TouchableOpacity>
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

              <TouchableOpacity style={style.buttonChat2}
                onPress={() => 
                  navigation.navigate('Contatos')
                  }>
                    <Text style={style.enterButton}>Meus Chats</Text><Icon style={style.iconchat} name='ios-chatbubbles' size={30} color={'black'} ></Icon>
              </TouchableOpacity>
            </>
          )}

        </View>

        <View>
          <View style={style.menu}>
            <TouchableOpacity style={style.enterButton}>
              <Icon name='home' size={27} style={style.iconHome}
                onPress={() => navigation.navigate('Login')} />
            </TouchableOpacity>

            <TouchableOpacity style={style.enterButton}>
              <Icon name='notifications' size={27} style={style.iconNotif}
                onPress={() => navigation.navigate('Notificacoes')} />
            </TouchableOpacity>
          </View>
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
    margin:'auto',
    width:300
  },
  menu:{
   display:'flex',
   justifyContent:'space-around',
   backgroundColor: '#2B3467',
   alignItems: 'center',
   flexDirection: 'row',
   width:300,
   height:60,
   borderRadius:20,
   marginBottom:10

   
  },
  
   iconNotif:{
    paddingLeft: 70,
    color: 'white',
  },
  
  iconHome: {
    color: 'white',
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
    height: 100,
},

  iconchat:{
    color:'white'
  },
});


export default Home;