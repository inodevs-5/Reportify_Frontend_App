import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, ScrollView,TouchableOpacity, Alert} from 'react-native';
import { propsStack } from '../../Routes/Stack/Models';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { VictoryPie, VictoryTooltip } from 'victory-native'
import { Picker } from '@react-native-picker/picker';

export const Dashboard = () =>{
  const navigation = useNavigation<propsStack>();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState('');
  const [date, setDate] = useState("Janeiro 2023");

  function clickCard(id: string) {
    setSelected(prev => prev === id ? "" : id)
  }

  useEffect(() => {
    setData(allData[date])
  }, [date])

  const dates = [
    {label: "Janeiro 2023", value: '0'},
    {label: "Fevereiro 2023", value: '1'},,
    {label: "Março 2023", value: '2'},
  ]

  const allData = {
    "Janeiro 2023": [
      {
        id: "1",
        label: "Aberto",
        value: 25,
        color: '#C3C9D0'
      },
      {
        id: "2",
        label: "Em andamento",
        value: 15,
        color: "#72A2FA"
      },
      {
        id: "3",
        label: "Resolvido",
        value: 20,
        color: "#2B3467"
      }
    ],
    "Fevereiro 2023": [
      {
        id: "1",
        label: "Aberto",
        value: 20,
        color: '#C3C9D0'
      },
      {
        id: "2",
        label: "Em andamento",
        value: 25,
        color: "#72A2FA"
      },
      {
        id: "3",
        label: "Resolvido",
        value: 40,
        color: "#2B3467"
      }
    ],
    "Março 2023": [
      {
        id: "1",
        label: "Aberto",
        value: 10,
        color: '#C3C9D0'
      },
      {
        id: "2",
        label: "Em andamento",
        value: 40,
        color: "#72A2FA"
      },
      {
        id: "3",
        label: "Resolvido",
        value: 30,
        color: "#2B3467"
      }
    ]
  }

  useEffect(() => {

  })

  return (
    <ScrollView>
      <View style={style.container}>
        <Text style={style.title}>Dashboard</Text>
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
              dates.map(item => (
                <Picker.Item
                  key={item.label}
                  label={item.label}
                  value={item.label}
                />
              ))
            }
          </Picker>
        </View>
        <View style={style.chart}>
          <VictoryPie 
            data={data}
            x="label"
            y="value"
            colorScale={['#C3C9D0', '#72A2FA' , '#2B3467']}
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
          {data[0] &&           
            <TouchableOpacity style={style.card} onPress={() => clickCard(data[0].id)}>
              <View style={style.tag1} />
              <Text style={style.label}>
                RO's abertos
              </Text>
              <Text style={style.value}>
                {data[0].value}
              </Text>
            </TouchableOpacity>
          }

          {data[1] &&
            <TouchableOpacity style={style.card} onPress={() => clickCard(data[1].id)}>
              <View style={style.tag2} />
              <Text style={style.label}>
                RO's em andamento
              </Text>
              <Text style={style.value}>
                {data[1].value}
              </Text>
           </TouchableOpacity>
          }

          {data[2] && 
            <TouchableOpacity style={style.card} onPress={() => clickCard(data[2].id)}>
              <View style={style.tag3} />
              <Text style={style.label}>
                RO's resolvidos
              </Text>
              <Text style={style.value}>
                {data[2].value}
              </Text>
          </TouchableOpacity>
          }
        </View>
      </View>
    </ScrollView>
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
  card: {
    width: '100%',
    height: 80,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    overflow: 'hidden'
  },
  tag1: {
    width: 10,
    height: 80,
    marginRight: 16,
    backgroundColor: '#C3C9D0'
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