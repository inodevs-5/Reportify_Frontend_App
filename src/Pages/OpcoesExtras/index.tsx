/* eslint-disable quotes */
import React, { useState } from 'react';
import {StyleSheet,Modal, View,Text,TextInput,TouchableOpacity,Platform, ActivityIndicator, ScrollView, Alert, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { propsStack } from '../../Routes/Stack/Models';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';
import Icone from 'react-native-vector-icons/FontAwesome';
import api from '../../services/api';
export const OpcoesExtras = () =>{
  const { usuario, signOut } = useAuth();

  const navigation = useNavigation<propsStack>()
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);// do botão de enviar

  
  const sair = () => {
    navigation.navigate('Home')
    signOut()
  }

  async function forceBackup() {
    setLoading(true)
    console.log('entrou aqui')
    try {
      Alert.alert('Backup Iniciado!!');
      const response = await api.post('/forceBackup');

    } catch (response) {
      console.log(response.data.msg);
    }
    setLoading(false)
  }

  async function forceRestore() {
    setLoading(true)

    try {
      Alert.alert('Restauração Iniciada!!');

      const response = await api.post('/forceRestore');

    } catch (response) {
      Alert.alert(response.data.msg);
    }
    setLoading(false)
  }


  return (

    <View style={style.container}>
      <ScrollView >
        <Text style={style.describe_top}>
          Este site foi desenvolvido para criar o backup do banco de dados de mês em mês automaticamente.
          Porém, o botão abaixo força a criação de um arquivo de backup do banco de dados atual.
        </Text>
        <TouchableOpacity onPress={sair} style={style.exitIcon}>
          <Icon name='exit-outline' size={30} />
        </TouchableOpacity>

        <View style={style.buttons}>
          {usuario.perfil === "admin" ? (
            <>

              <TouchableOpacity style={style.buttonAdm}
                onPress={forceBackup}>
                <Text style={style.enterButton}>Forçar Backup</Text>
              </TouchableOpacity>

            </>
          ) : (
            <>

              <TouchableOpacity style={style.buttonClt2}
                onPress={forceBackup}>
                <Text style={style.enterButton}>Forçar Backup</Text>
              </TouchableOpacity>

            </>
          )}
        </View>


        <Text style={style.describe}>
          O botão abaixo proporciona a opção de restauração do banco de dados utilizando o último arquivo de backup criado.
        </Text>

        <View style={style.buttons}>
          {usuario.perfil === "admin" ? (
            <>

              <TouchableOpacity style={style.buttonAdm}
                onPress={forceRestore}>
                <Text style={style.enterButton}>Restaurar Backup</Text>
              </TouchableOpacity>

            </>
          ) : (
            <>

              <TouchableOpacity style={style.buttonClt2}
                onPress={forceRestore}>
                <Text style={style.enterButton}>Restaurar Backup</Text>
              </TouchableOpacity>

            </>
          )}
        </View>


        <Text style={style.describe}>
          Tratando-se de segurança de dados dos usuários, nossa empresa se responsabiliza pela utilização
          de tais, tendo portanto um arquivo com termos de compromisso que temos aos nossos clientes
        </Text>

        <View style={style.buttons}>
          {usuario.perfil === "admin" ? (
            <>

              <TouchableOpacity style={style.buttonAdm}
                onPress={() => Linking.openURL('https://docs.google.com/document/d/e/2PACX-1vS95FEPOWKp-Kp2GidnxjKPfdNse9LGssZFxurbmqgSw09eIIfwxXjvZUmzr0UwWLLt5XviUjmHXQE8/pub')}>
                <Text style={style.enterButton}>Termos de Compromisso</Text>
              </TouchableOpacity>

            </>
          ) : (
            <>

              <TouchableOpacity style={style.buttonClt2}
                onPress={() => Linking.openURL('https://docs.google.com/document/d/e/2PACX-1vS95FEPOWKp-Kp2GidnxjKPfdNse9LGssZFxurbmqgSw09eIIfwxXjvZUmzr0UwWLLt5XviUjmHXQE8/pub')}>
                <Text style={style.enterButton}>Termos de Compromisso</Text>
              </TouchableOpacity>

            </>
          )}
        </View>
      </ScrollView>

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
    margin: 10,
    width:300,
    marginLeft: 45
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

  describe_top:{
    fontSize: 19,
    marginTop: 80,
    margin: 10,
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
  },

  describe:{
    fontSize: 19,
    marginTop: 15,
    marginBottom: 10,
    margin: 10,
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


export default OpcoesExtras;

function setLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}
