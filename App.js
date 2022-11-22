import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
} from 'react-native';

import api from './src/services/api';

export default function App() {
  const [cep, setCep] = useState('');
  const [cepUser, setCepUser] = useState(null);

  const inputRef = useRef(null);

  async function buscar() {
    if (cep == '') {
      alert('Digite um cep valido');
      return;
    }

    try {
      const response = await api.get(`${cep}/json`);
      Keyboard.dismiss();
      setCepUser(response.data);
    } catch (error) {
      console.log('ERRO' + error);
    }
  }

  function limpar() {
    setCep('');
    inputRef.current.focus();
    setCepUser(null);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.texto}>Digite o cep desejado</Text>
        <TextInput
          style={styles.input}
          placeholder="00000000"
          value={cep}
          onChangeText={cep => setCep(cep)}
          keyboardType="numeric"
          ref={inputRef}
        />
      </View>

      <View style={styles.areaBtn}>
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: '#1d75cd'}]}
          onPress={buscar}>
          <Text style={styles.btnText}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, {backgroundColor: '#cd3e1d'}]}
          onPress={limpar}>
          <Text style={styles.btnText}>Limpar</Text>
        </TouchableOpacity>
      </View>
      {cepUser && (
        <View style={styles.resultado}>
          <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
          <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
          <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
          <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
          <Text style={styles.itemText}>UF: {cepUser.uf}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    marginTop: 25,
    marginBottom: 25,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width: 300,
    padding: 10,
    fontSize: 18,
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',
  },
  btn: {
    height: 50,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 5,
    margin: 30,
  },
  btnText: {
    fontSize: 16,
    color: '#fff',
  },
  resultado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 22,
  },
});
