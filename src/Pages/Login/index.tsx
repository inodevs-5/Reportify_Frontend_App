/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, View,Text,TextInput,TouchableOpacity,Platform, Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native' 
import { propsStack } from '../../Routes/Stack/Models';

export const Login = () =>{
  const navigation = useNavigation<propsStack>()
  return (
       <View style={style.container}>
    <Text style={style.login}>Login</Text>
     <TextInput style={style.input} placeholder='user@email.com.br'></TextInput>
      <TextInput style={style.input} secureTextEntry={true} placeholder='senha' ></TextInput>
      <TouchableOpacity style={style.button}>
            <Text style={style.valeu}
                 onPress={() => 
                 navigation.navigate('Home')
                 }
            >Send</Text>
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
  input: {
    display:'flex',
    backgroundColor: '#ffff',
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