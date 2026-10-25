import {Text, StyleSheet, View, FlatList, TextInput, TouchableOpacity, Image} from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import {useRouter} from 'expo-router';

export default function Receitas(){
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');
  const router = useRouter();

  const RequestApi = async () => {
    setTimeout(() => {
      axios.get(`https://themealdb.com/api/json/v1/1/search.php?s=${busca}`).then((res) => {
        console.log("Resposta da API:", res.data.meals);
        setValue(res.data.meals);
      }).finally(() => {
        setLoading(false);
      })
    }, 3000);
  }

  const abrirDetalhes = (item: any) => {
    router.push({
      pathname: '/detalhes',
      params: {
        nome: item.strMeal,
        imagem: item.strMealThumb,
        instrucoes: item.strInstructions,
      },
    });
  }

  return (
    <View style={styles.body}>
      <Text style={styles.titulo}>Index de Receitas</Text>
      <TextInput style={styles.pesquisa}
        value={busca}
        onChangeText={setBusca} 
        placeholder="Digite a receita..."/>
      <TouchableOpacity onPress={RequestApi} style={styles.button}>
        <Text style={styles.buttonText}>Buscar Receita</Text>
      </TouchableOpacity>
      <FlatList 
        data={value}
        numColumns={5}
        keyExtractor={(item) => item.idMeal}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.card} onPress={() => abrirDetalhes(item)}>
            <Image source={{ uri: item.strMealThumb }} style={styles.imagem} />
            <Text style={styles.nome}>{item.strMeal}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fcb27d',
    flex: 1
  },
  titulo:{
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fae7d9',
    textAlign: 'center',
    padding: 20,
  },
  pesquisa:{
    borderWidth: 3,
    borderColor: '#ff7f23',
    borderRadius: 30,
    backgroundColor: '#fae7d9',
    width: 750,
    height: 50,
    alignSelf: 'center',
    fontSize: 30,
    textAlign: 'center',
  },
  button:{
    backgroundColor: '#fae7d9',
    width: 200,
    height: 50,
    alignSelf: 'center',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#ff7f23',
    marginBottom: 20,
  },
  buttonText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff7f23',
  },
  card:{
    backgroundColor: '#fae7d9',
    width: 200,
    height: 200,
    borderRadius: 20,
  },
  imagem:{
    width: 120,
    height: 120,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  nome:{
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  }
})