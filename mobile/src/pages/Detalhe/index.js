import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';

import logoImg from '../../assets/logo.png';

export default function Detalhe() {
  const navegacao = useNavigation();
  const route = useRoute();

  const caso = route.params.caso;

  const mensagem = `Olá ${caso.nome}, estou entrando em contato pois gostaria de ajudar no caso "${caso.titulo}"` +
   ` com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(caso.valor)}`;

  function voltarParaCasos() {
    navegacao.goBack();
  }

  function enviarEmail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${caso.titulo}`,
      recipients: [caso.email],
      body: mensagem
    })
  }

  function enviarZap() {
    Linking.openURL(`whatsapp://send?phone=${caso.whatsapp}&text=${mensagem}`);
  }

  return(
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={voltarParaCasos}>
          <Feather name="arrow-left" size={28} color="#E02041" />
      </TouchableOpacity>  

        <Image source={logoImg}/>      
      </View>

      <View style={styles.caso}>
          <Text style={[styles.casoPropriedade, { marginTop: 0 }]}>CASO:</Text>
          <Text style={styles.casoValor}>{caso.titulo}</Text>
          
          <Text style={styles.casoPropriedade}>ONG:</Text>
          <Text style={styles.casoValor}>{caso.nome} de {caso.cidade}/{caso.estado}</Text>
        

        <Text style={styles.casoPropriedade}>DESCRIÇÃO:</Text>
        <Text style={styles.casoValor}>{caso.descricao}</Text>

        <Text style={styles.casoPropriedade}>VALOR:</Text>
        <Text style={styles.casoValor}>
          {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(caso.valor)}
        </Text>
      </View>

      <View style={styles.contatoBox}>
        <Text style={styles.heroiTitulo}>Salve o dia!</Text>
        <Text style={styles.heroiTitulo}>Seja o herói desse caso.</Text>

        <Text style={styles.heroiContato}>Entre em contato:</Text>

        <View style={styles.acoes}>
          <TouchableOpacity style={styles.acao} onPress={enviarZap}>
            <Text style={styles.acaoTexto}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acao} onPress={enviarEmail}>
            <Text style={styles.acaoTexto}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}