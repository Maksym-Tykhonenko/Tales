import { createStackNavigator } from '@react-navigation/stack';
import Magazine from '../BottomMenu/Magazine';
import UsersContent from '../UsersContent';

const Stack = createStackNavigator();

export default function MagazineRoute() {
  return (
    <Stack.Navigator screenOptions={{
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      headerShown: false,
    }}>
      <Stack.Screen name="MagazineScreen" component={Magazine} />
      <Stack.Screen name="UsersContent" component={UsersContent} />
    </Stack.Navigator>
  );
}
