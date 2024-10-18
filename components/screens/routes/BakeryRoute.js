import { createStackNavigator } from '@react-navigation/stack';
import Bakery from '../BottomMenu/Bakery';

const Stack = createStackNavigator();

export default function BakeryRoute() {
  return (
    <Stack.Navigator screenOptions={{
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      headerShown: false,
    }}>
      <Stack.Screen name="BakeryScreen" component={Bakery} />
    </Stack.Navigator>
  );
}
