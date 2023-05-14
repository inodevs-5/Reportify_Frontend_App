import React, { useState } from 'react';
import {StyleSheet, View, Text, TextInput,TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import { propsStack } from '../../Routes/Stack/Models';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';


export const EmailRedefinicao = ({ route }) =>{
  const navigation = useNavigation<propsStack>();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const [email, setEmail] = useState('');

  const enviarEmail = async() => {
    setLoading(true);
      try {
        const response = await api.post('/usuario/emailRedefinicao', { email });

        Alert.alert(response.data.msg);
        navigation.navigate('Login');
      } catch (response) {
        setErrorMessage(response.data.msg);
      }
    setLoading(false);
  };

  return (

    <View style={style.container}>

        <Text style={style.title}>Redefinição de Senha</Text>
        <Text style={style.text}>Preencha seu e-mail para enviar um link de redefinição de senha.</Text>
        {errorMessage && <Text style={style.error}>{errorMessage}</Text>}

        <View style={style.campos}>
          <Text style={style.paragraph}>
            Email*
          </Text>
          <TextInput style={style.input} value={email} onChangeText={e => setEmail(e)} />
        </View>

        <View>
          {!loading ? (
            <TouchableOpacity style={style.button} onPress={enviarEmail}>
              <Text style={style.redefinir}>Enviar Email</Text>
            </TouchableOpacity>
          ) : (
            <View style={{justifyContent: 'center', marginTop: 15}}>
              <ActivityIndicator size="large" color="#666"/>
            </View>
          )}
        </View>

      {/* Fim da parte de rolagem */}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    width:160,
    borderRadius:300,
    height: 40,
    backgroundColor: '#72A2FA',
    marginTop:10,
    marginBottom:10,
  },
  redefinir:{   //texto do botão para redefinir senha
    textAlign:'center',
    paddingTop:10,
    color:'white',
  },
  campos:{
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '3%',
  },
  paragraph: {
    margin: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 5,
    fontSize:15,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  contentContainer: {  //Faz parte do estilo da scrollview
    justifyContent: 'center',
    paddingBottom: 30,
  },
  title:{ //titulos das divisões dos campos
    fontSize: 24,
    marginTop: 30,
    marginBottom: 20,
    textAlign: 'center',
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
    paddingBottom:3,
    width: 140,
    height:27,
    marginBottom: 3,
    borderRadius:300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  error: {
    margin: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 5,
    fontSize:15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ff0000',
  },
  text: {
    margin: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 5,
    fontSize:15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EmailRedefinicao;