import React, { useState, useEffect } from 'react';
import {StyleSheet, View,Text,TextInput,TouchableOpacity,Platform, ActivityIndicator, KeyboardAvoidingView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { propsStack } from '../../Routes/Stack/Models';
import Icon from 'react-native-vector-icons/Ionicons';
import api from '../../services/api';
import { ScrollView } from 'react-native';
import { useAuth } from '../../contexts/auth';
import Menu from '../../components/menu';

export const Notificacoes = () =>{
  const navigation = useNavigation<propsStack>();
  const { usuario } = useAuth();

  //Inicio da lógica para as notificações:
  const [notifications, setNotifications] = useState([ //cria um estado 'notifications' e abaixo adiciona objetos ao array
    { text: 'Mensagem recebida de RO03', date: new Date() },
    { text: 'Novo status de RO', date: new Date() },
    { text: 'RO finalizado', date: new Date() },
    { text: 'Mensagem recebida de RO02', date: new Date() },
    { text: 'Mensagem recebida de RO01', date: new Date() },
    { text: 'Mensagem recebida de RO04', date: new Date() },
    { text: 'Mensagem recebida de RO05', date: new Date() },
  ]);
  return (
    
    
    <>
        <View style={style.container}>
            <ScrollView>
              {notifications.map((notification, index) => (
                <View key={index}>
                  <Text style={style.text}>{notification.text}</Text>
                  <Text style={style.date}>{notification.date.toLocaleString()}</Text>
                  <View style={style.separator} />{/*Linha que separa as notificações */}
                </View>
              ))}
            </ScrollView>
          </View>
        <View style={style.alinhamenu}>
        <Menu/>
        </View>  
       
      </>
          
     
          
          
        
        
  );
}

const style = StyleSheet.create({

  alinhamenu:{
    alignItems:'center',
  },

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
 
   iconNotif:{
    paddingLeft: 70,
    color: 'white',
  },
  
  iconHome: {
    // paddingLeft: 90,
    color: 'white',
  },

 








  



 
});

export default Notificacoes;
