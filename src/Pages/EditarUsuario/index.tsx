import React, { useState, useEffect } from 'react';
import {StyleSheet, View,Text,TextInput,TouchableOpacity,Platform, Linking, ScrollView, Button, Alert, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { propsStack } from '../../Routes/Stack/Models';
import { useNavigation } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';


interface Perfil {
  label: string;
  value: string;
}

interface Empresa {
  label: string;
  value: string;
}

export const EditarUsuario = ({route}) =>{
  const navigation = useNavigation<propsStack>();
  const [loading, setLoading] = useState(false);// do botão de enviar

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [perfil, setPerfil] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [contato_empresa, setContato] = useState('');
  // const [senha, setSenha] = useState('');
  const id = route.params.id
  const perfis: Perfil[] = [
    { label: 'Administrador', value: 'administrador' },
    { label: 'Suporte', value: 'suporte' },
    { label: 'Ciente', value: 'cliente' },
  
  ];
  const [selectedEmpresa, getSelectedEmpresa] = useState('empresa1');

    // inicio back
    async function editarUser() {
      console.log(contato_empresa)
      setLoading(true);
      try {
        
        const response = await api.put('/usuario/'+id , {nome, email, perfil, empresa, contato_empresa })
        Alert.alert(response.data.msg);
        navigation.navigate('Home')
      } catch (response) {
        Alert.alert(response.data.msg);
      }
      setLoading(false);
    }


    useEffect(() => {
      (async () => {
        try {
          const response = await api.get('/usuario/'+id);
  
          
          setNome(response.data.nome);
          setEmail(response.data.email);
          setPerfil(response.data.perfil);
          setEmpresa(response.data.empresa);
          setContato(response.data.contato_empresa);
          // setSenha(response.data.senha);
          setLoading(false)
        } catch (response) {
          setErrorMessage(response.data.msg);
        }
      })();
    }, []);


  return (

    <View style={style.container}><Text style={style.title}>Editar Usuário</Text>
     {/* ScrollView = parte rolavel */}
    <ScrollView style={style.scrollView}> 
      
      {/*Cada view alinha um titulo de campo e um input*/}

      <View style={style.campos2}>
        <Text  style={style.paragraph}>
          Nome*
        </Text>
        <TextInput value={nome} style={style.input} 
        placeholder='' onChangeText={texto => setNome(texto)}
        ></TextInput>
      </View>

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Email*
        </Text>
        <TextInput value={email} style={style.input} 
        placeholder='' onChangeText={texto => setEmail(texto)}
        ></TextInput>
      </View>

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Perfil*
        </Text>
        <TextInput value={perfil} style={style.input} 
        placeholder='' onChangeText={texto => setPerfil(texto)}
        ></TextInput>
      </View>

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Empresa*
        </Text>
        <TextInput value={empresa} style={style.input} 
        placeholder='' onChangeText={texto => setEmpresa(texto)}
        ></TextInput>
      </View>

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Contato da Empresa*
        </Text>
      </View>
      <View style={style.campos3}>
        <TextInput value={contato_empresa} style={style.input2} 
        placeholder='' onChangeText={texto => setContato(texto)}
        ></TextInput>
      </View>

      {/* <View style={style.campos2}>
        <Text style={style.paragraph}>
          Senha*
        </Text>
        <TextInput value={senha} style={style.input} 
        placeholder='' onChangeText={texto => setSenha(texto)}
        ></TextInput>
      </View> */}
      
      <View style={style.botaoalinha}>
        {!loading ? (
            <TouchableOpacity style={style.button}
              onPress={editarUser}>
              <Text style={style.cadastra} >Editar</Text>
            </TouchableOpacity>
        ) : (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#666"/>
          </View>
        )}

      </View>
    </ScrollView>
    {/* Fim da parte de rolagem */}

    <View >
      <View style={style.menu}>
        <TouchableOpacity style={style.enterButton}>
        <Icon name='home' size={27} style={style.iconHome}
          onPress={() => 
            navigation.navigate('Home')
            }/>
        </TouchableOpacity>
   
        <TouchableOpacity style={style.enterButton}>
        <Icon name='notifications' size={27} style={style.iconNotif}
          onPress={() => 
            navigation.navigate('Home')
            }/>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
  },
  
  botaoalinha:{
    marginLeft:'27%',
  },

  button:{
    width: 160,
    borderRadius: 300,
    height: 40,
    backgroundColor: '#72A2FA',
    marginTop: '10%',
    marginBottom: 10
  },

  cadastra:{   //texto do botão de enviar
    textAlign:'center',
    paddingTop:8,
    color:'white'
  },

  campos:{
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '30%',
  },

  campos2:{
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '3%',
    marginTop:'3%'
  },

  campos3:{ //estilo do alinhamento input de responsável/supervisor
    alignItems: 'center',
    marginRight: '3%',
    marginBottom:8,
  },
  
  paragraph: {
    margin: 10,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
  },

  scrollView: {
    height: '20%',
    width: '90%',
    marginTop: '10%',
    marginBottom: '15%',
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#C3C9D0',
    borderRadius: 9,
  },

  title:{ //titulos das divisões dos campos
    fontSize: 24,
    marginTop: 10,
    color: 'black',
    fontWeight: 'bold',
  },

  enterButton:{
    color: 'white',
    fontSize: 20,
  },

  iconNotif:{
    paddingLeft: 70,
    color: 'white',
  },
  
  iconHome: {
    // paddingLeft: 90,
    color: 'white',
  },

  div: { //estilo e alinhamento dos botões e menu
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 'auto',
    width: 300,
    height: 70,
    backgroundColor: '#2B3467',
    marginBottom: 10,
    top: 575,
    borderRadius: 35,
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
    paddingBottom:3,
    width:140,
    height:27,
    marginBottom: 3,
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

  input2: {
    padding: 5,
    flex: 1,
    alignItems:'center',
    flexDirection:'row',
    backgroundColor: '#ffff',
    justifyContent:'space-between',
    margin:'auto',
    color: 'black',
    paddingLeft:6,
    paddingBottom:3,
    width:'97%',
    height:27,
    marginBottom: 3,
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
 
  menu:{
    display:'flex',
    justifyContent:'space-around',
    backgroundColor: '#2B3467',
    alignItems: 'center',
    flexDirection: 'row',
    width:300,
    height:60,
    borderRadius:20,
    marginBottom:'5%',
  },
});


export default EditarUsuario;