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
  backgroundColor:'#fff',
  borderRadius:10,
   width:'100%',
   marginVertical:2,
   height:45,
 },
 chat:{
  // backgroundColor:'red',
  flexDirection:'row',
  height:40,
  justifyContent:'space-between',
  // marginTop:2
},
error:{
  // backgroundColor:'red',
  flexDirection:'row',
  height:40,
  borderRadius:10,
  justifyContent:'space-between',
  backgroundColor:"#ef3434"
  // marginTop:2
},
  naodefinido:{
    backgroundColor: "#2A2E30",
    flexDirection:'row',
    height:40,
    borderRadius:10,
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
 Id:{
  width:40,
  height:40,
  borderRadius:30,
  backgroundColor:'#5e0808',
  alignItems:'center',
  justifyContent:'center'
 },
 icone:{
fontSize:25,
color:'#fff'
 },
 nome:{
  fontSize:18,
  fontWeight:"600",
  color:"black"
 },
 container_nome:{
  // backgroundColor:'green',
  width:'80%',
 },
 nome_naodefido:{
  fontSize:18,
  fontWeight:"600",
  color:"white"

 },
 bar:{
  width:"100%",
  height:2,
  backgroundColor:"#666",
  marginVertical:2,
  borderRadius:10,
},
preto:{
  color:"black"
},
branco:{
  color:"white"
}
});
