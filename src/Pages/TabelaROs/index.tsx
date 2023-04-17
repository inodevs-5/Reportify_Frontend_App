import React, { useState, useEffect } from 'react';
import {StyleSheet, View,Text,TextInput,TouchableOpacity,Platform, ActivityIndicator ,Alert, KeyboardAvoidingView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { propsStack } from '../../Routes/Stack/Models';
import Icon from 'react-native-vector-icons/Ionicons';
import api from '../../services/api';
import { ScrollView } from 'react-native';
import { Props } from '@react-native-community/checkbox/dist/CheckBox.android';
import { Ro } from '../../types/Types';
import  Menu  from '../../components/menu';

export const TabelaROs = () =>{
    const navigation = useNavigation();
    const [input, setInput] = useState('');
    const [inputFocus, setInputFocus] = useState(false);
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

    function handlePress(numroOcorrencia:Ro): void {
      navigation.navigate('EditaRos' , {numroOcorrencia})
    }


  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : null}
    style={{flex: 1, backgroundColor: '#ffff',}}
    keyboardVerticalOffset={100}>
      <ScrollView 
    contentContainerStyle={{ flexGrow: 1 }} 
    keyboardShouldPersistTaps="always"
  >
<View style={style.container}>
    <View style={style.containerbusca}>
        <View style={style.container12}>
          <TextInput style={style.busca}
           placeholder='Buscar RO'  
           value={input} 
           onChangeText={(texto => setInput(texto))}>
          </TextInput>
          <TouchableOpacity style={style.searchIcon} onPress={pesquisar}>
          <Icon name='search' size={21} />
           </TouchableOpacity>
        </View>
        <View style={style.bar}/>
      </View>




    <View style={style.squareContainer} >
      {errorMessage && <Text style={{color: 'red', textAlign: 'center'}}>{errorMessage}</Text>}
      <ScrollView nestedScrollEnabled={true}> 
      {
        ros && !loading ? ros.map(ro => (
        <View key={ro.numroOcorrencia} style={style.square}>
          <TouchableOpacity onPress={() => handlePress(ro.numroOcorrencia) }>
            <View>
          <Text style={style.square}> <Text style={style.bold}>#{ro.numroOcorrencia} </Text>
              {'\n'} <Text style={style.bold}>Título: {ro.tituloOcorrencia}</Text>
              {'\n'} <Text style={style.bold}>Status: </Text> sem tratemento
              {'\n'} <Text style={style.bold}>Situação: </Text><Text style={style.normal}>{ro?.id}</Text>
          </Text>
          </View>
          </TouchableOpacity>
          </View>
        )) 
      :
      <View style={{ height:40 ,}}>
        <ActivityIndicator size="large" color="#666"/>
    </View>
    }
      </ScrollView>
    </View>
    <Menu/>
      
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  containerbusca:{
    display:'flex',
    flexDirection:'column',
    width:"80%",
    marginVertical:20,
    height:0
    
  },
  container12:{
    flexDirection:'row',
    // width: '70%',
    height:40,
    margin:'auto',
    alignItems:'center',
    justifyContent:'space-around',
  },
squareContainer: {
    // display:'flex',
    flexDirection: 'column',
    alignItems:'center',
    // backgroundColor:"red",
    justifyContent:'center',
    borderRadius:20,
    height:"70%",
    padding:5,
    // marginBottom:'16%'
  },
  square: {
    width: 300,
    minHeight: 100,
    backgroundColor: '#c3c9d0',
    marginVertical: 10,
    borderRadius: 10,
    fontWeight: 'normal',
    fontSize: 20,
  },

  searchIcon:{
    width:"15%",
    alignItems:'flex-end',
    padding:2,
  },
  
  busca:{
    textAlign: 'left',
    width: '80%',
    fontWeight: 'bold',
  },



  title:{
    fontSize: 35,
    marginTop: 30,
    marginRight: 115,
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    ...Platform.select({
      ios: { fontFamily: 'Arial', }, 
      android: { fontFamily: 'Roboto' }}), 
    display:'flex',
    justifyContent: 'space-around',
    margin:'auto',
    // height:"300%",
    alignItems: 'center',
    flexDirection: 'column',
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
  

  bar:{
    backgroundColor: '#68696C',
    width: "80%",
    height: 2,
    marginTop: -6
  },
  bold: {
    fontWeight: '700',
    color: '#000',
  },
  normal: {
    fontWeight: '600',
    color: '#000',
  },
  urgente: {
    fontWeight: '600',
    color: '#ff0000',
  }
});

export default TabelaROs;