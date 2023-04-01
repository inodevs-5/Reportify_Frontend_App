import React, { useState, useEffect } from 'react';
import {StyleSheet, View,Text,TextInput,TouchableOpacity,Platform, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { propsStack } from '../../Routes/Stack/Models';
import Icon from 'react-native-vector-icons/Ionicons';
import api from '../../services/api';
import { ScrollView } from 'react-native';

export const TabelaROs = () =>{
    const navigation = useNavigation<propsStack>();
    const [input, setInput] = useState('');

    const [errorMessage, setErrorMessage] = useState(null);
    const [ros, setRos] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      (async () => {
        try {
          const response = await api.get('/ro');
  
          setRos(response.data);
          setLoading(false)
        } catch (response) {
          setErrorMessage(response.data.msg);
        }
      })();
    }, []);

    async function pesquisar() {
      try {
        setLoading(true)
        const response = await api.get('/ro/' + input);
        setRos(response.data);
        setLoading(false)
      } catch (response) {
        setErrorMessage(response.data.msg);
      }
    }

  return (
    // <View style={style.container}>
    // <TextInput style={style.busca}  
    //   placeholder='Buscar RO'  
    //   value={input} 
    //   onChangeText={(texto => setInput(texto))}>
    // </TextInput> 
    // <TouchableOpacity onPress={pesquisar}>
    //   <Icon name='search' size={21} style={style.searchIcon}/>
    // </TouchableOpacity>
    // <View style={style.bar}/> 
<View style={style.container}>
    <View style={style.containerbusca}>
        <View style={style.container12}>
          <TextInput style={style.busca}
           placeholder='Buscar RO'  
           value={input} 
           onChangeText={(texto => setInput(texto))}>
          </TextInput>
          <TouchableOpacity onPress={pesquisar}>
          <Icon name='search' size={21} style={style.searchIcon}/>
           </TouchableOpacity>
        </View>
      </View>

     {/* <TextInput style={style.busca}  
        placeholder='Buscar RO'  
        value={input} 
        onChangeText={(texto => setInput(texto))}>
      </TextInput>
      <Icon name='search' size={21} style={style.searchIcon}/>
      <View style={style.bar}/>  */}

    <View style={style.squareContainer}>
    <View style={{height: 490}}>
      {errorMessage && <Text style={{color: 'red', textAlign: 'center'}}>{errorMessage}</Text>}
      <ScrollView style={style.scroll}>
      {
        ros && !loading ? ros.map(ro => (
        <View style={style.square}>
          <Text style={style.square}> <Text style={style.bold}>#0000 </Text>
              {'\n'} <Text style={style.bold}>Título: </Text>{ro.tituloOcorrencia}
              {'\n'} <Text style={style.bold}>Status: </Text>{ro.fase}
              {'\n'} <Text style={style.bold}>Atribuído para: </Text>{ro.nomeResponsavel}
          </Text>
          </View>
        )) :
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#666"/>
      </View>
      }
      </ScrollView>
    </View>
{/* <View style={fler}> */}
    <View >
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
       {/* </View> */}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  menu:{
    display:'flex',
    justifyContent:'space-around',
    backgroundColor: '#2B3467',
    alignItems: 'center',
    flexDirection: 'row',
    width:300,
    height:60,
    borderRadius:20,
    marginBottom:10,
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
    marginTop: 20,
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

  container: {
    flex: 1,
    ...Platform.select({
      ios: { fontFamily: 'Arial', }, 
      android: { fontFamily: 'Roboto' }}), 
    display:'flex',
    justifyContent: 'space-between',
    margin:'auto',
    alignItems: 'center',
    flexDirection: 'column',
  },

  hyperlinkStyle: {
    color: '#72A2FA',
    marginTop: 25,
    fontSize: 12
  },

  button:{
    alignItems: 'center',
    width: 300,
    padding: 15,
    backgroundColor: '#72A2FA',
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 7,
  },
  
  enterButton:{
    color: 'white',
    fontSize: 20,
  },

  bar:{
    backgroundColor: '#68696C',
    width: 290,
    height: 2,
    marginTop: -10
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

export default TabelaROs;