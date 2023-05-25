import React, { useState, useEffect } from 'react';
import {
  StyleSheet, 
  View,
  Text, 
  ScrollView, 
  Platform, 
  TouchableOpacity, 
  TextInput,
  KeyboardAvoidingView, 
  Alert,
  ActivityIndicator,
  PermissionsAndroid
} 
from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';;
import { Ro } from '../../types/Types';
import Menu from '../../components/menu';
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Fontisto';

const EditaRos = ({route}) => {
  const { usuario } = useAuth(); 
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
    const [fase, setFase] = useState('')
    const [melhoria, setMelhoria] = useState()
    const [categoria, setCategoria] = useState('')
    const [classificacao, setClassificacao] = useState('');
    const [ro, setRo] = useState<Ro[]>([]);
    const [isEditable, setIsEditable] = useState(false);
    const [visible , setVisible] = useState(false)
    const [visi , setVisi] = useState(false)
    const [procedTecnicos, setProcedTecnicos] = useState('')
    const [defeito, setDefeito] = useState('')
    const [outros, setOutros] = useState('')
    const [situacao, setSituacao] = useState('')
    const [justificativaReclassificacao, setJustificativaReclassificacao] = useState('')
    const [validacaoFechamentoRo, setValidacaoFechamentoRo] = useState('')
    const [justificativaFechamento, setJustificativaFechamento] = useState('')
    const [usuarios, setUsuarios] = useState()
    const [idcolaboradorIACIT, setIdColaboradorIACIT] = useState()
     
    useEffect(() => {
      (async () => {
        try {
          const response = await api.get(`/ro/${numer}`);
          setRo(response.data);
          setTituloOcorrencia(response.data.tituloOcorrencia);
          setOrgao(response.data.orgao);
          setContrato(response.data.contrato);
          setDataRegistro(response.data.dataRegistro);
          setNomeRelator(response.data.relator.id.nome);
          setNomeResponsavel(response.data.responsavel.nome);
          setPosGradRelator(response.data.relator.posGrad);
          setPosGradResponsavel(response.data.responsavel.posGrad);
          setClassDefeito(response.data.classDefeito);
          setDescricaoOcorrencia(response.data.descricaoOcorrencia);
          setValidacaoFechamentoRo(response.data.validacaoFechamentoRo);
          if (response.data.justificativaFechamento) {
            setJustificativaFechamento(response.data.justificativaFechamento)
          }
          if (response.data.classDefeito === "hardware") {
            setEquipamento(response.data.opcoesHardware.equipamento);
            setEquipPosicao(response.data.opcoesHardware.equipPosicao);
            setPartNumber(response.data.opcoesHardware.partNumber);
            setSerialNumber(response.data.opcoesHardware.serialNumber);
          }
          if (response.data.classDefeito === "software") {
            setVersaoBaseDados(response.data.opcoesSoftware.versaoBaseDados);
            setVersaoSoftware(response.data.opcoesSoftware.versaoSoftware);
            setLogsAnexado(response.data.opcoesSoftware.logsAnexado);
          }
          if (response.data.suporte) {
            setFase(response.data.suporte.fase);
            setDefeito(response.data.suporte.defeito);
            setClassificacao(response.data.suporte.classificacao);
            setCategoria(response.data.suporte.categoria);
            setMelhoria(response.data.suporte.melhoria);
            setOutros(response.data.suporte.outros);
            setJustificativaReclassificacao(response.data.suporte.justificativaReclassificacao);
            if (response.data.suporte.colaboradorIACIT) {
              setIdColaboradorIACIT(response.data.suporte.colaboradorIACIT.id._id);
            }
          } else {
            setFase('pendente')
          }
          
          setDescricaoOcorrencia(response.data.descricaoOcorrencia);
          setValidacaoFechamentoRo(response.data.validacaoFechamentoRo);
          if (response.data.classDefeito === "hardware") {
            setEquipamento(response.data.opcoesHardware.equipamento);
            setEquipPosicao(response.data.opcoesHardware.equipPosicao);
            setPartNumber(response.data.opcoesHardware.partNumber);
            setSerialNumber(response.data.opcoesHardware.serialNumber);
          }
          if (response.data.classDefeito === "software") {
            setVersaoBaseDados(response.data.opcoesSoftware.versaoBaseDados);
            setVersaoSoftware(response.data.opcoesSoftware.versaoSoftware);
            setLogsAnexado(response.data.opcoesSoftware.logsAnexado);
          }
          if (response.data.suporte) {
            setFase(response.data.suporte.fase);
            setDefeito(response.data.suporte.defeito);
            setClassificacao(response.data.suporte.classificacao);
            setCategoria(response.data.suporte.categoria);
            setMelhoria(response.data.suporte.melhoria);
            setOutros(response.data.suporte.outros);
            setJustificativaReclassificacao(response.data.suporte.justificativaReclassificacao);
            if (response.data.suporte.colaboradorIACIT) {
              setNome(response.data.suporte.colaboradorIACIT.id.nome);
              setIdColaboradorIACIT(response.data.suporte.colaboradorIACIT.id);
            }
          }
          
          const response2 = await api.get('/usuario')
          setUsuarios(response2.data)
          setLoading(false)
        } catch (response) {
          Alert.alert(response.data.msg);
          Alert.alert(response.data.msg);
        }
        setLoading(false)
      })();
          
    },[] );
    async function handelAtualizar() {
      setLoading(true)

      try{
        const response = await api.patch(`/ro/suporte/${numer}`,
        {
            categoria,
            fase, 
            idcolaboradorIACIT,
            melhoria,
            classificacao, 
            nome,
            outros, 
            procedTecnicos,
            defeito,
            justificativaReclassificacao,
            validacaoFechamentoRo
          }, );

        Alert.alert(response.data.msg)
        navigation.navigate('TabelaROs')
        
      }catch (response){
        Alert.alert(response.data.msg);
      }
      setLoading(false);

    }

     async function EditarRoa() {
      setIsEditable(!isEditable);  
      setVisible(!visible) 
      setVisi(!visi)
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
                  idRelator: usuario._id
          }, );
        Alert.alert(response.data.msg)
        navigation.navigate('Home')
      }catch (response){
        Alert.alert(response.data.msg);
      }
      setLoading(false);
    }

    async function ValidarRo() {
      setLoading(true)
      try{
        const response = await api.patch(`/ro/close/${numer}`,
        {
          validacaoFechamentoRo,
          justificativaFechamento
          }, );
        Alert.alert(response.data.msg)
        navigation.navigate('Home')
      }catch (response){
        Alert.alert(response.data.msg);
      }
      setLoading(false);
    }

    function formatarData(dataInput: String){
      const data = new Date(dataInput)
      const dia  = data.getDate().toString()
      const diaF = (dia.length == 1) ? '0' + dia : dia
      const mes  = (data.getMonth() + 1).toString()
      const mesF = (mes.length == 1) ? '0' + mes : mes
      const anoF = data.getFullYear()
      const hora = data.getHours()
      const minuto = data.getMinutes()
      const segundo = data.getSeconds()
      return diaF + "/" + mesF + "/" + anoF + " às " + hora + ":" + minuto + ":" + segundo
    }

    const checkPermission = async(filename: String) => {
      if (Platform.OS === 'ios') {
          downloadImage(filename);
      } else {
          try {
              const granted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                  title: 'Permissão do armazenamento requerida',
                  message: 'O aplicativo precisa acessar seu armazenamento para baixar arquivos'
              })
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  downloadImage(filename);
              } else {
                  Alert.alert('Permissão de Armazenamento não concedido');
              }
          } catch (error) {
              console.warn(error);
          }
      }
    }

    // rn-fetch-blob
    async function downloadImage(imageName: String) {
      try {
          const response = await api.get('/ro/image/' + imageName)
          const imageInfo = response.data

          const IMAGE_PATH = 'http://10.0.2.2:3000/ro/download/' + imageName;

          let date = new Date();
          let image_url = IMAGE_PATH;
          var ext = getExtention(image_url);
          ext = "." + ext[0];
          const {config, fs} = RNFetchBlob;
          let PictureDir = fs.dirs.PictureDir;

          const token = await AsyncStorage.getItem('@Reportify:token');
          let options = {
              fileCache: true,
              addAndroidDownloads: {
                  useDownloadManager: true,
                  notification: true,
                  path: PictureDir + '/image_' + Math.floor(date.getTime() + date.getSeconds()/2) + ext,
                  description: 'Image',
                  mime: imageInfo.contentType
              }
          }
          config(options)
          .fetch('GET', image_url, {
            Authorization: 'Baerer ' + token
          })
          .then(res => {
              Alert.alert('Imagem baixada com sucesso');
          })
      } catch (error) {
          console.log(error)
      }
    }

    const getExtention = filename => {
      return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
    }

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : null}
    style={{flex: 1, backgroundColor: '#ffff',}}
    keyboardVerticalOffset={100}>
        {!loading ? <>
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
                    <Text style={style.text}>Título: </Text>
                          <TextInput
                          defaultValue={tituloOcorrencia} 
                          editable={isEditable} 
                          style={style.info} 
                          onChangeText={tituloOcorrencia => setTituloOcorrencia(tituloOcorrencia)}>
                          </TextInput>
                  </View>
                        <View style={style.campos}>
                          <Text style={style.text}>Orgão: </Text>
                          <TextInput defaultValue={orgao} editable={isEditable} style={style.info} 
                          onChangeText={orgao => setOrgao(orgao)}
                          >
                          </TextInput>
                        </View>
                  <View style={style.campos}>
                          <Text style={style.text}>Contrato: </Text>
                          <TextInput defaultValue={contrato} editable={isEditable} style={style.info} 
                          onChangeText={contrato => setContrato(contrato)}
                          >
                          </TextInput>
                  </View>
                  <View style={style.campos1}>
                    <Text style={style.text}>Data e horário: </Text>
                            <TextInput defaultValue={formatarData(dataRegistro)} editable={false} style={style.info1}
                            onChangeText={dataRegistro => setDataRegistro(dataRegistro)}
                            >
                            </TextInput>
                  </View>
                  <View style={style.campos}>
                      <Text style={style.text}>Relator: </Text>
                          <TextInput defaultValue={nomeRelator} editable={isEditable} style={style.info}
                          onChangeText={nomeRelator => setNomeRelator(nomeRelator)}
                          >
                          </TextInput>
                  </View>
                  <View style={style.campos1}>
                      <Text style={style.text}>Responsável/Supervisor do Centro: </Text>
                        <TextInput defaultValue={nomeResponsavel} editable={isEditable} style={style.info}
                        onChangeText={nomeResponsavel => setNomeResponsavel(nomeResponsavel)}
                        >
                        </TextInput>
                  </View>
                  <View style={style.campos}>
                      <Text style={style.text}>Pos./Grad: </Text>
                        <TextInput defaultValue={posGradRelator} editable={isEditable} style={style.info}
                        onChangeText={posGradRelator => setPosGradRelator(posGradRelator)}
                        >
                        </TextInput>
                  </View>
                  <View style={style.campos}>
                      <Text style={style.text}>Pos./Grad - Responsável: </Text>
                        <TextInput defaultValue={posGradResponsavel} editable={isEditable} style={style.info}
                        onChangeText={posGradResponsavel => setPosGradResponsavel(posGradResponsavel)}
                        >
                        </TextInput>
                  </View>
                  <View style={style.campos}>
                        <Text style={style.text}>Defeito: </Text>
                          <TextInput defaultValue={classDefeito} editable={isEditable} style={style.info}
                          onChangeText={classDefeito => setClassDefeito(classDefeito)}
                          >
                          </TextInput>
                  </View>


                      {classDefeito == 'hardware' ? (
                            <View>
                              <View style={style.campos}>
                                <Text style={style.text}>Equipamento: </Text>
                                  <TextInput defaultValue={equipamento} editable={isEditable} style={style.info}
                                  onChangeText={equipamento => setEquipamento(equipamento)}
                                  ></TextInput>
                              </View>
                              <View style={style.campos}>
                                <Text style={style.text}>Posição: </Text>
                                  <TextInput  defaultValue={equipPosicao} editable={isEditable} style={style.info}
                                  onChangeText={equipPosicao => setEquipPosicao(equipPosicao)}
                                  ></TextInput>
                              </View>
                              <View style={style.campos}>
                                  <Text style={style.text}>Part Number: </Text>
                                    <TextInput  defaultValue={partNumber} editable={isEditable} style={style.info}
                                    onChangeText={partNumber => setPartNumber(partNumber)}
                                    ></TextInput>
                              </View>
                              <View style={style.campos}>
                                <Text style={style.text}>Serial Number: </Text>
                                    <TextInput defaultValue={serialNumber} editable={isEditable} style={style.info}
                                    onChangeText={serialNumber => setSerialNumber(serialNumber)}
                                    ></TextInput>
                              </View>
                            </View>
                          ) : (
                            <>
                              <View style={style.campos}>
                                <Text style={style.text}>Versão da Base de Dados: </Text>
                                    <TextInput defaultValue={versaoBaseDados} editable={isEditable}  style={style.info}
                                    onChangeText={versaoBaseDados => setVersaoBaseDados(versaoBaseDados)}
                                    ></TextInput>
                              </View>
                              <View style={style.campos}>
                                <Text style={style.text}>Versão do Software: </Text>
                                    <TextInput defaultValue={versaoSoftware} editable={isEditable} style={style.info}  
                                    onChangeText={versaoSoftware => setVersaoSoftware(versaoSoftware)}
                                    ></TextInput>
                              </View>
                              <View style={style.campos1}>
                                <Text style={style.text}>Logs Anexados: </Text>
                              {logsAnexado && logsAnexado.map(l => (
                                  <TouchableOpacity onPress={() => checkPermission(l.nomeAnexo)} key={l.idAnexo} >
                                    <Icon name='paperclip' size={15} style={style.iconClip}/>
                                    <TextInput defaultValue={l.nomeAnexo} editable={isEditable} style={style.info2}
                                    onChangeText={logsAnexado => setLogsAnexado(logsAnexado)}
                                    ></TextInput>
                                  </TouchableOpacity>
                              ))}
                              </View>
                            </>
                          )}



                        <View style={style.campos1}>
                          <Text style={style.text}>Descrição: </Text>
                              <View style={{alignItems:'center'}}>
                                    <TextInput style={style.input3} 
                                          onChangeText={descricaoOcorrencia => setDescricaoOcorrencia(descricaoOcorrencia)}
                                          defaultValue={descricaoOcorrencia}
                                          editable={isEditable}
                                          multiline={true}
                                          placeholder=''
                                          >
                                    </TextInput>
                              </View>
                        </View>
                        {/* <View style={style.campos5}>
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
                                  <Text style={{color: '#ffffff', fontSize:22}}>Confirmar</Text>
                            </TouchableOpacity>
                        </View> */}
                        
                        <Text style={style.text}>Situação: </Text>
                          <View>
                                <Picker
                                  enabled={(usuario.perfil === "admin" && fase !== 'concluido') ? true : false}
                                  style={style.picker}
                                  selectedValue={fase}
                                  onValueChange={(itemValue, itemIndex) =>
                                  setFase(itemValue)
                                }>
                          
                                        <Picker.Item  label={fase} value={fase} enabled={false} />
                                        <Picker.Item label="Pendente" value="pendente" />
                                        <Picker.Item label="Em andamento" value="andamento" />
                                        <Picker.Item label="Aguardando validação" value="validacao" />
                                        <Picker.Item label="Concluido" value="concluido" enabled={false} />
                                </Picker>
                          </View>
                          
                        <Text style={style.text}>Classificação: </Text>
                                  <Picker
                                      enabled={(usuario.perfil === "admin" && fase !== 'concluido') ? true : false}
                                      style={style.picker}
                                        selectedValue={classificacao}
                                        onValueChange={(itemValue, itemIndex) =>
                                        setClassificacao(itemValue)
                                      }>
                                        <Picker.Item label={classificacao} value={classificacao} enabled={false} />
                                        <Picker.Item label="Defeito" value="defeito" />
                                        <Picker.Item label="Melhoria" value="melhoria" /> 
                                        <Picker.Item label="Outros" value="outros" />
                                  </Picker>
                            { classificacao == "defeito" && (
                                  <>
                                    <Text style={style.text}>Defeito: </Text>
                                              <View>
                                                    <Picker
                                                      enabled={(usuario.perfil === "admin" && fase !== 'concluido') ? true : false}
                                                      style={style.picker}
                                                      selectedValue={defeito}
                                                      onValueChange={(itemValue, itemIndex) =>
                                                      setDefeito(itemValue)
                                                    }>
                                                            <Picker.Item  label={defeito} value={defeito} enabled={false} />
                                                            <Picker.Item label="Crítico" value="critico" />
                                                            <Picker.Item label="Alto" value="alto" /> 
                                                            <Picker.Item label="Baixo" value="baixo" />
                                                    </Picker>
                                            </View>
                                    </>
                                  ) } 

                                    { classificacao == "melhoria" && (
                                  <>  
                                  <Text style={style.text}>Melhoria: </Text>
                                        <View>
                                                <Picker
                                                  enabled={(usuario.perfil === "admin" && fase !== 'concluido') ? true : false}
                                                  style={style.picker}
                                                  selectedValue={melhoria}
                                                  onValueChange={(itemValue, itemIndex) =>
                                                  setMelhoria(itemValue)
                                                }>
                                                        <Picker.Item  label={melhoria} value={melhoria} enabled={false} />
                                                        <Picker.Item label="Funcinalidade existente" value="funcionalidade existente" />
                                                        <Picker.Item label="Funcionalidade não existente" value="funcionalidade nao existente"/>
                                                </Picker>
                                        </View>
                                  </>
                                ) } 
                                { classificacao == "outros" && (
                                    <> 
                                      <Text style={style.text}>Outros: </Text>
                                            <View>
                                                <Picker
                                                enabled={(usuario.perfil === "admin" && fase !== 'concluido') ? true : false}
                                                style={style.picker}
                                                  selectedValue={outros}
                                                  onValueChange={(itemValue, itemIndex) =>
                                                  setOutros(itemValue)
                                                }>
                                                        <Picker.Item  label={outros} value={outros} enabled={false} />
                                                        <Picker.Item label="Investigação" value="investigacao" />
                                                        <Picker.Item label="Causa externa" value="causa externa" />
                                
                                                </Picker>

                                            </View>
                                      </>
                                ) }

                      <Text style={style.text}>Categoria: </Text>
                            <TextInput style={style.input}
                            defaultValue={categoria}
                            onChangeText={categoria => setCategoria(categoria)} 
                            editable={(usuario.perfil === "admin" && fase !== 'concluido') ? true : false}>
                            </TextInput> 
                            
                            <Text style={style.text}>Responsável: </Text>
                            <View>
                              <Picker
                                enabled={(usuario.perfil === "admin" && fase !== 'concluido') ? true : false}
                                style={style.picker}
                                selectedValue={idcolaboradorIACIT}
                                onValueChange={(itemValue, itemIndex) =>{
                                  setIdColaboradorIACIT(itemValue)

                                }
                              }>
                                <Picker.Item  label={nome} value={idcolaboradorIACIT} enabled={false} />
                                {usuarios && usuarios.map(usuario => (
                                  <Picker.Item key={usuario._id} label={usuario.nome} value={usuario._id} />
                                ))}
                              </Picker>
                            </View>

                      <View style={style.campos1}>
                          <Text style={style.text}>Justificativa de Reclassificação/Ações Tomadas: </Text>
                              <View>
                                    <TextInput style={style.input3} 
                                    multiline={true}
                                    defaultValue={justificativaReclassificacao}
                                    onChangeText={(justificativaReclassificacao) => setJustificativaReclassificacao(justificativaReclassificacao)}
                                    placeholder=''
                                    editable={(usuario.perfil === "admin" && fase !== 'concluido') ? true : false}
                                    ></TextInput>
                              </View>
                      </View>
                      { (fase == 'pendente' || fase == 'validacao' || fase == 'andamento') ? (
                      
                          <>
                            <Text style={style.text}>Validação e Fechamento do Ro</Text>
                              <Picker
                              enabled={usuario.perfil === "cliente" ? true : false}
                              style={style.picker}
                                selectedValue={validacaoFechamentoRo}
                                onValueChange={(itemValue, itemIndex) =>
                                  setValidacaoFechamentoRo(itemValue)
                              }>
                                      <Picker.Item  label={validacaoFechamentoRo} value={validacaoFechamentoRo} enabled={false} />
                                      <Picker.Item label="Aberto" value="Aberto" />
                                      <Picker.Item label="Encerrado" value="Encerrado" />
                                      <Picker.Item label="Recusado" value="Recusado" />
                              </Picker>
                           </>
                      ):(
                        <View style={style.campos4}></View>
                      )}

                      {
                        validacaoFechamentoRo === "Recusado" &&
                        <View style={style.campos1}>
                          <Text style={style.text}>Justificativa da Recusão do RO: </Text>
                            <View>
                              <TextInput style={style.input3} 
                              multiline={true}
                              defaultValue={justificativaFechamento}
                              onChangeText={(justificativaFechamento) => setJustificativaFechamento(justificativaFechamento)}
                              placeholder=''
                              editable={(usuario.perfil === "cliente" && fase !== 'concluido') ? true : false}
                              ></TextInput>
                            </View>
                        </View>
                      }
                      {
                         fase === "validacao" && usuario.perfil === "cliente" ? (
                         
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
                           { usuario.perfil === "admin" &&
                          
                            <View style={style.conatualiza}>
                                  <TouchableOpacity
                                  style={style.atualiza1}
                                  onPress={handelAtualizar}
                                    >
                                        <Text style={{color: '#ffffff', fontSize:22}}>Atualizar RO</Text>
                                  </TouchableOpacity>
                            </View>
                            }
                            
                      </>
                        )} 
              </ScrollView>
          </View>
                <View style={{position:'absolute',  bottom: 0,}}>
                  <Menu/>
                </View>
        </View>
    </View> 
  </ScrollView>
  </> : 
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#666"/>
  </View>
}
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
    alignItems:'flex-end',
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
  info2: {
    flex: 1,
    alignItems:'center',
    flexDirection:'row',
    backgroundColor: '#ffff',
    justifyContent:'space-between',
    margin:'auto',
    color: 'black',
    paddingLeft:6,
    paddingBottom:3,
    width:"90%",
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
  iconClip: {
    position: 'absolute',
    top: 8,
    right: 10
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
    width:"99%",
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
   color: '#000'
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