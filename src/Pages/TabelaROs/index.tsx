import React, { useState, useEffect } from 'react';
import {StyleSheet, View,Text,TextInput,TouchableOpacity,Platform, ActivityIndicator ,Alert, KeyboardAvoidingView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { propsStack } from '../../Routes/Stack/Models';
import Icon from 'react-native-vector-icons/Ionicons';
import api from '../../services/api';
import { ScrollView } from 'react-native';
import { useAuth } from '../../contexts/auth';

export const TabelaROs = ({ route }) =>{
    const navigation = useNavigation<propsStack>()
    const { usuario } = useAuth();
    const [input, setInput] = useState('');
    const [inputFocus, setInputFocus] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [ros, setRos] = useState();
    const [allRos, setAllRos] = useState();
    const [myRos, setMyRos] = useState();
    const [loading, setLoading] = useState(true);
    const [selectedFirstButton, setSelectedFirstButton] = useState(true);


    useEffect(() => {
      (async () => {
        try {
          if (usuario.perfil == "admin") {
            setSelectedFirstButton(true);
            const response = await api.get('/ro');
            setAllRos(response.data);
            setRos(response.data);
            const response2 = await api.get('/ro/atribuido/' + usuario._id);
            setMyRos(response2.data);
          } else {
            setSelectedFirstButton(false);
            const response = await api.get('/ro/relator/' + usuario._id);
            setRos(response.data);
          }

          setLoading(false);
        } catch (response) {
          setErrorMessage(response.data.msg);
        }
      })();
    }, []);

    function changeToAll() {
      if (!selectedFirstButton) {
        try {
          setSelectedFirstButton(true);
          setRos(allRos);
        } catch (error) {
          setErrorMessage(response.data.msg);
        }
      }
    }

    function changeToMyTasks() {
      if (selectedFirstButton) {
        try {
          setSelectedFirstButton(false);
          setRos(myRos);
        } catch (error) {
          setErrorMessage(response.data.msg);
        }
      }
    }

    async function pesquisar() {
      try {
        const response = await api.get('/ro/search/' + input);
        setRos(response.data);
      } catch (response) {
        setErrorMessage(response.data.msg);
      }
    }

    function handlePress(_id:Ro): void {
      navigation.navigate('EditaRos' , {_id})

      // console.warn(_id)
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

      {usuario && usuario.perfil === 'admin' && 
        <View style={style.groupButtons}>

          <TouchableOpacity style={selectedFirstButton ? style.buttonSelected : style.button} onPress={changeToAll}>
            <Text style={style.textButton}>Todos registros</Text>
          </TouchableOpacity> 

          <TouchableOpacity style={!selectedFirstButton ? style.buttonSelected : style.button} onPress={changeToMyTasks}>
            <Text style={style.textButton}>Minhas Tasks</Text>
          </TouchableOpacity>

        </View>
      }

     {/* <TextInput style={style.busca}  
        placeholder='Buscar RO'  
        value={input} 
        onChangeText={(texto => setInput(texto))}>
      </TextInput>
      <Icon name='search' size={21} style={style.searchIcon}/>
      <View style={style.bar}/>  */}

    <View style={style.squareContainer}>
    <View style={usuario.perfil == 'cliente' ? {height: 520} : {height: 460}}>

      {errorMessage && <Text style={{color: 'red', textAlign: 'center'}}>{errorMessage}</Text>}
      <ScrollView nestedScrollEnabled={true}> 
      {
        ros && !loading ? ros.map(ro => (
        <View key={ro._id} style={style.square}>
        <TouchableOpacity onPress={() => handlePress(ro._id) }>
            <View>
          <Text style={style.square}> <Text style={style.bold}>#{ro._id} </Text>
              {'\n'} <Text style={style.bold}>Título: </Text>{ro.tituloOcorrencia}
              {'\n'} <Text style={style.bold}>Status: </Text>{ro.suporte ? ro.suporte.fase : "Pendente"}
              
              {!selectedFirstButton ? (
                <>{'\n'} <Text style={style.bold}>Atribuído para: </Text> {ro.responsavel ? ro.responsavel.nome : "A definir"}</>

              ) : (
                <>{'\n'} <Text style={style.bold}>Categoria: </Text>{ro.suporte ? ro.suporte.fase : "A definir"}</>
              )}
          </Text>
          </View>
          </TouchableOpacity>
          </View>
        )) 
      :
      <View style={{ height:40 }}>
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
    flexDirection: 'column',
    alignItems:'center',
    // backgroundColor:"red",
    justifyContent:'center',
    borderRadius:20,
    maxHeight:500,
    // backgroundColor: 'red',
    padding:5,
    marginTop:"10%",
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
    justifyContent: 'space-evenly',
    margin:'auto',
    // height:"300%",
    alignItems: 'center',
    flexDirection: 'column',
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



