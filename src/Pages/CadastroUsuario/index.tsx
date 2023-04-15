import React, { useState } from 'react';
import {StyleSheet, View,Text,TextInput,TouchableOpacity,Platform, Linking, ScrollView, Button, Alert, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { propsStack } from '../../Routes/Stack/Models';
import { useNavigation } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';
import {Picker} from '@react-native-picker/picker';
interface Perfil {
  label: string;
  value: string;
}

interface Empresa {
  label: string;
  value: string;
}

export const CadastroUsuario = () =>{
  const navigation = useNavigation<propsStack>();

  const { usuario } = useAuth();

  const [text, setText] = useState('');
  
  const [loading, setLoading] = useState(false);// do botão de enviar

  const [selectedPerfil, setSelectedPerfil] = useState('administrador');
  const perfis: Perfil[] = [
    { label: 'Administrador', value: 'administrador' },
    { label: 'Suporte', value: 'suporte' },
    { label: 'Ciente', value: 'cliente' },
  
  ];

  const [selectedEmpresa, setSelectedEmpresa] = useState('empresa1');
  const empresas: Empresa[] = [
    { label: 'Empresa1', value: 'empresa1' },
    { label: 'Empresa2', value: 'empresa2' },
    { label: 'Empresa3', value: 'empresa3' },
  
  ];

   
    
    // inicio back
    async function cadastrarUser() {
      setLoading(true);
      try {
        const data = new FormData();

        data.append('nome', nome);
        data.append('email', email);
        data.append('perfil', perfil);
        data.append('empresa', empresa);
        data.append('senha', senha);
       

        
        
       

        navigation.navigate('Home')
      } catch (response) {
        Alert.alert(response.data.msg);
      }
      setLoading(false);
    }

  return (

    <View style={style.container}><Text style={style.title2}>Cadastrar Novo Usuário</Text>
     {/* ScrollView = parte rolavel */}
    <ScrollView style={style.scrollView} contentContainerStyle={style.contentContainer}> 
      
      {/*Cada view alinha um titulo de campo e um input*/}

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Nome*
        </Text>
        <TextInput style={style.input} 
        placeholder='' onChangeText={texto => setNome(texto)}
        ></TextInput>
      </View>

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Email*
        </Text>
        <TextInput style={style.input} 
        placeholder='' onChangeText={texto => setEmail(texto)}
        ></TextInput>
      </View>

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Perfil*
        </Text>
        
        <Picker
        selectedValue={selectedPerfil}
        onValueChange={(itemValue) => setSelectedPerfil(itemValue)}
        style={{ width: '70%', borderWidth: 1, borderColor: 'black', padding: 2 }}
      > 
        {perfis.map((perfil) => (
          <Picker.Item style={style.input} label={perfil.label} value={perfil.value} key={perfil.value} />
        ))}
      </Picker>
        
      </View>

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Empresa*
        </Text>
        <Picker
        selectedValue={selectedEmpresa}
        onValueChange={(itemValue) => setSelectedEmpresa(itemValue)}
        style={{ width: '70%', borderWidth: 1, borderColor: 'black', padding: 2 }}
      > 
        {empresas.map((empresa) => (
          <Picker.Item style={style.input} label={empresa.label} value={empresa.value} key={empresa.value} />
        ))}
      </Picker>
      </View>

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Senha*
        </Text>
        <TextInput style={style.input} 
        placeholder='' onChangeText={texto => setSenha(texto)}
        ></TextInput>
      </View>

      
        
      
      <View style={style.botaoalinha}>
        {!loading ? (
            <TouchableOpacity style={style.button}
              onPress={cadastrarUser}>
              <Text style={style.cadastra}>Enviar</Text>
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
  },
  
 
  botaoalinha:{

    marginLeft:'40%',
  },

  button:{
    
    width:160,
    borderRadius:300,
    height: 40,
    backgroundColor: '#72A2FA',
    marginTop:10,
    marginBottom:10
    
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
  
  paragraph: {
    margin: 10,
    fontSize:15,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  scrollView: {
    height: '20%',
    width: '90%',
    marginTop:'3%',
    marginBottom:'65%',
    alignSelf: 'center',
    padding:10,
    backgroundColor: '#C3C9D0',
    borderRadius: 9,
  },

  contentContainer: {  //Faz parte do estilo da scrollview
    justifyContent: 'center',
    
    backgroundColor: '#C3C9D0',
    paddingBottom: 30,
   
  },

  title2:{ //titulos das divisões dos campos
    fontSize: 24,
    marginTop: 0,
    
    textAlign: 'left',
    
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
    marginBottom:'20%',
   },
});


export default CadastroUsuario;