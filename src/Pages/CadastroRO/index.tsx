import React, { useState } from 'react';
import {StyleSheet, View,Text,TextInput,TouchableOpacity,Platform, Linking, ScrollView, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { propsStack } from '../../Routes/Stack/Models';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';

export const CadastroRO = () =>{
  const navigation = useNavigation<propsStack>()
  const [input, setInput] = useState('');

  
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
  

  
  

  
  return (
  
   
      //Abaixo o titulo do RO
    <><Text style={style.title}>RO#004</Text>
     {/* ScrollView = parte rolavel */}
    <ScrollView style={style.scrollView} contentContainerStyle={style.contentContainer}> 
      <Text style={style.title2}>Registro de Ocorrência</Text>

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
        placeholder='...'
        ></TextInput>
      </View>

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Orgão*
        </Text>
        <TextInput style={style.input} 
        placeholder='Orgão'
        ></TextInput>
      </View>

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Relator:
        </Text>
        <TextInput style={style.input} 
        placeholder='Joel Costa'
        ></TextInput>
      </View>

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          POS./GRAD:
        </Text>
        <TextInput style={style.input} 
        placeholder='...'
        ></TextInput>
      </View>

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Surpevisor/{'\n'}Responsável{'\n'}do centro:
        </Text>
        <TextInput style={style.input} 
        placeholder='Jonas SILVA'
        ></TextInput>
      </View>
      
      <View style={style.campos2}>
        <Text style={style.paragraph}>
          POS./GRAD:
        </Text>
        <TextInput style={style.input} 
        placeholder='...'
        ></TextInput>
      </View>

      <Text style={style.title2}>Classificação em Campo</Text>

      
      
      {/* Inicio da checkbox */}
      <View style={{ padding: 20 }}>
      <View style={{ flexDirection: 'row' }}>
        <CheckBox
          value={hardwareChecked}
          onValueChange={handleHardwareCheck}
        />
        <Text style={{ marginHorizontal: 10 }}>Hardware</Text>
      </View>

      {hardwareChecked && (
        <View>
          <Text style={{ marginTop: 10 }}>Equipamento:</Text>
          <TextInput
            style={{ borderWidth: 1, padding: 5 }}
            value={equipamento}
            onChangeText={setEquipamento}
          />

          <Text style={{ marginTop: 10 }}>Posição:</Text>
          <TextInput
            style={{ borderWidth: 1, padding: 5 }}
            value={posicao}
            onChangeText={setPosicao}
          />

          <Text style={{ marginTop: 10 }}>Part Number:</Text>
          <TextInput
            style={{ borderWidth: 1, padding: 5 }}
            value={partNumber}
            onChangeText={setPartNumber}
          />

          <Text style={{ marginTop: 10 }}>Serial Number:</Text>
          <TextInput
            style={{ borderWidth: 1, padding: 5 }}
            value={serialNumber}
            onChangeText={setSerialNumber}
          />
        </View>
      )}

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <CheckBox
          value={softwareChecked}
          onValueChange={handleSoftwareCheck}
        />
        <Text style={{ marginHorizontal: 10 }}>Software</Text>
      </View>

      {softwareChecked && (
        <View>
          <Text style={{ marginTop: 10 }}>Versão da base de dados:</Text>
          <TextInput
            style={{ borderWidth: 1, padding: 5 }}
            value={versaoBaseDados}
            onChangeText={setVersaoBaseDados}
          />

          <Text style={{ marginTop: 10 }}>Versão do software:</Text>
          <TextInput
            style={{ borderWidth: 1, padding: 5 }}
            value={versaoSoftware}
            onChangeText={setVersaoSoftware}
          />

          <Text style={{ marginTop: 10 }}>Logs anexados ao R.O:</Text>
          <TextInput
            style={{ borderWidth: 1, padding: 5 }}
            value={logsAnexados}
            onChangeText={setLogsAnexados}
          />
        </View>
      )}
    </View>
      
      

      

      

      

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Nome do{'\n'}Colaborador IACIT:
        </Text>
        <TextInput style={style.input} 
        placeholder='Ana Santos'
        ></TextInput>
      </View>

      

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Nº da Ocorrencia
        </Text>
        <TextInput style={style.input} 
        placeholder='90309585'
        ></TextInput>
      </View>

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Defeito Select:
        </Text>
        <TextInput style={style.input} 
        placeholder='90309585'
        ></TextInput>
      </View>
      
      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Versão Base de Dados:
        </Text>
        <TextInput style={style.input} 
        placeholder='90309585'
        ></TextInput>
      </View>
      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Versão do software:
        </Text>
        <TextInput style={style.input} 
        placeholder='90309585'
        ></TextInput>
      </View>
      <View style={style.campos2}>
        <Text style={style.paragraph}>
           Logs Anexados ao R.O
        </Text>
        <TextInput style={style.input} 
        placeholder='90309585'
        ></TextInput>
      </View>

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Equipamento:
        </Text>
        <TextInput style={style.input} 
        placeholder='90309585'
        ></TextInput>
      </View>

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Posição:
        </Text>
        <TextInput style={style.input} 
        placeholder='90309585'
        ></TextInput>
      </View>

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Part Number:
        </Text>
        <TextInput style={style.input} 
        placeholder='90309585'
        ></TextInput>
      </View>

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Serial Number
        </Text>
        <TextInput style={style.input} 
        placeholder='90309585'
        ></TextInput>
      </View>

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Titulo da Ocorrência
        </Text>
        <TextInput style={style.input} 
        placeholder='90309585'
        ></TextInput>
      </View>

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Descrição da Ocorrência
        </Text>
        <TextInput style={style.input} 
        placeholder='90309585'
        ></TextInput>
      </View>

      <View style={style.campos2}>
        <Text style={style.paragraph}>
          Procedimentos Adotados{'\n'} Pelos Tecnicos Para Resolução{'\n'} da Ocorrência
        </Text>
        <TextInput style={style.input} 
        placeholder='90309585'
        ></TextInput>
      </View>


      
      
      
      
      
      
      
      
    </ScrollView>

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

  viewcheck:{
    
  },
  data:{
   
    
    width: '64.5%',
    backgroundColor:'white',
    
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
  campos3:{
    //flexDirection: 'row',
    alignItems: 'center',
    marginRight: '5%',
    
  },
  viewinput:{
    marginTop:'-9%',
    alignItems: 'center',
    marginRight: '5%',
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
  contentContainer: {
    justifyContent: 'center',
    
    backgroundColor: '#C3C9D0',
    paddingBottom: 30,
   
  },

  
  title:{
    fontSize: 30,
    marginTop: 30,
    marginRight: 115,
    textAlign: 'left',
    marginLeft:16,
    color: 'black',
    fontWeight: 'bold',
  },

  title2:{
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
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
    paddingLeft: 90,
    color: 'white',
  },

  div: {
    
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

  

  

  
 
  


 
  
});


export default CadastroRO;