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
  const [dates, setDates] = useState([])
  const [usuario, setUsuario] = useState()
  const [usuarios, setUsuarios]= useState()

  function clickCard(id: string) {
    setSelected(prev => prev === id ? "" : id)
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/dashboard/dates');
        setDates(response.data);
        setDate(response.data[0])

        const response2 = await api.get('/usuario');
        setUsuarios(response2.data)
        setUsuario(response2.data[0])
        
        setLoading(false)
      } catch (response) {
        Alert.alert(response.data.msg);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (date && usuario) {
          const response = await api.get('/dashboard/data/' + date + '/' + + usuario._id );
          setData(response.data);
        }
      } catch (response) {
        Alert.alert(response.data.msg);
      }
    })();
  }, [date, usuario])

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
            selectedValue={date}
            onValueChange={(itemValue) => setDate(itemValue)}
            style={{
              backgroundColor: '#FFF',
              height: 50,
              flex: 1,
              marginLeft: 28
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
          <VictoryPie 
            data={data}
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
          {data &&           
            <TouchableOpacity style={style.card} onPress={() => clickCard(data[0].id)}>
              <View style={style.tag1} />
              <Text style={style.label}>
                RO's abertos
              </Text>
              <Text style={style.value}>
                {data.aberto}
              </Text>
            </TouchableOpacity>
          }

          {data &&
            <TouchableOpacity style={style.card} onPress={() => clickCard(data[1].id)}>
              <View style={style.tag2} />
              <Text style={style.label}>
                RO's em andamento
              </Text>
              <Text style={style.value}>
                {data.andamento}
              </Text>
           </TouchableOpacity>
          }

          {data && 
            <TouchableOpacity style={style.card} onPress={() => clickCard(data[2].id)}>
              <View style={style.tag3} />
              <Text style={style.label}>
                RO's resolvidos
              </Text>
              <Text style={style.value}>
                {data.fechado}
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