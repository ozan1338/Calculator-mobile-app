import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CalculatorScreen from './src/screens/CalculatorScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CalculatorScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA0A0',
  },
});
