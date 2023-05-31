import React, { useEffect, useState } from 'react';
import {StyleSheet, View,Text,TextInput,TouchableOpacity,Platform, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { propsStack } from '../../Routes/Stack/Models';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';
import { ScrollView } from 'react-native-gesture-handler';
import Menu from '../../components/menu';

export const Membro_suporte = () =>{
  const { signOut } = useAuth();

  const [usuarios, setUsuarios] = useState()

  const navigation = useNavigation<propsStack>()
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/usuario');

        setUsuarios(response.data);
        setLoading(false)
      } catch (response) {
        Alert.alert(response.data.msg);
      }
    })();
  }, []);

  async function pesquisar() {
    setLoading(true)
    try {
      const response = await api.get('/usuario/search/' + input);

      setUsuarios(response.data);
    } catch (response) {
      Alert.alert(response.data.msg);
    }
    setLoading(false)
  }

  async function cancel() {
    setLoading(true)
    setInput('')
    try {
      const response = await api.get('/usuario');

      setUsuarios(response.data);
    } catch (response) {
      Alert.alert(response.data.msg);
    }
    setLoading(false)
  }

  return (
    <View style={style.container}>
      <Text style={style.title}>Membros do Suporte:</Text>
      {/* <TouchableOpacity onPress={signOut} style={style.exitIcon} >
        <Icon name='exit-outline' size={30} />
      </TouchableOpacity> */}
      <View style={style.containerbusca}>
        <View style={style.container12}>
      <TextInput style={style.busca}  
        placeholder='Buscar suporte'  
        value={input} 
        onChangeText={(texto => setInput(texto))}>
      </TextInput>
      <TouchableOpacity onPress={cancel}>
        <Text style={style.cancel}>X</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={pesquisar}>
        <Icon name='search' size={21} style={style.searchIcon}/>
      </TouchableOpacity>
      </View>
      <View style={style.bar}/> 
       </View>
      
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1, marginTop: 10 }} 
          keyboardShouldPersistTaps="always"
        >
        {/* {usuarios && !loading && usuarios.length < 1 && <Text style={{marginTop: 20}}>Não há nenhum usuario cadastrado.</Text>} */}
        { 
          usuarios && !loading ? usuarios.map(usuario => (
        <View style={style.buttons} key={usuario._id}>
          <TouchableOpacity style={style.button}
            key={usuario._id}
            onPress={() => 
            navigation.navigate('EditarUsuario', {id:usuario._id})
            }>
            <Text key={usuario._id} style={style.enterButton}>{usuario.nome}</Text>
          </TouchableOpacity> 
        </View>
        )) : <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#666"/>
        </View>
        }
      </ScrollView>

    <View style={{position:'absolute',  bottom: 0}}>
      <Menu/>
    </View>
    
       {/* </View> */}
      </View>
  );
}

const style = StyleSheet.create({

  searchIcon:{
    color: 'black',
    marginLeft: 10,
    // backgroundColor: 'yellow',
  },

  containermenu:{
      // position: 'relative',
      // alignItems: 'center',
      // width: 300,
      // height: 70,
      // backgroundColor: '#2B3467',
      // // marginBottom: -100,
      // // marginTop: 160,
      // borderRadius: 35,
      // alignSelf: 'flex-end',
  },

  containerbusca:{
    // backgroundColor:'yellow',
    display:'flex',
    flexDirection:'column',
  },

  container12:{
    flexDirection:'row',
    width: 300,
    height:40,
    margin:'auto',
    alignItems:'center',
    justifyContent:'space-between'
  },
  buttons:{
    // backgroundColor:'red',
    margin:'auto',
    width:300
  },
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
  
  
  busca:{
    textAlign: 'left',
    width: 250,
    height: 40,
    // marginBottom: -30,
    fontWeight: 'bold',
    paddingTop:10,
    // backgroundColor:'red',
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
    position: 'relative',
    alignItems: 'center',
    width: 300,
    height: 70,
    backgroundColor: '#2B3467',
    marginBottom: 10,
    marginTop: 160,
    borderRadius: 35,
  },

  title:{
    fontSize: 25,
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
    backgroundColor: '#2B3467',
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
    // backgroundColor: '#F9FbFa',
    // display:'flex',
    // margin:'auto',
    // alignItems: 'center',
    flex: 1,
    ...Platform.select({
      ios: { fontFamily: 'Arial', }, 
      android: { fontFamily: 'Roboto' }}), 
    display:'flex',
    justifyContent: 'space-between',
    margin:'auto',
    alignItems: 'center',
    flexDirection: 'column'
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
    marginBottom: 20,
    // marginTop: 20,
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
    // marginTop: -10
  },

  exitIcon: {
    position: 'absolute',
    right: 50,
    top: 30
  }, 
  cancel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 25,
  }
});


export default Membro_suporte;