import { createStackNavigator } from '@react-navigation/stack';
import MainMenu from '../BottomMenu/MainMenu';
import About from '../About';
import Results from '../Results';
import TopicSelectionScreen from '../TopicSelectionScreen';
import TrueFalseQuiz from '../TrueFalseQuiz';
import { CoinContext } from '../../CoinProvider';
import { useContext, useState } from 'react';
import QuizModal from '../QuizModal';
import QuizSelectionScreen from '../QuizSelectionScreen';
import ProfileScreen from '../ProfileScreen';

const Stack = createStackNavigator();

export default function MainMenuRoute() {
  const { totalCoins, setTotalCoins } = useContext(CoinContext); // Access coins from context
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleStartQuiz = (topic) => {
    setSelectedTopic(topic);
    setModalVisible(true);
  };

  const handleQuizCompletion = async (pointsEarned) => {
    // console.log(`Points earned: ${pointsEarned}`);  // Log the points earned
    const newTotalCoins = totalCoins + pointsEarned; // Calculate new total coins
    setTotalCoins(newTotalCoins); // Use context to update coins
    // console.log(`Total coins now: ${newTotalCoins}`);
  };

  const handleCloseQuizModal = () => {
    setModalVisible(false);
  };

  return (
    <>
    <Stack.Navigator screenOptions={{
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      headerShown: false,
    }}>
      <Stack.Screen name="MainMenuScreen" component={MainMenu} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="QuizSelectionScreen" component={QuizSelectionScreen} />
      <Stack.Screen name="TopicSelectionScreen"> 
        {props => <TopicSelectionScreen {...props} onStartQuiz={handleStartQuiz} />} 
      </Stack.Screen>
      <Stack.Screen name="Results" component={Results} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="TrueFalseQuiz" component={TrueFalseQuiz} />
      <Stack.Screen name="QuizModal" component={QuizModal} />
      {/* <Stack.Screen 
      name="QuizModal" 
      component={QuizModal} 
      options={{
        tabBarButton: () => null,  // This ensures it doesn't show up in the tab bar
      }}
      /> */}

    </Stack.Navigator>
  {isModalVisible && (
  <QuizModal 
    isVisible={isModalVisible} 
    selectedTopic={selectedTopic} 
    onClose={handleCloseQuizModal}
    onComplete={handleQuizCompletion} 
  />
)}
</>
  );
}
