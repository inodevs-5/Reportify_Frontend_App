import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    searchIcon:{
      color: 'black',
      // backgroundColor: 'yellow',
    },
  
    containertodomembro:{
        flex:.8,
        backgroundColor:"yellow"
        // position: 'relative',
        // alignItems: 'center',
        // width: 300,
        // height: 70,
        // backgroundColor: '#2B3467',
        // // marginBottom: -100,
        // // marginTop: 160,
        // borderRadius: 35,
        // alignSelf: 'flex-end',
    },
  
    containerbusca:{
      // backgroundColor:'yellow',
      display:'flex',
      flexDirection:'column',
    },
  
    container12:{
      flexDirection:'row',
      width: 300,
      height:40,
      margin:'auto',
      alignItems:'center',
      justifyContent:'space-between'
    },
    buttons:{
      // backgroundColor:'red',
      margin:'auto',
      width:300
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
     marginBottom:10
    },
    
    
    busca:{
      textAlign: 'left',
      width: 250,
      height: 40,
      // marginBottom: -30,
      fontWeight: 'bold',
      paddingTop:10,
      // backgroundColor:'red',
    },
  
    iconNotif:{
      paddingLeft: 70,
      color: 'white',
    },
    
    iconHome: {
      // paddingLeft: 90,
      color: 'white',
    },
  
    div: {
      position: 'relative',
      alignItems: 'center',
      width: 300,
      height: 70,
      backgroundColor: '#2B3467',
      marginBottom: 10,
      marginTop: 160,
      borderRadius: 35,
    },
  
    title:{
      fontSize: 25,
      marginTop: 30,
      marginRight: 115,
      textAlign: 'left',
      color: 'black',
      fontWeight: 'bold',
    },
  
    input: {
      flex: 1,
      alignItems:'center',
      flexDirection:'row',
      backgroundColor: '#2B3467',
      justifyContent:'space-between',
      margin:'auto',
      color: 'black',
      paddingLeft:6,
      width:300,
      height:40,
      marginBottom: 10,
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
  
    container: {
      flex: 1,
      ...Platform.select({
        ios: { fontFamily: 'Arial', }, 
        android: { fontFamily: 'Roboto' }}), 
      display:'flex',
      backgroundColor: 'red',
      justifyContent: 'space-between',
      margin:'auto',
      alignItems: 'center',
      flexDirection: 'column'
    },
  
    hyperlinkStyle: {
      color: '#72A2FA',
      marginTop: 25,
      fontSize: 12
    },
  
    button:{
      alignItems: 'center',
      width: 300,
      padding: 15,
      backgroundColor: '#72A2FA',
      marginBottom: 20,
      // marginTop: 20,
      borderRadius: 7,
    },
    
    enterButton:{
      color: 'white',
      fontSize: 20,
    },
  
    bar:{
      backgroundColor: '#68696C',
      width: 290,
      height: 2,
      // marginTop: -10
    },
  
    exitIcon: {
      position: 'absolute',
      right: 50,
      top: 30
    },
    footer:{
        backgroundColor:"blue",
        width:"100%"
        
      }
  });