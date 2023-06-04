import React, { useState, useEffect } from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';

export const Menu = ()  => {

  const { usuario, signOut } = useAuth();
  
  const [mostrarNotificacao, setMostrarNotificacao] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/notificacao/'+ usuario._id);
        const constanteBackend = response.data.numeroNotificacoes;
        setMostrarNotificacao(constanteBackend);
      } catch (error) {
        console.error(error);
      }
    };
    const intervalId = setInterval(fetchData, 1000); // Buscar dados a cada 10 segundos

    return () => {
      clearInterval(intervalId); // Limpar o intervalo quando o componente for desmontado
    };
  }, []);

  const marcarNotificacao = async () => {
    try {
      const response = await api.post('/notificacao/', {id:usuario._id});
      navigation.navigate('Notificacoes')

    } catch (error) {
      console.error(error);
    }
  }

  const navigation = useNavigation();
  return(
  <View>
    <View style={style.menu}>
      <TouchableOpacity style={style.enterButton}>
        <Icon name='home' size={27} style={style.iconHome}
          onPress={() => navigation.navigate('Home')} />
      </TouchableOpacity>
    {mostrarNotificacao === 0 ?(
      <>
        <TouchableOpacity style={style.enterButton}>
          <Icon name='notifications' size={27} style={style.iconNotif}
            onPress={marcarNotificacao}/>
        </TouchableOpacity>
      </>
    ) : (
      <>
        <TouchableOpacity style={style.enterButton}>
          <View style={style.notificacao}>
            <Text style={style.numero}>{mostrarNotificacao}</Text>
          </View>
          <Icon name='notifications' size={27} style={style.iconNotif}
            onPress={marcarNotificacao}/>
        </TouchableOpacity>
      </>
    )}
    </View>
  </View>
    );
    }
    const style = StyleSheet.create({
        // menu:{
        //     justifyContent:'space-around',
        //     backgroundColor: '#2B3467',
        //     alignItems: 'center',
        //     flexDirection: 'row',
        //     width:300,
        //     height:60,
        //     borderRadius:20,
        //     marginBottom:10,
        //    },
        //    container: {
        //     position: 'relative',
        //     bottom: 0,
        //     padding: 10,
        //   },
        //    enterButton:{
        //     color: 'white',
        //     fontSize: 20,
        //   },
        //   iconHome: {
        //     color: 'white',
        //   },
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

        enterButton:{
          textAlign: 'center',
          color: 'white',
          fontSize: 20,
        },

        iconNotif:{
          paddingLeft: 70,
          color: 'white',
        },
        
        iconHome: {
          color: 'white',
        },

        notificacao:{
          marginLeft: 90,
          marginBottom: 30,
          backgroundColor: 'red',
          position: 'absolute',
          borderRadius: 30,
          height: 20,
          width: 20,
          alignItems: 'center',
          justifyContent: 'center',
        },

        numero: {
          color: 'white',
        }
        
    })
export default Menu;