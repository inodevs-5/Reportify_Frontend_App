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
  const [loading, setLoading] = useState(true);
  const [notificacoes, setNotificacoes] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/usuario/' + usuario._id);
        console.log(response.data)
        setNotificacoes(response.data.notificacoes);
        setLoading(false)
      } catch (response) {
        setErrorMessage(response.data.msg);
      }
    })();
  }, []);
  return (
    
    
    <>
        <View style={style.container}>
            <ScrollView>
              {notificacoes && notificacoes.map((notification, index) => (
                <View key={index}>
                  <Text style={style.text}>{notification.mensagem}</Text>
                  <Text style={style.date}>{notification.data.toLocaleString()}</Text>
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
