import { ScreenContent } from '@shared';
import { StyleSheet, Text, View } from 'react-native';

export function HomeWidget() {
  return (
    <ScreenContent title="Home" path="app/index.tsx">
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Expo Router + FSD!</Text>
        <Text style={styles.description}>
          This is a widget component that combines features and entities.
        </Text>
      </View>
    </ScreenContent>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
});
