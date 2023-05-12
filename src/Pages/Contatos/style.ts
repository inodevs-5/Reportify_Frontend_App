import { StyleSheet } from 'react-native';

export default StyleSheet.create({
 container:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
 },
 
 titulo:{
   color:'black',
   fontWeight:'800',
   fontSize:20
 },
 containermensagens:{
   flex:.85,
   width:'86%',
   alignItems:'center',
},
scroll:{
   width:'100%',
  //  backgroundColor: 'blue'
},
 containerchat:{
  backgroundColor:'##EFF0F3',
  borderRadius:10,
   width:'100%',
   marginVertical:5,
   height:45,
 },
 chat:{
  // backgroundColor:'red',
  flexDirection:'row',
  height:40,
  justifyContent:'space-between'
},
 containerIcone:{
  width:40,
  height:40,
  borderRadius:30,
  backgroundColor:'#72A2FA',
  alignItems:'center',
  justifyContent:'center'
 },
 icone:{
fontSize:25,
color:'#fff'
 },
 nome:{
  fontSize:18,
  fontWeight:"600"
 },
 container_nome:{
  // backgroundColor:'green',
  width:'80%',
 },
 bar:{
  width:"100%",
  height:2,
  backgroundColor:"#666",
  marginVertical:2,
  borderRadius:10,
}
});