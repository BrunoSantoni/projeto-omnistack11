import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';


export default StyleSheet.create({
  container: {
    flex: 1, //Fará ocupar a tela toda
    paddingHorizontal: 24, //Adiciona um padding só nas laterais, mesma coisa que fazer padding: 0 24 na web
    paddingTop: Constants.statusBarHeight + 20,
  },

  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  cabecalhoTexto: {
    fontSize: 15,
    color: '#737380'
  },

  cabecalhoTextoNegrito: {
    fontWeight: 'bold'
  },

  titulo: {
    fontSize: 30,
    marginBottom: 16,
    marginTop: 48,
    color: '#13131a',
    fontWeight: 'bold'
  },

  descricao: {
    fontSize: 16,
    lineHeight: 24,
    color: '#737380'
  },

  listaCasos: {
    marginTop: 32,
  },

  caso: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 16
  },

  casoPropriedade: {
    fontSize: 14,
    color: '#41414D',
    fontWeight: 'bold'
  },
  
  casoValor: {
    marginTop: 8,
    fontSize: 15,
    marginBottom: 24,
    color: '#737380'
  },

  btnDetalhes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  btnDetalhesTexto: {
    color: '#E02041',
    fontSize: 15,
    fontWeight: 'bold'
  }
});