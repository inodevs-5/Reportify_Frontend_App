import React, { useState, useEffect } from 'react';
import {StyleSheet, View,Text,TextInput,TouchableOpacity,Platform, Linking, ScrollView, Button, Alert, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { propsStack } from '../../Routes/Stack/Models';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import DocumentPicker from 'react-native-document-picker';
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';
import {Picker} from '@react-native-picker/picker';
import Menu from '../../components/menu';

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

    const [loading, setLoading] = useState(true);

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
      (async () => {
        try {
          const response = await api.get('/usuario');

          setUsuarios(response.data);
          setLoading(false);
        } catch (response) {
          console.log(response.data.msg);
        }
      })();
    }, []);

    const [selectedUser, setSelectedUser] = useState(usuario._id);
    
    const handleHardwareCheck = () => {
      setHardwareChecked(!hardwareChecked);
      setSoftwareChecked(false);
    };
  
    const handleSoftwareCheck = () => {
      setSoftwareChecked(!softwareChecked);
      setHardwareChecked(false);
    };
 //Abaixo para anexar aquivos
    const pickDocument = async () => {
      try {
        const result = await DocumentPicker.pick({
          allowMultiSelection: true,
          type: [DocumentPicker.types.allFiles],
        });
        setLogsAnexados(result)
        setFileName(result.name);
        console.log(
          result.uri,
          result.type, 
          result.name,
          result.size
        );
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          console.log("Cancelado!")
        } else {
          console.log(err);
        }
      }
    };
    
    async function cadastrarRO() {
      setLoading(true);
      try {
        const data = new FormData();

        data.append('contrato', contrato);
        data.append('fase', fase);
        data.append('orgao', orgao);
        data.append('idRelator', selectedUser);
        data.append('nomeRelator', relator);
        data.append('posGradRelator', posGradRelator);
        data.append('nomeResponsavel', responsavel);
        data.append('posGradResponsavel', posGradResponsavel);

        if (softwareChecked) {
          data.append('classDefeito', 'software');
          data.append('versaoBaseDados', versaoBaseDados);
          data.append('versaoSoftware', versaoSoftware);

          logsAnexados.forEach((l) => {
            data.append('anexo', l);
          });

        } else if (hardwareChecked) {
          data.append('classDefeito', 'hardware');
          data.append('equipamento', equipamento);
          data.append('equipPosicao', posicao);
          data.append('serialNumber', serialNumber);
          data.append('partNumber', partNumber);
        }

        if (descricao) {
          data.append('descricaoOcorrencia', descricao);
        }
        data.append('tituloOcorrencia', titulo);
        
        const response = await api.post('/ro', data, {headers: {'Content-Type': 'multipart/form-data'}});
      
        Alert.alert(response.data.msg)

        navigation.navigate('Home')
      } catch (response) {
        Alert.alert(response.data.msg);
      }
      setLoading(false);
    }

  return (

      //Abaixo o titulo do RO
    <View style={style.container}><Text style={style.title}></Text>
     {/* ScrollView = parte rolavel */}
    <ScrollView style={style.scrollView} contentContainerStyle={style.contentContainer}> 
      <Text style={style.title2}>Registro de Ocorrência</Text>
      {/*Cada view alinha um titulo de campo e um input*/}

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Contrato*
        </Text>
        <TextInput style={style.input} 
        placeholder='' onChangeText={texto => setContrato(texto)}
        ></TextInput>
      </View>

      {/* <View style={style.campos2}>
        <Text style={style.paragraph}>
          Fase*
        </Text>
        <TextInput style={style.input} 
        placeholder='' onChangeText={texto => setFase(texto)}
        ></TextInput>
      </View> */}

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Orgão*
        </Text>
        <TextInput style={style.input} 
        placeholder='' onChangeText={texto => setOrgao(texto)}
        ></TextInput>
      </View>

      { usuario && usuario.perfil === "admin" && 
      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Relator*
        </Text>
        {!loading ?
          <Picker
          selectedValue={selectedUser}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedUser(itemValue)
            setRelator(usuarios[itemIndex-1].nome)}
          }
          style={{ width: '82%', marginVertical:10}}
        >
          {usuarios && usuarios.map((relator) => (
            <Picker.Item style={style.input} label={relator.nome} value={relator._id} key={relator._id} />
          ))}
        </Picker>:
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color="#666"/>
            </View>
        }

      </View>
      }

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          POS./GRAD*
        </Text>
        <TextInput style={style.input} 
        placeholder='' onChangeText={texto => setPosGradRelator(texto)}
        ></TextInput>
      </View>

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Responsável/Surpevisor do centro*
        </Text>
      </View>
      <View style={style.campos3}>
        <TextInput style={style.input2} 
        placeholder='' onChangeText={texto => setResponsavel(texto)}
        ></TextInput>
      </View>
      
      <View style={style.campos2}>
        <Text style={style.paragraph}>
          POS./GRAD*
        </Text>
        <TextInput style={style.input} 
        placeholder='' onChangeText={texto => setPosGradResponsavel(texto)}
        ></TextInput>
      </View>

      <Text style={style.title2}>Classificação em Campo</Text>

      {/* "titulo" da checkbox */}
      <Text style={style.paragraph}>
          Defeito*
      </Text>

      {/* Inicio da checkbox */}
      <View style={style.check}>
        <View style={{ flexDirection: 'row' }}>
          <CheckBox
            value={hardwareChecked}
            onValueChange={handleHardwareCheck}
          />
          <Text style={style.paragraph}>Hardware</Text>
        </View>

        {hardwareChecked && (
          <View style={style.check}>
           <View style={style.campos2}>
              <Text style={style.paragraph}>Equipamento*</Text>
              <TextInput
                style={style.input2}
                value={equipamento}
                onChangeText={setEquipamento}
              />
            </View>

            <View style={style.campos2}>
              <Text style={style.paragraph}>Posição*</Text>
              <TextInput
                style={style.input2}
                value={posicao}
                onChangeText={setPosicao}
              />
            </View>
            
            <View style={style.campos2}>
              <Text style={style.paragraph}>Part Number*</Text>
              <TextInput
                style={style.input2}
                value={partNumber}
                onChangeText={setPartNumber}
              />
            </View>


            <View style={style.campos2}>
              <Text style={style.paragraph}>Serial Number*</Text>
              <TextInput
                style={style.input2}
                value={serialNumber}
                onChangeText={setSerialNumber}
              />
            </View>
          </View>
        )}

        {/* Segunda opção da checkbox*/}

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <CheckBox
            value={softwareChecked}
            onValueChange={handleSoftwareCheck}
          />
          <Text style={style.paragraph}>Software</Text>
        </View>

        {softwareChecked && (
          <View style={style.check}>


              <Text style={style.paragraph}>Versão da base de dados*</Text>
              <View style={style.checkalinhar}>
              <TextInput
                style={style.input2}
                value={versaoBaseDados}
                onChangeText={setVersaoBaseDados}
              />
            </View>
            
           
              <Text style={style.paragraph}>Versão do software*</Text>
              <View style={style.checkalinhar}>
                <TextInput
                  style={style.input2}
                  value={versaoSoftware}
                  onChangeText={setVersaoSoftware}
                />
              </View>

              <View style={style.campos2}>
                <Text style={style.paragraph}>Logs Anexos</Text>
                
                
                  <TouchableOpacity style={style.button2} onPress={pickDocument}>
                    <Text style={style.text}>Selecionar</Text>
                  </TouchableOpacity>
                  
                    <Text style={style.fileName}>
                      {
                        logsAnexados && softwareChecked && logsAnexados.map(l => (
                          <Text key={l.uri}>
                              {l.name}  {'\n'}
                          </Text>
                        ))
                      }
                    </Text>
                  
          
              </View>
           
        </View>
      )}
      </View>
      
      {/* acima o fim da checkbox */}

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Titulo*
        </Text>
        <TextInput style={style.input} 
        placeholder=''onChangeText={texto => setTitulo(texto)}
        ></TextInput>
      </View>

      <View style={style.campos}>
        <Text style={style.paragraph}>
          Descrição
        </Text>
      </View>

      <View style={style.campos4}>
        <TextInput style={style.input3} 
        
        multiline={true}
        onChangeText={(descricao) => setDescricao(descricao)}
        placeholder=''
        ></TextInput>
      </View>
      <View style={style.botaoalinha}>

      {!loading ? (
          <TouchableOpacity style={style.button}
            onPress={cadastrarRO}>
            <Text style={style.cadastra}>Criar RO</Text>
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
        <View style={{position:'absolute',  bottom: 0, marginLeft: -150}}>
          <Menu/>
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
    
    width:160,
    borderRadius:300,
    height: 40,
    backgroundColor: '#72A2FA',
    marginTop:10,
    marginBottom:10
    
  },

  cadastra:{   //texto do botão de criar RO
    textAlign:'center',
   paddingTop:8,
   color:'white'
  },

  check:{
    backgroundColor:'E9EFF7',
    
    
  },
  checkalinhar:{
    marginBottom: 5,
   
   
    alignItems: 'center',
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

  campos4:{//estilo do alinhamento do input caixa de texto
    
    alignItems: 'center',
   
  },

 
  paragraph: {
    margin: 10,
    fontSize:15,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  scrollView: {
    // height: '-10%',
    width: '90%',
    marginTop:'1%',
    alignSelf: 'center',
    padding:10,
    backgroundColor: '#C3C9D0',
    borderRadius: 9,
  },
  contentContainer: {  //Faz parte do estilo da scrollview
    justifyContent: 'center',
    backgroundColor: '#C3C9D0',
    paddingBottom: 80,
   
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
 
  // abaixo o input da area de texto descrição
  input3: { 
     flex: 1,
    
    backgroundColor: '#ffff',
   
     width:'96%',
     height:170,
    
     borderRadius:30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
   
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlignVertical: 'top', // Define a posição do texto como início da caixa
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
    marginBottom:10,
   },
});


export default CadastroRO;