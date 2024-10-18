import { createStackNavigator } from '@react-navigation/stack';
import RecipeBook from '../BottomMenu/RecipeBook';
import RecipeDetail from '../RecipeDetail';
import UsersTopics from '../UsersTopics';

const Stack = createStackNavigator();

export default function RecipeBookRoute() {
  return (
    <Stack.Navigator screenOptions={{
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      headerShown: false,
    }}>
      <Stack.Screen name="RecipeBookScreen" component={RecipeBook} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
      <Stack.Screen name="UsersTopics" component={UsersTopics} />
    </Stack.Navigator>
  );
}
