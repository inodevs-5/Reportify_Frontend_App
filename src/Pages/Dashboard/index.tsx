import React, { useState } from 'react';
import {StyleSheet, View, Text, TextInput,TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import { propsStack } from '../../Routes/Stack/Models';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import {
    PieChart,
} from "react-native-chart-kit";

export const Dashboard = () =>{
  const navigation = useNavigation<propsStack>();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const data = [
    {
      name: "Em andamento",
      population: 21500000,
      color: "#2B3467",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "ROs concluídos",
      population: 2800000,
      color: "#C3C9D0",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "ROs abertos",
      population: 8538000,
      color: "#72A2FA",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
  ];

  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    }
  }

  return (

    <View style={style.container}>
        <Text style={style.title}>Dashboard</Text>
        <PieChart
            data={data}
            width={350}
            height={220}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            center={[10, 0]}

        />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    width:160,
    borderRadius:300,
    height: 40,
    backgroundColor: '#72A2FA',
    marginTop:10,
    marginBottom:10,
  },
  redefinir:{   //texto do botão para redefinir senha
    textAlign:'center',
    paddingTop:10,
    color:'white',
  },
  campos:{
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '3%',
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
  title:{ //titulos das divisões dos campos
    fontSize: 24,
    marginTop: 30,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
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
    width: 140,
    height:27,
    marginBottom: 3,
    borderRadius:300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  error: {
    margin: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 5,
    fontSize:15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ff0000',
  },
  text: {
    margin: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 5,
    fontSize:15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Dashboard;