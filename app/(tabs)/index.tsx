import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ViewStyle,
  ImageStyle,
} from "react-native";

// Definição da interface para a pessoa
interface Pessoa {
  nome: string;
  idade: number;
  cidade: string;
  avatar: any; // Usei 'any' porque o caminho do require não é validado como um tipo específico
}

const pessoa: Pessoa = {
  nome: "Raphael",
  idade: 40,
  cidade: "Rio de Janeiro",
  avatar: require("../../assets/img/icon.png"),
};

// Função para retornar a saudação com base na hora atual
function getHora(): string {
  const horaAtual = new Date().getHours();

  if (horaAtual >= 5 && horaAtual < 12) {
    return "Bom dia";
  } else if (horaAtual >= 12 && horaAtual < 18) {
    return "Boa tarde";
  } else {
    return "Boa noite";
  }
}

// Definição das props para SaudacaoPersonalizada
interface SaudacaoPersonalizadaProps {
  saudacao?: string;
  nome?: string;
  style?: ViewStyle | ViewStyle[];
}

// Componente SaudacaoPersonalizada com tipagem TypeScript
const SaudacaoPersonalizada: React.FC<SaudacaoPersonalizadaProps> = ({
  saudacao = "Olá",
  nome = "Usuário",
  style,
}) => {
  return (
    <View style={[styles.saudacaoContainer, style]}>
      <Text>
        {saudacao}, {nome}!
      </Text>
    </View>
  );
};

// Definição das props para ExibirPessoa
interface ExibirPessoaProps {
  nome: string;
  idade: number;
  cidade: string;
}

// Componente ExibirPessoa com tipagem TypeScript
const ExibirPessoa: React.FC<ExibirPessoaProps> = ({ nome, idade, cidade }) => {
  return (
    <View style={styles.container}>
      <Image source={pessoa.avatar} style={styles.avatar} />
      <Text>Nome: {nome}</Text>
      <Text>Idade: {idade}</Text>
      <Text>Cidade: {cidade}</Text>
    </View>
  );
};

// Componente principal do aplicativo
const App: React.FC = () => {
  const [saudacao, setSaudacao] = useState<string>("");

  useEffect(() => {
    setSaudacao(getHora());
  }, []);

  return (
    <View style={styles.appContainer}>
      <SaudacaoPersonalizada
        saudacao={saudacao}
        nome={pessoa.nome}
        style={styles.saudacaoPersonalizada}
      />
      <ExibirPessoa {...pessoa} />
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  saudacaoContainer: {
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
  } as ViewStyle,
  saudacaoPersonalizada: {
    backgroundColor: "lightblue",
    padding: 10,
  } as ViewStyle,
  container: {
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  } as ImageStyle,
});

export default App;
