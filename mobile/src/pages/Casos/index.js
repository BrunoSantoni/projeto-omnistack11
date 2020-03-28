import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import styles from './styles';
import api from '../../services/api';

import logoImg from '../../assets/logo.png';
//Importa automaticamente a logo no melhor formato de acordo com a tela.

export default function Casos() {
  const [casos, setCasos] = useState([]);
  const [total, setTotal] = useState(0);
  const [pagina, setPagina] = useState(1); //Começa na página 1
  const [loading, setLoading] = useState(false);

  const navegacao = useNavigation();

  function navegarParaDetalhes(caso) {
    navegacao.navigate('Detalhe', { caso });
  }

  async function carregaCasos() {
    if(loading) {
      return;
    } //Se já estiver carregando, não precisa carregar novamente

    if(total > 0 && casos.length === total) {
      return;
    }

    setLoading(true);

    const response = await api.get('casos', {
      params: { pagina }
    });
    
    setCasos([... casos, ...response.data]);
    //Anexando dois vetores dentro de um, pegou tudo o que tem em casos e tudo que tem em response.
    setTotal(response.headers['x-total-count']);
    setPagina(pagina + 1);
    setLoading(false);
  }

  useEffect(() => {
    carregaCasos();
  }, [])
  return(
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Image source={logoImg} />
        <Text style={styles.cabecalhoTexto}>
          Total de <Text style={styles.cabecalhoTextoNegrito}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.titulo}>Bem-Vindo!</Text>
      <Text style={styles.descricao}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList
        style={styles.listaCasos}
        data={casos}
        keyExtractor={caso => String(caso.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={carregaCasos}
        onEndReachedThreshold={0.2}
        renderItem={({ item: caso }) => (
          <View style={styles.caso}>
            <Text style={styles.casoPropriedade}>ONG:</Text>
        <Text style={styles.casoValor}>{caso.nome}</Text>

            <Text style={styles.casoPropriedade}>CASO:</Text>
            <Text style={styles.casoValor}>{caso.titulo}</Text>

            <Text style={styles.casoPropriedade}>VALOR:</Text>
            <Text style={styles.casoValor}>
              {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(caso.valor)}
            </Text>

            <TouchableOpacity
              style={styles.btnDetalhes}
              onPress={() => navegarParaDetalhes(caso)}
            >
              <Text style={styles.btnDetalhesTexto}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}