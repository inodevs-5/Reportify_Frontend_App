import React, { useState } from 'react';
import {StyleSheet, View,Text,TextInput,TouchableOpacity,Platform, Linking, ScrollView, Button, Alert, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { propsStack } from '../../Routes/Stack/Models';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import DocumentPicker from 'react-native-document-picker';
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';

export const CadastroRO = () =>{
  const navigation = useNavigation<propsStack>();

  const { usuario } = useAuth();

  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('');//da parte de anexar arquivos

  //abaixo itens da checkbox
    const [contrato, setContrato] = useState('');
    const [fase, setFase] = useState('');
    const [orgao, setOrgao] = useState('');
    const [relator, setRelator] = useState('');
    const [posGradRelator, setPosGradRelator] = useState('');
    const [responsavel, setResponsavel] = useState('');
    const [posGradResponsavel, setPosGradResponsavel] = useState('');
    const [hardwareChecked, setHardwareChecked] = useState(false);
    const [softwareChecked, setSoftwareChecked] = useState(false);
    const [equipamento, setEquipamento] = useState('');
    const [posicao, setPosicao] = useState('');
    const [partNumber, setPartNumber] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [versaoBaseDados, setVersaoBaseDados] = useState('');
    const [versaoSoftware, setVersaoSoftware] = useState('');
    const [descricao, setDescricao] = useState('');
    const [titulo, setTitulo] = useState('');
    const [logsAnexados, setLogsAnexados] = useState([]);

    const [loading, setLoading] = useState(false);

    const handleHardwareCheck = () => {
      setHardwareChecked(!hardwareChecked);
      setSoftwareChecked(false);
    };
  
    const handleSoftwareCheck = () => {
      setSoftwareChecked(!softwareChecked);
      setHardwareChecked(false);
    };
    
    async function cadastrarRO() {
      setLoading(true);
      try {
        const data = new FormData();

        data.append('contrato', contrato);
        data.append('fase', fase);
        data.append('orgao', orgao);
        data.append('nomeRelator', relator);
        data.append('posGradRelator', posGradRelator);
        data.append('nomeResponsavel', responsavel);
        data.append('posGradResponsavel', posGradResponsavel);

        if (softwareChecked) {
          data.append('class_defeito', 'software');
          data.append('versaoBaseDados', versaoBaseDados);
          data.append('versaoSoftware', versaoSoftware);

          logsAnexados.forEach((l) => {
            data.append('anexo', l);
          });

        } else if (hardwareChecked) {
          data.append('class_defeito', 'hardware');
          data.append('equipamento', equipamento);
          data.append('equipPosicao', posicao);
          data.append('serialNumber', serialNumber);
          data.append('partNumber', partNumber);
        }

        if (descricao) {
          data.append('descricaoOcorrencia', descricao);
        }
        data.append('tituloOcorrencia', titulo);
        data.append('colaboradorIACIT', usuario.nome);
        
        const response = await api.post('/ro', data, {headers: {'Content-Type': 'multipart/form-data'}});
      
        Alert.alert(response.data.msg)

        navigation.navigate('Home')
      } catch (response) {
        Alert.alert(response.data.msg);
      }
      setLoading(false);
    }

  return (

    //Redefinir 
    <View style={style.container}><Text style={style.title}></Text>
    <ScrollView contentContainerStyle={style.contentContainer}> 
      <Text style={style.title2}>Redefinição de Senha</Text>

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Email*
        </Text>
        <TextInput style={style.input} 
        ></TextInput>
      </View>

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Nova Senha*
        </Text>
        <TextInput style={style.input} 
        ></TextInput>
      </View>
      {/* Inicio da checkbox */}
      <View style={style.check}>
        <View style={{ flexDirection: 'row' }}>
          <CheckBox
            value={hardwareChecked}
            onValueChange={handleHardwareCheck}
          />
          <Text style={style.paragraph}>Estou ciente do Termo de Compromisso do app</Text>
        </View>
      </View>
      <View style={style.botaoalinha}>

      {!loading ? (
          <TouchableOpacity style={style.button}
            onPress={cadastrarRO}> 
            <Text style={style.redefinir}>Redefinir Senha</Text>
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
  
  button2: {  //estilo do botão selecionar anexo
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 300,
    marginTop:10,
    marginBottom: 10,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
  },
  fileName: {
    marginLeft: 5,
    fontSize: 16,
  },

  botaoalinha:{

    marginLeft:'40%',
  },

  button:{
    marginRight: 7,
    width:160,
    borderRadius:300,
    height: 40,
    backgroundColor: '#72A2FA',
    marginTop:10,
    marginLeft: -45,
    marginBottom:10
    
  },

  redefinir:{   //texto do botão para redefinir senha
   textAlign:'center',
   paddingTop:10,
   color:'white',
  },

  check:{
    backgroundColor:'E9EFF7',
    marginTop: 15,

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

  },
  campos3:{ //estilo do alinhamento input de responsável/supervisor
    
    alignItems: 'center',
    marginRight: '3%',
    marginBottom:8,
    
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

  
  title2:{ //titulos das divisões dos campos
    fontSize: 24,
    marginTop: 30,
    marginBottom: 20,
    textAlign: 'center',
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
 
});


export default CadastroRO;