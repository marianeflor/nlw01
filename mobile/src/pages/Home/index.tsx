import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, Image, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select'

import axios from 'axios'

interface IBGEUFResponse {
  sigla: string
}

interface IBGECityResponse {
  nome: string
}

const Home = () => {

  const [text, setText] = useState('') // teste com inpute escrito
  const [ufs, setUfs] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [selectedUF, setSelectedUF] = useState('0')
  const [selectedCity, setSelectedCity] = useState('0')

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
        const ufInitials = response.data.map(uf => uf.sigla)
        setUfs(ufInitials.sort())
    })    
  }, [])

  useEffect(() => {
    if(selectedUF === '0') return

    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`).then(response => {
        const citiesNames = response.data.map(city => city.nome)
        setCities(citiesNames)
    })
    
  }, [selectedUF])

  const navigation = useNavigation()

  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      uf: selectedUF,
      city: selectedCity
    })
  }

  function handleSelectedUF(value: string){
    setSelectedUF(value)
  }

  function handleSelectedCity(value: string){
    setSelectedCity(value)
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ImageBackground 
        source={require('../../assets/home-background.png')}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <View>
            <Text style={styles.title}>Seu marketplace de coleta de resíduos.</Text>
            <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
          </View>
        </View>

        <View style={styles.input}>
          <Text style={styles.inputText}>Selecione um Estado</Text>
          <RNPickerSelect       
            value={selectedUF}
            onValueChange={(value) => handleSelectedUF(value)}
            items={ufs.map(uf => {
              return {label: uf, value: uf}
            })}
          />
        </View>
        <View style={styles.input}>
        <Text style={styles.inputText}>Selecione uma Cidade</Text>
          <RNPickerSelect       
            value={selectedCity}
            onValueChange={(value) => handleSelectedCity(value)}
            items={cities.map(city => {
              return {label: city, value: city}
            })}
          />
        </View>

        <View style={styles.footer}>
          <TextInput 
            style={styles.input} 
            placeholder="Teste" 
            value={text}
            onChangeText={setText}
          />
        </View>

        <View style={styles.footer}>
          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Feather name='arrow-right' color='#FFF' size={24} />
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
    
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  inputText: {
    color: '#6C6C80',
    fontFamily: 'Roboto_400Regular',
    fontSize: 12,
    marginTop: 3,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});