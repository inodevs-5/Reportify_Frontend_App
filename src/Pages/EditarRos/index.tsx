import React, { useState, useEffect, useRef } from 'react';
import {StyleSheet, View,Text, ScrollView, Platform, TouchableOpacity, TextInput ,Modal, KeyboardAvoidingView, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {SelectList} from 'react-native-dropdown-select-list'
import Icon from 'react-native-vector-icons/Ionicons'
import { propsStack } from '../../Routes/Stack/Models';
import { useNavigation } from '@react-navigation/native';
import { getRo } from '../../hooks/Ro';
import { Modalize } from 'react-native-modalize';
import { Ro } from '../../types/Types';
import Menu from '../../components/menu';
import api from '../../services/api';


const EditaRos = ({route}) => {
  const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const numer = route.params._id
    const [descricao, setDescricao] = useState('');
    const [contrato, setContrato] = useState('');
    const [orgao, setOrgao] = useState('');
    const [dataRegistro, setDataRegistro] = useState('');
    const [classDefeito, setClassDefeito] = useState('');
    const [versaoBaseDados, setVersaoBaseDados] = useState('');
    const [versaoSoftware, setVersaoSoftware] = useState('');
    const [logsAnexado, setLogsAnexado] = useState('');
    const [equipamento, setEquipamento] = useState('');
    const [equipPosicao, setEquipPosicao] = useState('');
    const [partNumber, setPartNumber] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [tituloOcorrencia, setTituloOcorrencia] = useState('');
    const [descricaoOcorrencia, setDescricaoOcorrencia] = useState('');
    const [nome, setNome] = useState('');
    const [nomeRelator, setNomeRelator] = useState('');
    const [posGradResponsavel, setPosGradResponsavel] = useState('');
    const [nomeResponsavel, setNomeResponsavel] = useState('');
    const [posGradRelator,setPosGradRelator] = useState('');
    const [status, seStatus] = useState()
    const [fase, setFase] = useState('')
    const [melhoria, setMelhoria] = useState()
    const [categoria, setCategoria] = useState('')
    // const [responsavel , setResponsavel] = useState('')
    const modalizeRef = useRef<Modalize>(null);
    const [classificacao, setClassificacao] = useState('');
    const [ro, setRo] = useState<Ro[]>([]);
    const [ros, setRos] = useState<Ro[]>([]);
    // const [ colaboradorIACIT, setColaboradorIACIT] = useState('');
    const [isEditable, setIsEditable] = useState(false);
    const [visible , setVisible] = useState(false)
    const [visi , setVisi] = useState(false)
    const [procedTecnicos, setProcedTecnicos] = useState('')
    // const [dataReceRo, setDataReceRo] = useState('')
    // const [horaRecebRo, setHoraReceRo] = useState('')
    const [defeito, setDefeito] = useState('')
    const [outros, setOutros] = useState('')
    const [justificativaReclassificacao, setJustificativaReclassificacao] = useState('')
    const [validacaoFechamentoRo, setValidacaoFechamentoRo] = useState('')
    // const [modalVisible, setModalVisible] = useState(false);
     
    useEffect(() => {
      (async () => {
        try {
          const response = await api.get(`/ro/${numer}`);
          setRo(response.data);
          setLoading(false)
        } catch (response) {
          setErrorMessage(response.data.msg);
        }
      })();
          
    },[] );

    async function handelAtualizar() {
      setLoading(true)
      try{
        const response = await api.patch(`/ro/suporte/${numer}`,
        {
          categoria,
           fase , 
           melhoria ,
            classificacao , 
            nome,
            outros, 
            procedTecnicos,
            defeito,
            justificativaReclassificacao,
            validacaoFechamentoRo
          }, );
        Alert.alert(response.data.msg)
        navigation.navigate('Home')
      }catch (response){
        Alert.alert(response.data.msg);
      }
      setLoading(false);

    }

     async function EditarRoa() {
      setIsEditable(!isEditable);  
      setVisible(!visible) 
      setVisi(!visi)
      // console.warn('test')
    }
    async function ConfimarRo() {
      setLoading(true)
      try{
        const response = await api.patch(`/ro/cliente/${numer}`,
        {
                  descricao,
                  contrato,
                  orgao,
                  dataRegistro,
                  classDefeito,
                  versaoBaseDados,
                  versaoSoftware,
                  logsAnexado,
                  equipamento,
                  equipPosicao,
                  partNumber,
                  serialNumber,
                  tituloOcorrencia,
                  descricaoOcorrencia,
                  nomeRelator,
                  posGradRelator,
                  posGradResponsavel,
                  nomeResponsavel,
          }, );
        Alert.alert(response.data.msg)
        navigation.navigate('Home')
      }catch (response){
        Alert.alert(response.data.msg);
      }
      setLoading(false);
    }

    async function EditarRoa() {
      setIsEditable(!isEditable);  
      setVisible(!visible) 
      setVisi(!visi)
      // console.warn('test')
    }
    async function ValidarRo() {
      setLoading(true)
      try{
        const response = await api.patch(`/ro/close/${numer}`,
        {
          validacaoFechamentoRo
          }, );
        Alert.alert(response.data.msg)
        navigation.navigate('Home')
      }catch (response){
        Alert.alert(response.data.msg);
      }
      setLoading(false);
    }

    const dataObj = new Date(ro.dataRegistro)

    const opcoesData = { timeZone: "UTC", day: "2-digit", month: "2-digit", year: "numeric" };
    const opcoesHora = { timeZone: "UTC", hour: "2-digit", minute: "2-digit", second: "2-digit" };

    const dataFormata = dataObj.toLocaleDateString("pt-BR", opcoesData);
    const horaFormatada  = dataObj.toLocaleTimeString("pt-BR", opcoesHora);
    // const dataFormata = 

  return (

  
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : null}
    style={{flex: 1, backgroundColor: '#ffff',}}
    keyboardVerticalOffset={100}>
      <ScrollView 
    contentContainerStyle={{ flexGrow: 1 }} 
    keyboardShouldPersistTaps="always"
  >
    <View style={style.container}>
      <View style={style.conteudo}>
      <View style={style.container_edi}>

      <ScrollView nestedScrollEnabled={true}> 
        <View style={style.container_ro} >
          <View style={style.container_r}>
          <Text style={style.text1}>RO#</Text>
          <Text style={style.text1}>{ro._id}</Text>
          </View>
        </View>
        <View style={style.campos}>
          <Text style={style.text}>Titulo : </Text>
          <TextInput
           defaultValue={ro.tituloOcorrencia} 
           editable={isEditable} 
           style={style.info} 
           onChangeText={tituloOcorrencia => setTituloOcorrencia(tituloOcorrencia)}>
           </TextInput>
        </View>
        {/* <View style={style.campos}>
          <Text style={style.text}>Fase :</Text>
          <TextInput  defaultValue={ro.suporte?.fase} editable={isEditable} style={style.info}></TextInput>
        </View> */}
        <View style={style.campos}>
          <Text style={style.text}>Orgão :</Text>
          <TextInput defaultValue={ro.orgao} editable={isEditable} style={style.info} 
          onChangeText={orgao => setOrgao(orgao)}
          ></TextInput>
        </View>
        <View style={style.campos}>
          <Text style={style.text}>Contrato :</Text>
          <TextInput defaultValue={ro.contrato} editable={isEditable} style={style.info} 
           onChangeText={contrato => setContrato(contrato)}
           ></TextInput>
        </View>
        <View style={style.campos1}>
          <Text style={style.text}>Data e hora do Registro :</Text>
            <TextInput defaultValue={`${dataFormata} as ${horaFormatada}`} editable={false} style={style.info1}
          onChangeText={dataRegistro => setDataRegistro(dataRegistro)}
          ></TextInput>
        </View>
        <View style={style.campos}>
          <Text style={style.text}>Relator :</Text>
          <TextInput defaultValue={ro.relator?.nome} editable={isEditable} style={style.info}
          onChangeText={nomeRelator => setNomeRelator(nomeRelator)}
          ></TextInput>
        </View>
        <View style={style.campos1}>
          <Text style={style.text}>Responsavel  / Supervisor do Centro:</Text>
          <TextInput defaultValue={ro.responsavel?.nome} editable={isEditable} style={style.info}
          onChangeText={nomeResponsavel => setNomeResponsavel(nomeResponsavel)}
          ></TextInput>
        </View>
        <View style={style.campos}>
          <Text style={style.text}>Pos./Grad :</Text>
          <TextInput defaultValue={ro.responsavel?.posGrad} editable={isEditable} style={style.info}
          onChangeText={posGradRelator => setPosGradRelator(posGradRelator)}
          ></TextInput>
        </View>
        <View style={style.campos}>
          <Text style={style.text}>Pos./Grad - Respomsavel :</Text>
          <TextInput defaultValue={ro.responsavel?.posGrad} editable={isEditable} style={style.info}
          onChangeText={posGradResponsavel => setPosGradResponsavel(posGradResponsavel)}
          ></TextInput>
        </View>
        <View style={style.campos}>
          <Text style={style.text}>Defeito :</Text>
          <TextInput defaultValue={ro.classDefeito} editable={isEditable} style={style.info}
          onChangeText={classDefeito => setClassDefeito(classDefeito)}
          ></TextInput>
        </View>
        {ro.classDefeito == 'hardware' ? (
              <View>
                <View style={style.campos}>
                  <Text style={style.text}>Equipamento: </Text>
                  <TextInput defaultValue={ro.opcoesHardware?.equipamento} editable={isEditable} style={style.info}
                  onChangeText={equipamento => setEquipamento(equipamento)}
                  ></TextInput>
                </View>
                <View style={style.campos}>
                  <Text style={style.text}>Posição:</Text>
                  <TextInput  defaultValue={ro.opcoesHardware?.equipPosicao} editable={isEditable} style={style.info}
                  onChangeText={equipPosicao => setEquipPosicao(equipPosicao)}
                  ></TextInput>
                </View>
                <View style={style.campos}>
                  <Text style={style.text}>Part Number: </Text>
                  <TextInput  defaultValue={ro.opcoesHardware?.partNumber} editable={isEditable} style={style.info}
                  onChangeText={partNumber => setPartNumber(partNumber)}
                  ></TextInput>
                </View>
                <View style={style.campos}>
                  <Text style={style.text}>Serial Number: </Text>
                  <TextInput defaultValue={ro.opcoesHardware?.serialNumber} editable={isEditable} style={style.info}
                  onChangeText={serialNumber => setSerialNumber(serialNumber)}
                  ></TextInput>
                </View>
              </View>
            ) : (
              <>
                <View style={style.campos}>
                  <Text style={style.text}>Versão da Base de Dados: </Text>
                  <TextInput defaultValue={ro.opcoesSoftware?.versaoBaseDados} editable={isEditable}  style={style.info}
                  onChangeText={versaoBaseDados => setVersaoBaseDados(versaoBaseDados)}
                  > </TextInput>
                </View>
                <View style={style.campos}>
                  <Text style={style.text}>Versão do Software: </Text>
                  <TextInput defaultValue={ro.opcoesSoftware?.versaoSoftware} editable={isEditable} style={style.info}  
                  onChangeText={versaoSoftware => setVersaoSoftware(versaoSoftware)}
                  ></TextInput>
                </View>
                <View style={style.campos}>
                  <Text style={style.text}>Logs Anexados: </Text>
                  <TextInput defaultValue={ro.opcoesSoftware?.logsAnexado} editable={isEditable} style={style.info}
                  onChangeText={logsAnexado => setLogsAnexado(logsAnexado)}
                  ></TextInput>
                </View>
              </>
            )}

        <View style={style.campos1}>
          <Text style={style.text}>Descrição :</Text>
          <View style={{alignItems:'center'}}>
        <TextInput style={style.input3} 
         onChangeText={descricaoOcorrencia => setDescricaoOcorrencia(descricaoOcorrencia)}
        defaultValue={ro.descricaoOcorrencia}
        editable={isEditable}
        multiline={true}
        placeholder=''
        ></TextInput>
      </View>
     
           </View>
           <View style={style.campos5}>
       <TouchableOpacity
      style={visi ? style.hidden : style.atualiza }
       onPress={EditarRoa}
       >
         <Icon name='pencil' style={{color: '#ffffff'}} size={30} />
       </TouchableOpacity>
       <TouchableOpacity
       style={visible ? style.atualiza : style.hidden}
       onPress={ConfimarRo}
       >
        <Text style={{color: '#ffffff', fontSize:22}}>Confimar</Text>
       </TouchableOpacity>
       <View>
       {/* <TouchableOpacity
       style={style.atualiza}
       >
        <Icon style={{color: '#ffffff'}} name='trash' size={30} />
       </TouchableOpacity> */}
       </View>
       </View>
        <View style={style.campos5}>
        
        </View>

           
          <Text style={style.text}>Situação:</Text>
          <View>
          <Picker
            style={style.picker}
            selectedValue={fase}
            onValueChange={(itemValue, itemIndex) =>
            setFase(itemValue)
          }>
    
            <Picker.Item  label={`${ro.suporte?.fase}`} value={`${ro.suporte?.fase}`} enabled={false} />
            <Picker.Item label="Pendente" value="pendente" />
            <Picker.Item label="Em andamento" value="em andamento" />
            <Picker.Item label="Aguardando validação" value="aguardando validacao" />
            <Picker.Item label="Concluido" value="concluido" />
          </Picker>
          </View>
          <Text style={style.text}>Classificação</Text>
        
          <Picker
          style={style.picker}
            selectedValue={classificacao}
            onValueChange={(itemValue, itemIndex) =>
            setClassificacao(itemValue)
          }>
            <Picker.Item  label={`${ro.suporte?.classificacao}`} value={`${ro.suporte?.classificacao}`} enabled={false} />
            <Picker.Item label="Defeito" value="Defeito" />
            <Picker.Item label="Melhoria" value="Melhoria" /> 
            <Picker.Item label="Outros" value="Outros" />
          </Picker>
          { classificacao == "Defeito" && (
      <>
          <Text style={style.text}>Defeito</Text>
          <View>
          <Picker
          style={style.picker}
            selectedValue={defeito}
            onValueChange={(itemValue, itemIndex) =>
            setDefeito(itemValue)
          }>
            <Picker.Item  label={`${ro.suporte?.defeito}`} value={`${ro.suporte?.defeito}`} enabled={false} />
            <Picker.Item label="Critico" value="Critico" />
            <Picker.Item label="Alto" value="Alto" /> 
            <Picker.Item label="Baixo" value="Baixo" />
          </Picker>
        </View>
        </>
       ) } 

        { classificacao == "Melhoria" && (
      <>  
        
          <Text style={style.text}>Melhoria:</Text>
          <View>
          <Picker
            style={style.picker}
            selectedValue={melhoria}
            onValueChange={(itemValue, itemIndex) =>
            setMelhoria(itemValue)
          }>
             <Picker.Item  label={`${ro.suporte?.melhoria}`} value={`${ro.suporte?.melhoria}`} enabled={false} />
            <Picker.Item label="Funcinalidade existente" value="Funcinalidade existente" />
            <Picker.Item label="Funcionalidade não existente" value="Funcionalidade nao existente"/>
          </Picker>
          </View>
          </>
        ) } 
         { classificacao == "Outros" && (
      <> 
        <Text style={style.text}>Outro</Text>
        <View>
          <Picker
          style={style.picker}
            selectedValue={outros}
            onValueChange={(itemValue, itemIndex) =>
            setOutros(itemValue)
          }>
            <Picker.Item  label={`${ro.suporte?.outros}`} value={`${ro.suporte?.outros}`} enabled={false} />
            <Picker.Item label="Investigação" value="Investigação" />
            <Picker.Item label="Causa externa" value="Causa externa" />
          </Picker>

        </View>
        </>
        ) }

          <Text style={style.text}>Categoria:</Text>
          <TextInput style={style.input}
          defaultValue={ro.suporte?.categoria}
           onChangeText={categoria => setCategoria(categoria)} >
          </TextInput>
           
          
          <Text style={style.text}>Responsável</Text>
          <TextInput style={style.input}
          onChangeText={ nome => setNome( nome)} 
          defaultValue={ro.suporte?.colaboradorIACIT?.nome}
          >
            </TextInput>
            
          {/* <Text style={style.text}>Procedimento Tecnico:</Text>
          <TextInput style={style.input}
          defaultValue={ro.suporte?.procedTecnicos}
           onChangeText={procedTecnicos => setProcedTecnicos(procedTecnicos)} >
          </TextInput> */}
            {/* <Text style={style.text}>Data RO</Text>
          <TextInput style={style.input}
          defaultValue={ro.suporte?.dataRecebRo}
          onChangeText={dataRecebRo => setDataReceRo(dataRecebRo)} >
            </TextInput>
            <Text style={style.text}>Hora RO</Text>
          <TextInput style={style.input}
          defaultValue={ro.suporte?.horaRecebRo}
          onChangeText={horaRecebRo => setHoraReceRo(horaRecebRo)} >
            </TextInput>
            */}

           
        
        <View style={style.campos1}>
           <Text style={style.text}>Justificativa de Reclassificação / Ações Tomadas</Text>
           <View style={style.campos4}>
        <TextInput style={style.input3} 
        multiline={true}
        defaultValue={ro.suporte?.justificativaReclassificacao}
        onChangeText={(justificativaReclassificacao) => setJustificativaReclassificacao(justificativaReclassificacao)}
        placeholder=''
        ></TextInput>
      </View>
        </View>
        { ro.suporte?.fase == "aguardando validacao" ? (
            <>
        <Text style={style.text}>Validação e Fechamento do Ro</Text>
     
          <Picker
          style={style.picker}
            selectedValue={validacaoFechamentoRo}
            onValueChange={(itemValue, itemIndex) =>
              setValidacaoFechamentoRo(itemValue)
          }>
             <Picker.Item  label={`${ro.suporte?.validacaoFechamentoRo}`} value={`${ro.suporte?.validacaoFechamentoRo}`} enabled={false} />
            <Picker.Item label="Encerrar RO" value="Encerrado" />
            <Picker.Item label="Aberto" value="Aberto" />
          </Picker>
          </>
         ):(
          <View style={style.barra}></View>
         )}

{ ro.suporte?.fase == "aguardando validacao" ? (
 <View style={style.conatualiza}>
 <TouchableOpacity
style={style.atualiza1}
onPress={ValidarRo}
>

<Text style={{color: '#ffffff', fontSize:22}}>Atualizar RO</Text>
</TouchableOpacity>
</View>
):(

  <>
 
  <View style={style.conatualiza}>
   <TouchableOpacity
style={style.atualiza1}
onPress={handelAtualizar}
>
 
 <Text style={{color: '#ffffff', fontSize:22}}>Atualizar RO</Text>
</TouchableOpacity>
</View>

</>
  )} 
       
         
       
       </ScrollView>
      </View>
        <View style={{position:'absolute',  bottom: 0,}}>
        <Menu/>
      </View>
      </View>

      {/* <Modalize 
      ref={modalizeRef}
      HeaderComponent={
        <View style={style.hearder}>
<TouchableOpacity onPress={Fechar}>
        <Icon name='close' size={40} />
        </TouchableOpacity>
        </View>
      }
      >
        <View style={style.container1}> 
        <View style={style.container_edi1}>
          <ScrollView>
          <Text style={style.text}>Responsável</Text>
          <TextInput style={style.input}></TextInput>
        <View >
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

        </View>
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
         
        </View>

        <View style={style.containerbotao}> 
        <TouchableOpacity
        onPress={Fechar}
        style={style.botao}
        >
          <Text style={style.botaotexto}>Finalizar</Text>
        </TouchableOpacity>
        </View>
        </ScrollView>
        </View>
        </View>
       
        </Modalize>  */}
    </View> 
    </ScrollView>
    
    </KeyboardAvoidingView>
    
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
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column',
    ...Platform.select({
      ios: { fontFamily: 'Arial', }, 
      android: { fontFamily: 'Roboto' }}), 
    padding:10
  },
  conteudo:{
    alignItems:'center',
    width:'98%',
    height:"98%",
    justifyContent:'space-between',
    
  },
  hidden:{
display: 'none'
  },

  container_edi:{
    display:'flex',
    backgroundColor: '#c3c9d0',
    flexDirection:'column',
    // height: '87%',
    maxHeight:600,
    width: '90%',
    marginBottom:'27%',
    borderRadius: 13,
    padding:5
  },
  container_edi1:{
    display:'flex',
    backgroundColor: '#c3c9d0',
    flexDirection:'column',
    height: '87%',
    width: '90%',
    marginBottom:'27%',
    borderRadius: 13,
    padding:10
  },
  campos:{
    flexDirection:'row',
    justifyContent:'flex-start',
    paddingVertical:3,
    alignItems:'flex-end'

  },
  campos1:{
    flexDirection:'column',
    paddingVertical:2,

  },
  barra:{
    backgroundColor:'black',
    width:'99%',
    height:2,
    alignItems: 'center',
  },
  containerbotao:{
    marginVertical:20,
    width:"99%",
    justifyContent:'center',
    alignItems:'center'
  },
  botao:{
    backgroundColor: '#2B3467',
    borderRadius:10,
    padding:10,
    textAlign:'center'
  },
  botaotexto:{
    color: '#ffffff',
    fontSize:19,
  },

  ro:{
    fontSize:25,
    fontWeight:"700",
    color: 'black',
    textAlign:"center"
  },
  info:{
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
  info1:{
    flex: 1,
    alignItems:'center',
    flexDirection:'row',
    backgroundColor: '#ffff',
    justifyContent:'space-between',
    margin:'auto',
    color: 'black',
    paddingLeft:6,
    paddingBottom:3,
    width:"100%",
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

  text:{
    color:"black",
    fontWeight:"700",
    ...Platform.select({
      ios: { fontFamily: 'Arial', }, 
      android: { fontFamily: 'Roboto' }}), 
    fontSize:16,
    height:35,

  },
  hearder:{
  alignItems:'flex-end',
  justifyContent:'flex-end',

  },

  container_desc:{
    display: 'flex',
    width:'99%',
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
    width:"99%",
  },
  container_r:{
    flexDirection:'row',
    justifyContent:'center',
    width:"99%"
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
  },
  input: {

    borderRadius:10,
    height:50,
    backgroundColor: '#ffff',
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
   textAlignVertical: 'top', 
 },

  descricao:{
    width:'100%',
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
  campos5:{
    justifyContent:'center',
    width:'99%',
    flexDirection:'row',
    // position: 'absolute',
            bottom: 0,
            padding: 10,
    alignItems:'center',
    marginBottom:3
  },


  conatualiza:{
  width:'99%',
  alignItems:'center',
  justifyContent:'center'
  },
  atualiza1:{
    backgroundColor:'#72a2fa',
    borderRadius:10,
    width:'50%',
  textAlign:'center',
  alignItems:'center',
  marginTop:20,
  padding:7,

  },
  atualiza:{
    backgroundColor:'#72a2fa',
    borderRadius:10,
  textAlign:'center',
  alignItems:'center',
  padding:7

  },

    picker: {
      width: '100%',
    backgroundColor: '#ffff',
    },
  

})
export default EditaRos;