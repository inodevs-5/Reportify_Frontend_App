import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, ScrollView,TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import { propsStack } from '../../Routes/Stack/Models';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { VictoryChart, VictoryLine, VictoryPie, VictoryTooltip } from 'victory-native'
import { Picker } from '@react-native-picker/picker';
import Menu from '../../components/menu';

export const Dashboard = () =>{
  
  const navigation = useNavigation<propsStack>()

  const [loading, setLoading] = useState(true)
  const [chartData, setChartData] = useState([])
  const [chartDataLine, setChartDataLine] = useState([])
  const [selected, setSelected] = useState('')
  const [date, setDate] = useState('')
  const [dates, setDates] = useState([])
  const [usuario, setUsuario] = useState()
  const [usuarios, setUsuarios]= useState()
  const [totalROs, setTotalROS] = useState("")

  function clickCard(id: string) {
    setSelected(prev => prev === id ? "" : id)
  }

  useEffect(() => {
    (async () => {
      try {
        if (!date) {
          const response = await api.get('/dashboard/dates');
          setDates(response.data);
          setDate(response.data[0])
        }

        if (!usuario) {
          const response2 = await api.get('/usuario');
          const list = response2.data
          list.unshift({_id: "geral", nome: "Geral"})
          setUsuarios(list)
          setUsuario(response2.data[0]._id)
        }

        if (date && usuario) {
          const response3 = await api.get('/dashboard/data/' + date + '/' + usuario );
          const data = response3.data

          setTotalROS(String(data.total))

          const chartPie = [{
            id: "1",
            label: "Sem tratamento",
            value: data.aberto,
            color: '#878787'
          },
          {
            id: "2",
            label: "Em tratamento",
            value: data.andamento,
            color: "#72A2FA"
          },
          {
            id: "3",
            label: "Solucionado",
            value: data.fechado,
            color: "#2B3467"
          }]

          setChartData(chartPie)

          // const response4 = await api.get('/dashboard/chartline/' + date + '/' + usuario );
          // const data2 = response4.data

          // setChartDataLine({total: data2.total, fechado: data2.fechado})
        }
      } catch (response) {
        Alert.alert(response.data.msg);
      }
      setLoading(false)
    })();
  }, [date, usuario])

  return (
    <>
    <ScrollView contentContainerStyle={{flexGrow: 1, height: 1050}}>
      <View style={style.container}>
        <Text style={style.title}>Dashboard</Text>
        {!loading ? <>
          <View style={style.picker}>
          <Text style={style.subtitle}>Data:</Text>
          <Picker
            selectedValue={date}
            onValueChange={(itemValue) => setDate(itemValue)}
            style={{
              backgroundColor: '#FFF',
              height: 50,
              flex: 1,
              marginLeft: 50
            }}
          >
            {
              dates && dates.map(item => (
                <Picker.Item
                  key={item}
                  label={item}
                  value={item}
                />
              ))
            }
          </Picker>
        </View>

        <View style={style.picker}>
          <Text style={style.subtitle}>Usuário:</Text>
          <Picker
            selectedValue={usuario}
            onValueChange={(itemValue) => setUsuario(itemValue)}
            style={{
              backgroundColor: '#FFF',
              height: 50,
              flex: 1,
              marginLeft: '7%'
            }}
          >
            {
              usuarios && usuarios.map(item => (
                <Picker.Item
                  key={item._id}
                  label={item.nome}
                  value={item._id}
                />
              ))
            }
          </Picker>
        </View>

        <View style={style.chart}>
         {chartData &&
          (totalROs === "0") ? 
            <Text style={style.noChart}>Não há nenhum dado de RO para este gráfico.</Text>
            :
            <VictoryPie 
              data={chartData}
              x="label"
              y="value"
              colorScale={['#878787', '#72A2FA' , '#2B3467']}
              innerRadius={75}
              animate={{
                duration: 2000,
                easing: "linear"
              }}
              style={{
                  labels: {
                    fill: 'white'
                  },
                  data: {
                    fillOpacity: ({datum}) => (datum.id === selected || selected === "") ? 1 : 0.3,
                    stroke: ({datum}) => (datum.id === selected) ? 'black' : 'none',
                    strokeWidth: 3,
                    strokeOpacity: 0.5
                  }
              }}
              labelComponent={
                <VictoryTooltip 
                  renderInPortal={false}
                  flyoutStyle={{
                    stroke: 0,
                    fill: ({datum}) => datum.color
                  }}
                />
              }
            />
          }

          {totalROs && 
            <TouchableOpacity style={style.card} onPress={() => clickCard('')}>
              <View style={style.tag} />
              <Text style={style.label}>
                Total de ROs
              </Text>
              <Text style={style.value}>
                {totalROs}
              </Text>
            </TouchableOpacity>
          }

          {chartData[0] &&           
            <TouchableOpacity style={style.card} onPress={() => clickCard(chartData[0].id)}>
              <View style={style.tag1} />
              <Text style={style.label}>
                RO's sem tratamento
              </Text>
              <Text style={style.value}>
                {chartData[0].value}
              </Text>
            </TouchableOpacity>
          }

          {chartData[1] &&
            <TouchableOpacity style={style.card} onPress={() => clickCard(chartData[1].id)}>
              <View style={style.tag2} />
              <Text style={style.label}>
                RO's em tratamento
              </Text>
              <Text style={style.value}>
                {chartData[1].value}
              </Text>
            </TouchableOpacity>
          }

          {chartData[2] && 
            <TouchableOpacity style={style.card} onPress={() => clickCard(chartData[2].id)}>
              <View style={style.tag3} />
              <Text style={style.label}>
                RO's solucionados
              </Text>
              <Text style={style.value}>
                {chartData[2].value}
              </Text>
            </TouchableOpacity>
          }

          {/* {
            chartDataLine &&
            <VictoryChart>
              <VictoryLine
                  data={chartDataLine.total}
                  x="label"
                  y="value"
                  style={{
                    data: {
                      stroke: "#72A2FA",
                      strokeWidth: 5
                    },
                    labels: {
                      display: "none"
                    }
                  }}
              />
              <VictoryLine
                  data={chartDataLine.fechado}
                  x="label"
                  y="value"
                  style={{
                    data: {
                      stroke: "#2B3467",
                      strokeWidth: 5
                    },
                    labels: {
                      display: "none"
                    }
                  }}
              />
            </VictoryChart>
          } */}
        </View>
        </> : 
          <View style={{marginTop: 100, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#666"/>
          </View>
        }
      </View>
    </ScrollView>

    <View style={{position:'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center'}}>
        <Menu/>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 20,
    backgroundColor: '#E1E1EF',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  chart: {
    width: '100%',
    alignItems: 'center'
  },
  noChart: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    marginVertical: 300,
  },
  card: {
    width: '100%',
    height: 80,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    overflow: 'hidden'
  },
  tag: {
    width: 10,
    height: 80,
    marginRight: 16,
    backgroundColor: '#ffffff'
  },
  tag1: {
    width: 10,
    height: 80,
    marginRight: 16,
    backgroundColor: '#878787'
  },
  tag2: {
    width: 10,
    height: 80,
    marginRight: 16,
    backgroundColor: '#72A2FA'
  },
  tag3: {
    width: 10,
    height: 80,
    marginRight: 16,
    backgroundColor: '#2B3467'
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16
  },
  value: {
    fontSize: 16,
    marginRight: 16
  },
  picker: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default Dashboard;