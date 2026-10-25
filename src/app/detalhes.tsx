import {Text, StyleSheet, View, Image, ScrollView} from 'react-native';
import {useLocalSearchParams} from 'expo-router';

export default function Detalhes(){
    const {nome, imagem, instrucoes} = useLocalSearchParams<{
        nome: string;
        imagem: string;
        instrucoes: string;
    }>();

    return (
        <ScrollView style={styles.body} contentContainerStyle={styles.conteudo}>
        <Text style={styles.titulo}>{nome}</Text>
        <Image source={{ uri: imagem }} style={styles.imagem} />

        <View style={styles.caixa}>
            <Text style={styles.subtitulo}>Modo de preparo</Text>
            <Text style={styles.instrucoes}>{instrucoes}</Text>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#fcb27d',
        flex: 1,
    },
    conteudo: {
        alignItems: 'center',
        paddingBottom: 40,
    },
    titulo: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fae7d9',
        textAlign: 'center',
        padding: 20,
    },
    imagem: {
        width: 300,
        height: 300,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#ff7f23',
    },
    caixa: {
        backgroundColor: '#fae7d9',
        borderRadius: 20,
        padding: 20,
        marginTop: 20,
        width: '90%',
        maxWidth: 800,
    },
    subtitulo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ff7f23',
        marginBottom: 10,
    },
    instrucoes: {
        fontSize: 16,
        lineHeight: 24,
    },
})