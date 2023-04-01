import React, { useState } from 'react';
import {StyleSheet, View,Text,TextInput,TouchableOpacity,Platform, Linking, ScrollView, Button} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { propsStack } from '../../Routes/Stack/Models';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import DocumentPicker from 'react-native-document-picker';

export const CadastroRO = () =>{
  const navigation = useNavigation<propsStack>();
  const [input, setInput] = useState('');
  const [text, setText] = useState('');// area de texto
  const [fileName, setFileName] = useState('');//da parte de anexar arquivos

  //abaixo itens da checkbox
    const [hardwareChecked, setHardwareChecked] = useState(false);
    const [softwareChecked, setSoftwareChecked] = useState(false);
    const [equipamento, setEquipamento] = useState('');
    const [posicao, setPosicao] = useState('');
    const [partNumber, setPartNumber] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [versaoBaseDados, setVersaoBaseDados] = useState('');
    const [versaoSoftware, setVersaoSoftware] = useState('');
    const [logsAnexados, setLogsAnexados] = useState('');
  
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
          type: [DocumentPicker.types.allFiles],
        });
        setFileName(result.name);
        console.log(
          result.uri,
          result.type, 
          result.name,
          result.size
        );
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker
        } else {
          console.log(err);
        }
      }
    };
    
  

  
  

  
  return (
  
   
      //Abaixo o titulo do RO
    <><Text style={style.title}></Text>

     {/* ScrollView = parte rolavel */}
    <ScrollView style={style.scrollView} contentContainerStyle={style.contentContainer}> 
      <Text style={style.title2}>Registro de Ocorrência</Text>
      {/*Cada view alinha um titulo de campo e um input*/}

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Contrato*
        </Text>
        <TextInput style={style.input} 
        placeholder=''
        ></TextInput>
      </View>

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Fase*
        </Text>
        <TextInput style={style.input} 
        placeholder=''
        ></TextInput>
      </View>

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Orgão*
        </Text>
        <TextInput style={style.input} 
        placeholder=''
        ></TextInput>
      </View>

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Relator*
        </Text>
        <TextInput style={style.input} 
        placeholder=''
        ></TextInput>
      </View>

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          POS./GRAD*
        </Text>
        <TextInput style={style.input} 
        placeholder=''
        ></TextInput>
      </View>

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Responsável/Surpevisor do centro*
        </Text>
      </View>
      <View style={style.campos3}>
        <TextInput style={style.input2} 
        placeholder=''
        ></TextInput>
      </View>
      
      <View style={style.campos2}>
        <Text style={style.paragraph}>
          POS./GRAD*
        </Text>
        <TextInput style={style.input} 
        placeholder=''
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
                  <Text style={style.fileName}>{fileName}</Text>
          
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
        placeholder=''
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
        onChangeText={(text) => setText(text)}
        value={text}
        placeholder=''
        ></TextInput>
      </View>

      <View style={style.botaoalinha}>
        <TouchableOpacity style={style.button}
          onPress={() => 
          navigation.navigate('')
          }>
          <Text style={style.cadastra}>Criar RO</Text>
        </TouchableOpacity>

      </View>
      
    </ScrollView>
    {/* Fim da parte de rolagem */}

    <View style={style.div}>

        <TouchableOpacity style={style.enterButton}>
          <Icon name='home' size={27} style={style.iconHome}
            onPress={() => navigation.navigate('Login')} />
        </TouchableOpacity>

        <TouchableOpacity style={style.enterButton}>
          <Icon name='notifications' size={27} style={style.iconNotif}
            onPress={() => navigation.navigate('Login')} />
        </TouchableOpacity>
    </View></>

    
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
    color: '#999',
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
    height: '20%',
    width: '90%',
    marginTop:'1%',
    marginBottom:'27%',
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
    paddingLeft: 90,
    color: 'white',
  },

  div: { //estilo e alinhamento dos botões e menu
    
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    height: 70,
    backgroundColor: '#2B3467',
    marginBottom: 10,
    marginLeft: '7.6%',
    marginTop: 675,
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

  

  

  
 
  


 
  
});


export default CadastroRO;