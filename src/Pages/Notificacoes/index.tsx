import React, { useState, useEffect } from 'react';
import {StyleSheet, View,Text,TextInput,TouchableOpacity,Platform, ActivityIndicator, KeyboardAvoidingView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { propsStack } from '../../Routes/Stack/Models';
import Icon from 'react-native-vector-icons/Ionicons';
import api from '../../services/api';
import { ScrollView } from 'react-native';
import { useAuth } from '../../contexts/auth';

export const Notificacoes = () =>{
  const navigation = useNavigation<propsStack>();
  const { usuario } = useAuth();

  //Inicio da lógica para as notificações:
  const [notifications, setNotifications] = useState([
    { text: 'Mensagem recebida de RO03', date: new Date() },
    { text: 'Novo status de RO', date: new Date() },
    { text: 'RO finalizado', date: new Date() },
    { text: 'Mensagem recebida de RO02', date: new Date() },
    { text: 'Mensagem recebida de RO01', date: new Date() },
    { text: 'Mensagem recebida de RO04', date: new Date() },
    { text: 'Mensagem recebida de RO05', date: new Date() },
  ]);
  return (
    
    
    <><View style={style.container}>
      <ScrollView>
        {notifications.map((notification, index) => (
          <View key={index}>
            <Text style={style.text}>{notification.text}</Text>
            <Text style={style.date}>{notification.date.toLocaleString()}</Text>
            <View style={style.separator} />{/*Linha que separa as notificações */}
          </View>
        ))}
      </ScrollView>
    </View><View>
        <View style={style.menu}>
          <TouchableOpacity style={style.enterButton}>
            <Icon name='home' size={27} style={style.iconHome}
              onPress={() => navigation.navigate('Home')} />
          </TouchableOpacity>

          <TouchableOpacity style={style.enterButton}>
            <Icon name='notifications' size={27} style={style.iconNotif}
              onPress={() => navigation.navigate('Notificacao')} />
          </TouchableOpacity>
        </View>
      </View></>
          
     
          
          
        
        
  );
}

const style = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
    padding: 16,
  },
  text: {
    fontSize: 18,
    color: '#000',
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#000',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#68696C',
    marginBottom: 16,
  },
  menu:{
    display: 'flex',
    justifyContent:'space-around',
    backgroundColor: '#2B3467',
    alignItems: 'center',
    flexDirection: 'row',
    width: 300,
    height: 60,
    borderRadius: 20,
    marginBottom: 10,
    marginLeft: 8,
   },
  containerbusca:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    marginTop: 6 ,
    // backgroundColor:'red',
  },
  container12:{
    flexDirection:'row',
    width:300,
    height:40,
    margin:'auto',
    alignItems:'center',
    justifyContent:'space-between',
    // backgroundColor:'yellow',
  },
squareContainer: {
    flexDirection: 'column',
    // alignItems: 'center',
  },
  square: {
    width: 300,
    height: 150,
    backgroundColor: '#C3C9D0',
    marginVertical: 10,
    borderRadius: 10,
    fontWeight: 'normal',
    fontSize: 20,
  },

  searchIcon:{
    color: 'black',
  },
  
  busca:{
    textAlign: 'left',
    width: 300,
    height:40,
    // marginBottom: -30,
    fontWeight: 'bold',
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
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    margin:"auto",
    width: 300,
    height: 70,
    backgroundColor: '#2B3467',
    top: 500,
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
    backgroundColor: '#ffff',
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

  //container: {
  //  flex: 1,
    //...Platform.select({
    //  ios: { fontFamily: 'Arial', }, 
    //  android: { fontFamily: 'Roboto' }}), 
   // display:'flex',
   // justifyContent: 'space-between',
   // margin:'auto',
   // alignItems: 'center',
   // flexDirection: 'column',
//  },

  hyperlinkStyle: {
    color: '#72A2FA',
    marginTop: 25,
    fontSize: 12
  },

  button:{
    width: 140,
    padding: 5,
    marginHorizontal: 5,
    paddingBottom: 15,
    backgroundColor: '#72A2FA',
    marginBottom: 5,
    marginTop: 10,
    borderRadius: 7,
    alignItems: 'center'
  },

  buttonSelected:{
    width: 140,
    padding: 5,
    marginHorizontal: 5,
    paddingBottom: 15,
    backgroundColor: '#6368f8',
    marginBottom: 5,
    marginTop: 10,
    borderRadius: 7,
    alignItems: 'center'
  },

  textButton: {
    textAlign:'center',
    paddingTop:8,
    color:'white',
    fontSize: 16,
  },

  groupButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  
  enterButton:{
    color: 'white',
    fontSize: 20,
  },

  bar:{
    backgroundColor: '#68696C',
    width: 290,
    height: 2,
    marginTop: 0
  },
  scroll: { 
    marginLeft: 10,
    paddingRight: 10,

  },
  bold: {
    fontWeight: 'bold',
    color: '#000',
  }
});

export default Notificacoes;
