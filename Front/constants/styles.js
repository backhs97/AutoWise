import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 20, backgroundColor: '#ffffff'
    },
    title: {
        fontSize: 30, fontWeight: 'bold', color: '#FF5B00', textAlign: 'center', marginVertical: 30
    },
    headerText: {
        fontSize: 20, fontWeight: 'bold', paddingVertical: 10
    },
    searchInput: {
        height: 40, backgroundColor: '#F2F2F2', borderRadius: 20, padding: 10, fontSize: 16
    }
})

export default styles;