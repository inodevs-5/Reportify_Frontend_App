import React, { useState } from 'react';
import {StyleSheet,KeyboardAvoidingView, View,Text,TextInput,TouchableOpacity,Platform, Linking, ScrollView, Button, Alert, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { propsStack } from '../../Routes/Stack/Models';
import { useNavigation } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';
import {Picker} from '@react-native-picker/picker';
import Menu from '../../components/menu';

interface Perfil { // para o picker (select)
  label: string;
  value: string;
}

export const CadastroUsuario = () =>{
  const navigation = useNavigation<propsStack>();

  const { usuario } = useAuth();

  const [text, setText] = useState('');

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [contato_empresa, setContatoEmpresa] = useState('');

  // const [senha, setSenha] = useState('');
  const [perfil, setPerfil] = useState('cliente');
  const [loading, setLoading] = useState(false);// do botão de enviar

   const [selectedPerfil, setSelectedPerfil] = useState('cliente');
   const perfis: Perfil[] = [
    { label: 'Administrador', value: 'admin' },
    { label: 'Cliente', value: 'cliente' },
   ];

    // inicio back
    async function cadastrarUser() {
      setLoading(true);
      try {
        
        const response = await api.post('/usuario', {nome, 
          email, perfil, empresa, contato_empresa })
        console.log(nome)

        Alert.alert(response.data.msg)

        navigation.navigate('Home')
      } catch (response) {
        Alert.alert(response.data.msg);
      }
      setLoading(false);
    }

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={-30}
  >
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
            Perfil*   {/*Nome do campo picker*/}
          </Text>
          {/*Abaixo o picker*/}
          <Picker 
          selectedValue={selectedPerfil}  
          onValueChange={(itemValue) => setSelectedPerfil(itemValue)}
          style={{ width: '90%', borderWidth: 1, borderColor: 'black', padding: 2, }}
        > 
        {/*itens do picker*/}
          {perfis.map((perfil) => (
            <Picker.Item style={style.input4} label={perfil.label} value={perfil.value} key={perfil.value} />
          ))}
        </Picker>           
        </View>

        {/* <View style={style.campos2}>
          <Text style={style.paragraph}>
            Empresa*
          </Text>
          <TextInput style={style.input} 
          placeholder='' onChangeText={texto => setEmpresa(texto)}
          ></TextInput>
        </View> */}

        <View style={style.campos2}>
            <Text style={style.paragraph}>
              Empresa*
            </Text>
            <TextInput style={style.input} 
            placeholder='' onChangeText={texto => setEmpresa(texto)}
            ></TextInput>
        </View>

        <View style={style.campos2}>
          <Text style={style.paragraph}>
            Contato da Empresa*
          </Text>
        </View>
        <View style={style.campos3}>
          <TextInput style={style.input2} 
          placeholder='' onChangeText={texto => setContatoEmpresa(texto)}
          ></TextInput>
        </View>

        {/* <View style={style.campos2}>
          <Text style={style.paragraph}>
            Senha*
          </Text>
          <TextInput style={style.input} 
          placeholder='' onChangeText={texto => setSenha(texto)} secureTextEntry={true}
          ></TextInput>
        </View> */}

        <View style={style.botaoalinha}>
          {!loading ? (
              <TouchableOpacity style={style.button}
                onPress={cadastrarUser}>
                <Text style={style.cadastra}>Cadastrar</Text>
              </TouchableOpacity>
          ) : (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color="#666"/>
            </View>
          )}

        </View>
      </ScrollView>
      {/* Fim da parte de rolagem */}
      </View>
        <View style={{position:'absolute',  bottom: 20, marginLeft: 45 }}>
          <Menu/>
        </View>
      

      </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
 
  botaoalinha:{
    justifyContent: 'center',
    alignItems: 'center'
  },

  button:{
    
    width:100,
    borderRadius:300,
    height: 40,
    backgroundColor: '#72A2FA',
    marginTop:15,
    marginBottom:15,
    
  },

  cadastra:{   //texto do botão de enviar
    textAlign:'center',
    paddingTop: 10,
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
    fontSize:15,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  scrollView: {
    height: '30%',
    width: '90%',
    marginTop:'3%',
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

  input4: {
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
});


export default CadastroUsuario;