import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, TextInput,TouchableOpacity, ActivityIndicator, Alert, Linking} from 'react-native';
import { propsStack } from '../../Routes/Stack/Models';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../contexts/auth';


export const RedefinirSenha = ({ route }) =>{
  const { id, firstTime, token } = route.params;
  
  const { signOut } = useAuth()

  const navigation = useNavigation<propsStack>();

  const [loading, setLoading] = useState(false);
  const [hidePass,setHidePass] = useState(true);
  const [errorMessage, setErrorMessage] = useState('')
  const [errorTermoMessage, setErrorTermoMessage] = useState('');
  const [hidePassConfirm, setHidePassConfirm] = useState(true);

  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [termo, setTermo] = useState(false);
  const [termoInfo, setTermoInfo] = useState();

  const handleTermoCheck = () => {
    setTermo(!termo);
  };

  useEffect(() => {
    (async () => {
      try {
          const response = await api.get('/termo/');
          
          setTermoInfo(response.data)
      } catch (response) {
        Alert.alert(response.data.msg);
      }
    })();
  }, []);

  const salvarSenha = async() => {
    signOut()
    setErrorMessage('');
    setErrorTermoMessage('');
    setLoading(true);
      try {
        if (termo || firstTime === 'false') {
          if (firstTime === 'true') {
            await api.post('/termo/accept', {usuario: id, versaoTermo: termoInfo._id});
          }

          const response = await api.patch('/usuario/password/' + id, {senha, confirmarSenha, token});

          Alert.alert(response.data.msg);
          setSenha('')
          setConfirmarSenha('')
          navigation.navigate('Login');
        } else {
          setErrorTermoMessage('É necessário aceitar o termo.');
        }
      } catch (response) {
        setErrorMessage(response.data.msg);
      }
    setLoading(false);
  };

  async function voltar() {
    await signOut()
    navigation.navigate('Login')
  }

  return (

    <View style={style.container}>

        <TouchableOpacity style={style.buttonAdm}
          onPress={voltar}>
          <Text style={style.enterButton}>X</Text>
        </TouchableOpacity>

        <Text style={style.title}>Redefinição de Senha</Text>

        {errorMessage && <Text style={style.error}>{errorMessage}</Text>}

        <View style={style.campos}>
          <Text style={style.paragraph}>
            Nova Senha*
          </Text>
          <TextInput style={style.input} value={senha} onChangeText={e => setSenha(e)} secureTextEntry={hidePass}/>

          <TouchableOpacity name='eye'
            style={style.icon} 
            onPress={() => setHidePass(!hidePass) }>
            { hidePass ?
              <Icon name='eye' size={21} /> : <Icon name='eye-off' size={21} />
            }
          </TouchableOpacity>
        </View>

        <View style={style.campos}>
          <Text style={style.paragraph}>
            Confirmar Senha*
          </Text>
          <TextInput style={style.input} value={confirmarSenha} onChangeText={e => setConfirmarSenha(e)} secureTextEntry={hidePassConfirm}/>

          <TouchableOpacity name='eye'
            style={style.icon} 
            onPress={() => setHidePassConfirm(!hidePassConfirm) }>
            { hidePassConfirm ?
              <Icon name='eye' size={21} /> : <Icon name='eye-off' size={21} />
            }
          </TouchableOpacity>
        </View>

        {firstTime === 'true' && (
          <View style={style.check}>
            <View style={{ flexDirection: 'row' }}>
              <CheckBox
                style={style.checkbox}
                value={termo}
                onValueChange={handleTermoCheck}
              />
              {
                termoInfo && <>
                  <Text style={style.paragraph}>Estou ciente do&nbsp;
                    <Text
                      style={style.hyperlinkStyle}
                      onPress={() => {
                        Linking.openURL(termoInfo.url);
                    }}>
                      Termo de Compromisso do app
                    </Text>
                    {` (${termoInfo._id})`}
                </Text>
                </>
              }
            </View>
            {errorTermoMessage && <Text style={style.error}>{errorTermoMessage}</Text>}
          </View>
        )}
        {/* Inicio da checkbox */}

        <View>
          {!loading ? (
            <TouchableOpacity style={style.button} onPress={salvarSenha}>
              <Text style={style.redefinir}>Redefinir Senha</Text>
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

  check:{
    backgroundColor:'E9EFF7',
    marginTop: 10,
  },

  checkbox: {
    marginTop: 5,
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

  icon:{
    color:'black',
    position: 'absolute',
    right: 5,
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
  
  hyperlinkStyle: {
    color: '#72A2FA',
  },

  buttonAdm :{
    alignItems: 'center',
    width: 45,
    height: 45,
    padding: 10,
    backgroundColor: '#72A2FA',
    marginBottom: 0,
    marginLeft: 300,
    borderRadius: 40,
  },

  enterButton:{
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },

});

export default RedefinirSenha;