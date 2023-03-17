
import React from 'react';
import {StyleSheet, View,Text,TextInput,TouchableOpacity,Platform, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
export const Home = () =>{
  return (
       <View style={style.input}>
    <Text>Home</Text>
    <Icon name="eye" size={70} color="black" />
    </View>
    
  );
}
const style = StyleSheet.create({
  input: {
    backgroundColor:'#red',
  },

})





export default Home;