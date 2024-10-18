import 'react-native-gesture-handler';
import 'react-native-reanimated'
import { AppRegistry } from 'react-native';
import App from './App';  // Ensure the path to App.js is correct
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
