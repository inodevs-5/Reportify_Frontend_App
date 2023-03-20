/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {StyleSheet, View,Text,TextInput,TouchableOpacity,Platform, Linking,Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { propsStack } from '../../Routes/Stack/Models';
import Icon from 'react-native-vector-icons/Ionicons'


export const Login = () =>{
  const navigation = useNavigation<propsStack>()
  const [input, setInput] = useState('');
  const [hidepass,setHidepass] = useState(true);
  return (
       <View style={style.container}>
    <Text style={style.login}>Login</Text>
     <TextInput 
     style={style.input} 
     placeholder='user@email.com.br'
     ></TextInput>


    <View style={style.input} >

      <TextInput style={style.password}  placeholder='senha'  
        value={input} 
        onChangeText={(texto => setInput(texto))}
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

      <TouchableOpacity style={style.button}
        onPress={() => 
        navigation.navigate('Home')
        }>
        <Text style={style.valeu}>Send</Text>
      </TouchableOpacity>
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