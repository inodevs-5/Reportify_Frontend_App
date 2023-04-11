/* eslint-disable quotes */
import React, { useState } from 'react';
import {StyleSheet, View,Text,TextInput,TouchableOpacity,Platform, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { propsStack } from '../../Routes/Stack/Models';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';

export const Home = () =>{
  const { usuario, signOut } = useAuth();

  const navigation = useNavigation<propsStack>()
  const [input, setInput] = useState('');

  return (
    <View style={style.container}>
      <Text style={style.title}>Olá, {usuario.nome}!</Text>
      <TouchableOpacity onPress={signOut} style={style.exitIcon} >
        <Icon name='exit-outline' size={30} />
      </TouchableOpacity>
      <View style={style.containerbusca}>
        <View style={style.container12}>
      <TextInput style={style.busca}  
        placeholder='Buscar RO'  
        value={input} 
        onChangeText={(texto => setInput(texto))}>
      </TextInput>
      <Icon name='search' size={21} style={style.searchIcon}/>
      </View>
      <View style={style.bar}/> 
       </View>

     <View style={style.buttons}>

        {usuario.perfil === "admin" && ( 
          <>
          <TouchableOpacity style={style.buttonAdm}
            onPress={() => 
            navigation.navigate('TabelaROs')
            }>
            <Text style={style.enterButton}>Registro de Ocorrência</Text>
          </TouchableOpacity>
    
          <TouchableOpacity style={style.buttonAdm}
            onPress={() => 
            navigation.navigate('TabelaUsuarios')
            }>
            <Text style={style.enterButton}>Membros do Suporte</Text>
          </TouchableOpacity>
    
          <TouchableOpacity style={style.buttonAdm}
            onPress={() => 
            navigation.navigate('CadastroRO')
            }>
            <Text style={style.enterButton}>Novo Registro de Ocorrência</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={style.buttonAdm}
            onPress={() => 
            navigation.navigate('TabelaUsuarios')
            }>
            <Text style={style.enterButton}>Administração do Sistema</Text>
          </TouchableOpacity>
          </>
        )}

        {usuario.perfil === "suporte" && ( 
          <>
          <TouchableOpacity style={style.buttonSup}
            onPress={() => 
            navigation.navigate('TabelaROs')
            }>
            <Text style={style.enterButton}>Registro de Ocorrência</Text>
          </TouchableOpacity>
    
          <TouchableOpacity style={style.buttonSup}
            onPress={() => 
            navigation.navigate('TabelaROs')
            }>
            <Text style={style.enterButton}>Minhas Tasks</Text>
          </TouchableOpacity>
    
          <TouchableOpacity style={style.buttonSup}
            onPress={() => 
            navigation.navigate('CadastroRO')
            }>
            <Text style={style.enterButton}>Novo Registro de Ocorrência</Text>
          </TouchableOpacity>
          </>
        )}

        {usuario.perfil === "cliente" && ( 
          <>
          <TouchableOpacity style={style.buttonClt}
            onPress={() => 
            navigation.navigate('CadastroRO')
            }>
            <Text style={style.enterButton}>Novo Registro de Ocorrência</Text>
          </TouchableOpacity>
    
          <TouchableOpacity style={style.buttonClt2}
            onPress={() => 
            navigation.navigate('TabelaROs')
            }>
            <Text style={style.enterButton}>Acompanhar Meus Registros de Ocorrência</Text>
          </TouchableOpacity>
          </>
        )}

      </View>

  <View style={style.containermenu}>
      <View style={style.menu}>
        <TouchableOpacity style={style.enterButton}>
        <Icon name='home' size={27} style={style.iconHome}
          onPress={() => 
            navigation.navigate('Login')
            }/>
        </TouchableOpacity>
   
        <TouchableOpacity style={style.enterButton}>
        <Icon name='notifications' size={27} style={style.iconNotif}
          onPress={() => 
            navigation.navigate('Login')
            }/>
        </TouchableOpacity>
      </View>
      </View>

    </View>
  );
}

const style = StyleSheet.create({

  searchIcon:{
    color: 'black',
    // backgroundColor: 'yellow',
  },

  containermenu:{
      // position: 'relative',
      // alignItems: 'center',
      // width: 300,
      // height: 70,
      // backgroundColor: '#2B3467',
      // // marginBottom: -100,
      // // marginTop: 160,
      // borderRadius: 35,
      // alignSelf: 'flex-end',
  },

  containerbusca:{
    // backgroundColor:'yellow',
    display:'flex',
    flexDirection:'column',
  },

  container12:{
    flexDirection:'row',
    width: 300,
    height:40,
    margin:'auto',
    alignItems:'center',
    justifyContent:'space-between'
  },
  buttons:{
    // backgroundColor:'red',
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
  
  
  busca:{
    textAlign: 'left',
    width: 250,
    height: 40,
    // marginBottom: -30,
    fontWeight: 'bold',
    paddingTop:10,
    // backgroundColor:'red',
  },

  iconNotif:{
    paddingLeft: 70,
    color: 'white',
  },
  
  iconHome: {
    // paddingLeft: 90,
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

  input: {
    flex: 1,
    alignItems:'center',
    flexDirection:'row',
    backgroundColor: '#2B3467',
    justifyContent:'space-between',
    margin:'auto',
    color: 'black',
    paddingLeft:6,
    width:300,
    height:40,
    marginBottom: 10,
    borderRadius:300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  container: {
    // backgroundColor: '#F9FbFa',
    // display:'flex',
    // margin:'auto',
    // alignItems: 'center',
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

  hyperlinkStyle: {
    color: '#72A2FA',
    marginTop: 25,
    fontSize: 12
  },

  buttonAdm :{
    alignItems: 'center',
    width: 300,
    padding: 15,
    backgroundColor: '#72A2FA',
    marginBottom: 20,
    // marginTop: 20,
    borderRadius: 7,
  },
  
  buttonSup :{
    alignItems: 'center',
    width: 300,
    paddingTop: 30,
    backgroundColor: '#72A2FA',
    marginBottom: 20,
    borderRadius: 7,
    height: 90,
  },

  buttonClt :{
    alignItems: 'center',
    width: 300,
    paddingTop: 60,
    padding: 15,
    backgroundColor: '#72A2FA',
    marginBottom: 20,
    borderRadius: 7,
    height: 140,
  },

  buttonClt2 :{
    alignItems: 'center',
    width: 300,
    paddingTop: 40,
    padding: 15,
    backgroundColor: '#72A2FA',
    marginBottom: 20,
    borderRadius: 7,
    height: 140,
  },

  enterButton:{
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },

  bar:{
    backgroundColor: '#68696C',
    width: 290,
    height: 2,
    // marginTop: -10
  },

  exitIcon: {
    position: 'absolute',
    right: 50,
    top: 30
  }
});


export default Home;