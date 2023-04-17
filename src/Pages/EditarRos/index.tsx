import React, { useState, useEffect, useRef } from 'react';
import {StyleSheet, View,Text, ScrollView, Platform, TouchableOpacity, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {SelectList} from 'react-native-dropdown-select-list'
import Icon from 'react-native-vector-icons/Ionicons'
import { propsStack } from '../../Routes/Stack/Models';
import { useNavigation } from '@react-navigation/native';
import { getRo } from '../../hooks/Ro';
import { Ro } from '../../types/Types';
import Menu from '../../components/menu';




const EditaRos = ({route}) => {
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [option , setOption] = useState("")
  // const [selectedLanguage, setSelectedLanguage] = useState();
    // const [ro, setRo] = useState<Ro>();
    const [loading, setLoading] = useState(true);
    // const [selectedValue, setSelectedValue] = useState('');
    // const [selectedValue, setSelectedValue] = useState('')
    const numer = route.params.numroOcorrencia
    const [descricao, setDescricao] = useState('');
    const [status, seStatus] = useState()
    const [situacao, setSituacao] = useState()
    const [categoria, setCategoria] = useState()
    const [classificacao, setClassificacao] = useState()
    const [ro, setRo] = useState<Ro>();
     
    function Ro( numer: Ro) : void{
      
    
      useEffect(() => {
        async function fetchUser() {
          const response = await fetch(`ro/${numer}`);
          const data = await response.json();
          setRo(data);
        }
        fetchUser();
      }, [numer]);
    
      if (!ro) {
        return <div>Carregando...</div>;
      }
    }

  return (
    // <ScrollView contentContainerStyle={style.contentContainer}>
    
    <View style={style.container}>
      <View style={style.conteudo}>
      <View style={style.container_edi}>
        <ScrollView style={style.scroll}>
        {/* <View style={style.container_ro}> */}
        <View style={style.container_ro} >
          <View style={style.container_r}>
          <Text style={style.text1}>RO#</Text>
          <Text style={style.text1}>{numer}</Text>
          </View>
        </View>
        {/* </View> */}
        <View style={style.campos}>
          <Text style={style.text}>Titulo : </Text>
          <Text>{ro?.numroOcorrencia}</Text>
        </View>
        <View style={style.campos}>
          <Text style={style.text}>Fase :</Text>
          <Text>{numer.fase}</Text>
        </View>
        <View style={style.campos}>
          <Text style={style.text}>Orgão :</Text>
          <Text>{numer.Orgão}</Text>
        </View>
        <View style={style.campos}>
          <Text style={style.text}>Data e hora do Registro :</Text>
          <Text>{numer.data}</Text>
        </View>
        <View style={style.campos}>
          <Text style={style.text}>Relator :</Text>
          <Text>{numer.relator}</Text>
        </View>
        <View style={style.campos1}>
          <Text style={style.text}>Responsavel  / Supervisor do Centro:</Text>
          <Text>{numer.relator}</Text>
        </View>
        <View style={style.campos}>
          <Text style={style.text}>Pos./Grad :</Text>
          <Text>{numer.pos_grad}</Text>
        </View>
        <View style={style.campos}>
          <Text style={style.text}>Defeito :</Text>
          <Text>{numer.defeito}</Text>
        </View>
        <View style={style.campos}>
          <Text style={style.text}>Versão da Base de Dados</Text>
          <Text>{numer.base_dados}</Text>
        </View>
        <View style={style.campos}>
          <Text style={style.text}>Versão do Software</Text>
          <Text>{numer.software}</Text>
        </View>
        <View style={style.campos}>
          <Text style={style.text}>Logs Anexados:</Text>
          <Text>{numer.anexados}</Text>
        </View>
        <View style={style.campos1}>
          <Text style={style.text}>Descrição :</Text>
          <View style={style.campos4}>
        <TextInput style={style.input3} 
        value={numer.descricao}
        editable={false}
        multiline={true}
        // onChangeText={(descricao) => setDescricao(descricao)}
        placeholder=''
        ></TextInput>
      </View>
        </View>
        
        {/* parte da edição */}
        <View style={style.barra}></View>
        <View style={style.campos3}>
          <Text style={style.text} >Atualizar Ro</Text>
        <View style={style.campos
        }>
          <TouchableOpacity >
        <Icon name='pencil' size={25} style={style.icon}
          onPress={() => 
            console.warn("Editar")
            }/>
        </TouchableOpacity>
          <TouchableOpacity >
        <Icon name='trash' size={25} style={style.icon}
          onPress={() => 
            console.warn("apagou")
            }/>
        </TouchableOpacity>
        </View>
          </View>
        <View>
          <Text style={style.text}>Situação:</Text>
          <View>
          <Picker
            style={style.picker}
            selectedValue={situacao}
            onValueChange={(itemValue, itemIndex) =>
            setSituacao(itemValue)
          }>
            <Picker.Item label="Aguardando Validação" value="aguardando_validacao" />
            <Picker.Item label="Em Processo" value="em_processo" />
            <Picker.Item label="Validado" value="validado" />
          </Picker>
          </View>
        </View>
        {/* <View style={style.campos}> */}
          <Text style={style.text}>Categoria:</Text>
          <View>
          <Picker
            style={style.picker}
            selectedValue={categoria}
            onValueChange={(itemValue, itemIndex) =>
            setCategoria(itemValue)
          }>
            <Picker.Item label="Normal" value="normal" />
            <Picker.Item label="Alta" value="alta" />
          </Picker>
          </View>
          <Text style={style.text}>Classificação</Text>
          <View>
          <Picker
          style={style.picker}
            selectedValue={classificacao}
            onValueChange={(itemValue, itemIndex) =>
            setClassificacao(itemValue)
          }>
            <Picker.Item label="Investigação" value="investicacao" />
            <Picker.Item label="Hardware" value="hardware" />
          </Picker>
          {/* </View> */}
        </View>
        {/* <View style={style.campos}> */}
          <Text style={style.text}>Responsável</Text>
          <TextInput style={style.input}></TextInput>
        {/* </View> */}
        <View style={style.campos1}>
           <Text style={style.text}>Justificativa de Reclassificação / Ações Tomadas</Text>
           <View style={style.campos4}>
        <TextInput style={style.input3} 
        
        multiline={true}
        onChangeText={(descricao) => setDescricao(descricao)}
        placeholder=''
        ></TextInput>
      </View>
        </View>
       <View style={style.barra}></View>
        <Text style={style.text}>Validação e Fechamento do Ro</Text>
        <View>
          <Picker
          style={style.picker}
            selectedValue={status}
            onValueChange={(itemValue, itemIndex) =>
            seStatus(itemValue)
          }>
            <Picker.Item label="Encerrar RO" value="encerrado" />
            <Picker.Item label="Em processo" value="em_processo" />
            <Picker.Item label="Em Analise" value="analise" />
          </Picker>
          {/* </View> */}
        </View>
        </ScrollView>
      </View>
        <View style={{position:'absolute',  bottom: 0,}}>
        <Menu/>
      </View>
      </View>
    </View> 
    
  );
};


const style = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column',
    ...Platform.select({
      ios: { fontFamily: 'Arial', }, 
      android: { fontFamily: 'Roboto' }}), 
    // padding:10
  },
  conteudo:{
    // flex:1,
    // backgroundColor:'yellow',
    alignItems:'center',
    width:'98%',
    height:"98%",
    justifyContent:'space-between',
    
  },

  container_edi:{
    display:'flex',
    backgroundColor: '#c3c9d0',
    flexDirection:'column',
    height: '87%',
    width: '90%',
    // marginTop:'3%',
    marginBottom:'27%',
    borderRadius: 13,
  },
  campos:{
    flexDirection:'row',
    paddingVertical:9.5,

  },
  campos1:{
    flexDirection:'column',
    paddingVertical:3,

  },
  barra:{
    backgroundColor:'black',
    width:'99%',
    height:2,
    alignItems: 'center',
  },

  ro:{
    fontSize:25,
    fontWeight:"700",
    color: 'black',
    textAlign:"center"
  },

  container_desc:{
    display: 'flex',
    width:'99%',
    // margin:'auto',
    alignItems:'center',
    flexDirection: 'column',
    
  },
  icon:{
    color:'#000000'
  },
  container_ro:{
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
    width:"99%"
  },
  container_r:{
    // alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
    width:"99%"
  },
  text:{
    color:"black",
    fontWeight:"700",
    ...Platform.select({
      ios: { fontFamily: 'Arial', }, 
      android: { fontFamily: 'Roboto' }}), 
    fontSize:17

  },
  text1:{
    color:"black",
    fontWeight:"700",
    ...Platform.select({
      ios: { fontFamily: 'Arial', }, 
      android: { fontFamily: 'Roboto' }}), 
    fontSize:25

  },
  scroll: { 
    marginLeft: 10,
    paddingRight: 10,
    // backgroundColor:'#ff0000'

  },
  input: {
    backgroundColor:"#ffffffc5",
    // borderRadius:10,
    height:50
  },
  campos4:{//estilo do alinhamento do input caixa de texto
    
    alignItems: 'center',
   
  },
  input3: { 
    flex: 1,
   marginVertical:9,
   backgroundColor: '#ffff',
  
    width:'96%',
    minHeight:100,
   
    borderRadius:20,
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

  descricao:{
    width:'100%',
    // display: 'flex',
    // margin:'auto',
    minHeight:100,
    backgroundColor:'#f9f9fbc2',
    alignItems:'flex-start'
  },
  campos3:{
    flexDirection:'row',
    paddingVertical:9.5,
    alignItems:'center',
    justifyContent:'space-between'
  },
  picker:{
    backgroundColor:"#ffffffc5",
    marginVertical:9
  },
  

})


export default EditaRos;