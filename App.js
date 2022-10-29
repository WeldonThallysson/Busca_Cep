import React,{useState,useRef} from "react";
import { View,Text,StyleSheet,Image,TextInput,TouchableOpacity,Keyboard } from "react-native";
import api from "./src/services/api";


export default function App(){
 
   const [cep,setCep] = useState('');
   const [requisicao,setRequisicao] = useState(null)
   const inputRef = useRef(null);
   


   async function Buscar(){
         if(cep == ''){
            alert('Digite o Cep')
            setCep('');
            return;
         } 

         try{
          const response = await api.get(`/${cep}/json`)
          setRequisicao(response.data)
          console.log(response.data)

          Keyboard.dismiss()

         }catch(error){
          console.log('erro:' + error)
         }
        
         
   }

   function limpar(){
    setCep('')
    inputRef.current.focus()
   }

  return(

    
   <View style={Estilos.ConteinerPrincipal}>
    {/* area do resultado */}
      <View style={{alignItems: 'center'}}>
      <Image source={{uri: 'https://buscameucep.com.br/app/assets/img/logo-cep.png'}} style={{width: 270,height: 48}}/>
      </View>
     <Text style={{fontSize: 22, margin: 15,fontWeight: 'bold'}}>Busca Cep</Text>

     <TextInput 
     placeholder="Ex 8960000"  
     value={cep} 
     keyboardType="numeric" 
     onChangeText={(texto) => setCep(texto)} 
     style={Estilos.input}
     ref={inputRef}
     />

     <View style={Estilos.areaBtn}>
      <TouchableOpacity onPress={() => {Buscar()}} style={[Estilos.Botao,{backgroundColor: '#1d75cd'}]}>
        <Text style={Estilos.txtBtn}>Buscar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {limpar()}}style={[Estilos.Botao,{backgroundColor: 'red'}]}>
        <Text style={Estilos.txtBtn}>Limpar</Text>
      </TouchableOpacity>
     </View>
     
      {/* area do resultado */}
     

    {requisicao &&  <View style={Estilos.areaResultado}>
        <Text style={Estilos.txtResultado}>CEP:{requisicao.cep}</Text>
        <Text style={Estilos.txtResultado}>ESTADO:{requisicao.uf}</Text>
        <Text style={Estilos.txtResultado}>CIDADE:{requisicao.localidade}</Text>
        <Text style={Estilos.txtResultado}>BAIRRO:{requisicao.logradouro}</Text>
      </View>
}
     
   </View> 


  )
}


const Estilos = StyleSheet.create({
     ConteinerPrincipal:{
      flex: 1,
      marginTop: '30%'
     },
     texto: {
      marginTop: 15,
      marginBottom: 25,
      fontWeight: 'bold',
      fontSize: 25,

     },
     input:{
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#DDD',
      borderRadius: 5,
      width: '90%',
      padding:10,
      margin: 10,
            fontSize: 18
     },
     areaBtn:{
      flexDirection: 'row',
      alignItems: 'center',
      margin: 10,
      justifyContent: 'space-around'
    },
    Botao:{
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15,
      borderRadius: 5,
    
    },
    txtBtn:{
      fontSize: 22,
      color: 'white'
      
    },
    areaResultado:{
      flex: 1,
      justifyContent:'center',
      alignItems: 'center'
    },
    txtResultado:{
      fontSize: 22,
    }
})