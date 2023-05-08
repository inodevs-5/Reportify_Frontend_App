/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {StyleSheet, View,Text,TextInput,TouchableOpacity,Platform, Linking, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../contexts/auth';

export const Login = () =>{

  const [hidepass,setHidepass] = useState(true);
  
  const { signIn } = useAuth();
  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false)

  async function login() {
    setLoading(true);
    try {
      await signIn(email, senha);
    } catch (response) {
      setErrorMessage(response.data.msg);
    }
    setLoading(false);
  }

  return (
    <View style={style.container}>
    { !!errorMessage && <Text style={{color: "red", fontSize: 15, marginBottom: 20}}>{ errorMessage }</Text>}
    <Text style={style.login}>Login</Text>
     <TextInput 
     style={style.input} 
     placeholder='user@email.com.br'
     onChangeText={texto => setEmail(texto)}
     ></TextInput>


    <View style={style.input} >

      <TextInput style={style.password}  placeholder='senha'  
        value={senha} 
        onChangeText={(texto => setSenha(texto))}
        secureTextEntry={hidepass}>
        </TextInput>
       
       
        <TouchableOpacity name='eye'    
        style={style.icon} 
        onPress={() => setHidepass(!hidepass) }>
        { hidepass ? 
          <Icon name='eye' size={21} />
         :      
         <Icon name='eye-off' size={21} />
         
        }
        </TouchableOpacity>
    </View>
      {
        !loading ? (
          <TouchableOpacity style={style.button} onPress={login}>
            <Text style={style.valeu}>Send</Text>
          </TouchableOpacity>
        ) : (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#666"/>
          </View>
        )
      }

      <Text
            style={style.hyperlinkStyle}
            onPress={() => {
              Linking.openURL('');
          }}>
             Forgot your passaword?
          </Text>
          <View style={style.bar} />
    </View>
    
  );
}

const style = StyleSheet.create({

  icon:{
    color:'black',
    paddingRight:6,
  },

  password:{
    width:200,
    height:40,
    // backgroundColor:'red'
  },

  input: {
    alignItems:'center',
    flexDirection:'row',
    backgroundColor: '#ffff',
    justifyContent:'space-between',
    margin:'auto',
    color: 'black',
    paddingLeft:6,
    width:260,
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

  login:{
    color:'black',
    fontSize:30,
    marginBottom:50
  },
  container: {
    flex:1,
    backgroundColor: '#F9FbFa',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: { fontFamily: 'Arial', }, 
      android: { fontFamily: 'Roboto' }}),


  },
  hyperlinkStyle: {
    color: '#72A2FA',
    marginTop: 25,
    fontSize:12
  },
  button:{
    width:260,
    borderRadius:300,
    height: 40,
    backgroundColor: '#72A2FA',
    marginBottom:10
    
  },
  valeu:{
    textAlign:'center',
   paddingTop:8,
   color:'white'
  },

  bar:{
    backgroundColor: '#68696C',
    width:190,
    height:2,
    marginTop:10
  }
});

export default Login;