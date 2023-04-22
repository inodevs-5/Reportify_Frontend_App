import React, { useState, useEffect } from 'react';
import {StyleSheet, View,Text, ScrollView, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';


export const Menu = ()  => {
    const navigation = useNavigation();
    return(
  <View style={style.container}>
      <View style={style.menu}>
        <TouchableOpacity style ={style.enterButton}>
        <Icon name='home' size={27} style={style.iconHome}
          onPress={() => 
            navigation.navigate('Home')
            }/>
        </TouchableOpacity>
   
        <TouchableOpacity style ={style.enterButton}>
        <Icon name='notifications' size={27} style={style.iconHome}
          onPress={() => 
            navigation.navigate('Login')
            }/>
        </TouchableOpacity>
      </View>
    </View>
    );
    }
    const style = StyleSheet.create({
        menu:{
            justifyContent:'space-around',
            backgroundColor: '#2B3467',
            alignItems: 'center',
            flexDirection: 'row',
            width:300,
            height:60,
            borderRadius:20,
            marginBottom:10,
           },
           container: {
            position: 'relative',
            bottom: 0,
            padding: 10,
          },
           enterButton:{
            color: 'white',
            fontSize: 20,
          },
          iconHome: {
            color: 'white',
          },
    })
export default Menu;