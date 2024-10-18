import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Modal, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { CoinContext } from '../CoinProvider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const topicsForHard = [
    {
      id: '1',
      name: "Sweet Legends",
      questions: [
        { question: "The legend of the golden chocolate claims it brings wealth.", answer: "true" },
        { question: "According to myth, candy trees only grow in Scandinavia.", answer: "false" },
        { question: "The legend of the magic chocolate fountain says it grants one wish.", answer: "true" },
        { question: "In Mayan myths, chocolate was considered a gift from the gods.", answer: "true" },
        { question: "In ancient times, eating sugar was believed to prolong life.", answer: "false" },
        { question: "The tale of the Candy Kingdom is connected to real historical events.", answer: "false" },
        { question: "The legend of sweet stars promises luck if eaten at midnight.", answer: "true" },
        { question: "Gold candies always brought luck in ancient Chinese mythology.", answer: "false" },
        { question: "The story of sugar caves is associated with Ancient Rome.", answer: "false" },
        { question: "In one Egyptian legend, sweets were used in burial rituals.", answer: "true" }
      ]
    },
    {
      id: '2',
      name: "History of Chocolate",
      questions: [
        { question: "Chocolate was first used by the Aztecs as a ceremonial drink.", answer: "true" },
        { question: "Chocolate first appeared in Europe in the 19th century.", answer: "false" },
        { question: "The first chocolate bars were made in Spain.", answer: "false" },
        { question: "Chocolate drinks were used in Mayan religious ceremonies.", answer: "true" },
        { question: "In the 18th century, chocolate was considered a medicinal remedy.", answer: "true" },
        { question: "White chocolate was invented in the USA.", answer: "false" },
        { question: "Chocolate candies were first created in China.", answer: "false" },
        { question: "Cocoa beans were used as currency in the Aztec civilization.", answer: "true" },
        { question: "The first chocolate ice cream was made in Italy.", answer: "true" },
        { question: "Dark chocolate appeared earlier than milk chocolate.", answer: "true" }
      ]
    },
    {
      id: '3',
      name: "Sweet Traditions",
      questions: [
        { question: "In Greece, honey-based sweets are traditionally made for Easter.", answer: "true" },
        { question: "In Spain, pancakes are traditionally prepared for Christmas.", answer: "false" },
        { question: "In Japan, Valentine's Day is celebrated with sweet pies.", answer: "false" },
        { question: "In Mexico, sugar skulls are made for Halloween.", answer: "true" },
        { question: "In Italy, New Year's sweets symbolize wealth.", answer: "true" },
        { question: "In India, sweets are distributed at weddings for good luck.", answer: "true" },
        { question: "In France, pancakes are made for Shrove Tuesday.", answer: "false" },
        { question: "In China, sweet dumplings are served on New Year's for luck.", answer: "true" },
        { question: "In Argentina, chocolate eggs are prepared for Christmas.", answer: "false" },
        { question: "In Iran, rose-flavored sweets are served at weddings.", answer: "true" }
      ]
    },
    {
      id: '4',
      name: "Sweet Omens",
      questions: [
        { question: "In Chinese culture, sweets can predict the future.", answer: "true" },
        { question: "In Ancient Rome, candies were considered a sign of wealth.", answer: "false" },
        { question: "In some cultures, eating chocolate at night is believed to bring bad luck.", answer: "false" },
        { question: "Horseshoe-shaped candies bring good luck in Europe.", answer: "true" },
        { question: "In India, sweets symbolize an upcoming marriage.", answer: "true" },
        { question: "In Western cultures, dark chocolate is believed to ward off evil spirits.", answer: "false" },
        { question: "In ancient Mayan culture, eating sweets could bring luck in trade.", answer: "true" },
        { question: "Sweet pies at weddings predict longevity.", answer: "true" },
        { question: "In Tibet, it is believed that sugar can ward off evil spirits.", answer: "true" },
        { question: "Honey candies always brought good luck in Ancient Greece.", answer: "false" }
      ]
    },
    {
      id: '5',
      name: "Lucky Ingredients",
      questions: [
        { question: "Honey is traditionally considered a symbol of prosperity.", answer: "true" },
        { question: "Chocolate was always seen as a 'lucky ingredient' in Aztec culture.", answer: "true" },
        { question: "In Italy, wine is added to sweets for good fortune.", answer: "false" },
        { question: "Cinnamon in Europe symbolizes happiness and health.", answer: "true" },
        { question: "Almonds were recognized as a 'lucky' ingredient in Ancient Egypt.", answer: "true" },
        { question: "In Japan, rice sweets symbolize money and luck.", answer: "true" },
        { question: "In India, saffron is considered a bad omen.", answer: "false" },
        { question: "Coconut is used in rituals for luck in Indonesia.", answer: "true" },
        { question: "Honey in Africa symbolizes long life and health.", answer: "true" },
        { question: "Dark chocolate always brings bad luck in Latin America.", answer: "false" }
      ]
    },
    {
      id: '6',
      name: "Sweet Rituals",
      questions: [
        { question: "In India, there is a tradition of distributing sweets before important events.", answer: "true" },
        { question: "In Cuba, sweets do not play a significant role in religious rituals.", answer: "false" },
        { question: "In Mexico, sugar skulls are served during Day of the Dead.", answer: "true" },
        { question: "In Tibet, sweets are only served at funerals.", answer: "false" },
        { question: "In Italy, there is a tradition of eating pies at weddings for luck.", answer: "true" },
        { question: "In China, sweets are given at housewarmings for good fortune.", answer: "true" },
        { question: "In Brazil, sweet bread with nuts is traditionally baked for Christmas.", answer: "true" },
        { question: "In Africa, sugar is used in rituals to attract health.", answer: "true" },
        { question: "In Thailand, sweets play an important part in funeral ceremonies.", answer: "false" },
        { question: "In France, chocolates are given at Easter as a symbol of happiness.", answer: "true" }
      ]
    },
    {
      id: '7',
      name: "Stories of Hidden Sweets",
      questions: [
        { question: "In England, there was a tradition of hiding sweets in Christmas gifts.", answer: "true" },
        { question: "In Ancient Egypt, sweets were hidden in tombs for the deceased.", answer: "true" },
        { question: "In Ancient Greece, coins were hidden in pies to bring luck.", answer: "false" },
        { question: "In Russia, sweets were hidden in pancakes for Maslenitsa.", answer: "false" },
        { question: "In China, sweets were hidden in New Year's decorations.", answer: "true" },
        { question: "In Germany, there is a tradition of hiding chocolate eggs at Easter.", answer: "true" },
        { question: "In Japan, sweets are hidden in rice cakes at weddings.", answer: "false" },
        { question: "In Italy, sweets are hidden in stockings for Christmas.", answer: "true" },
        { question: "In France, chocolates are hidden in flowers for Valentine's Day.", answer: "true" },
        { question: "In India, sweets are hidden in lotus leaves to attract good luck.", answer: "true" }
      ]
    },
    {
      id: '8',
      name: "Sweet Symbols",
      questions: [
        { question: "In Europe, honey symbolizes longevity and prosperity.", answer: "true" },
        { question: "In China, rice sweets symbolize poverty.", answer: "false" },
        { question: "In Latin America, chocolate is a symbol of passion and love.", answer: "true" },
        { question: "In Greece, bird-shaped candies symbolize freedom.", answer: "false" },
        { question: "In Africa, sweets symbolize happiness and fertility.", answer: "true" },
        { question: "In Tibet, sugar can represent wealth in Buddhist traditions.", answer: "true" },
        { question: "In India, saffron sweets represent royalty and power.", answer: "true" },
        { question: "In Mexico, cacao seeds are symbols of death.", answer: "false" },
        { question: "In Japan, sweet rice cakes represent new beginnings.", answer: "true" },
        { question: "In Scandinavia, sweets have no symbolic meaning in folklore.", answer: "false" }
      ]
    },
    {
      id: '9',
      name: "Sweet Discoveries",
      questions: [
        { question: "Sugarcane was first cultivated in South America.", answer: "false" },
        { question: "The process of refining sugar was discovered by the Arabs.", answer: "true" },
        { question: "Chocolate was first introduced to Europe by Christopher Columbus.", answer: "false" },
        { question: "The discovery of vanilla as a sweet flavoring originated in Mexico.", answer: "true" },
        { question: "Candy making was a secret art in Ancient China.", answer: "false" },
        { question: "The Swiss are credited with inventing milk chocolate.", answer: "true" },
        { question: "Ice cream was first invented in Ancient Rome.", answer: "false" },
        { question: "The cultivation of cocoa for chocolate production began in Africa.", answer: "false" },
        { question: "Chewing gum originated in North America.", answer: "true" },
        { question: "The use of sugar in baking spread through Europe in the Middle Ages.", answer: "true" }
      ]
    },
    {
      id: '10',
      name: "Famous Sweet Inventions",
      questions: [
        { question: "The chocolate chip cookie was invented in the 18th century.", answer: "false" },
        { question: "The doughnut hole was invented in the USA.", answer: "true" },
        { question: "Cotton candy was originally called 'fairy floss'.", answer: "true" },
        { question: "Gummy bears were first made in France.", answer: "false" },
        { question: "The first candy cane was invented in Germany.", answer: "true" },
        { question: "Ice cream cones were first introduced at the Paris World Fair.", answer: "false" },
        { question: "Jelly beans were originally made as Easter candies.", answer: "true" },
        { question: "Chocolate truffles were invented in Belgium.", answer: "false" },
        { question: "The lollipop was named after a racehorse.", answer: "true" },
        { question: "Marshmallows were originally made from a plant extract.", answer: "true" }
      ]
    }
  ];
  

export default function TrueFalseQuiz({ navigation }) {
    const { totalCoins, setTotalCoins } = useContext(CoinContext);
    const [currentTopic, setCurrentTopic] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(60); // 1 minute
    const [isModalVisible, setModalVisible] = useState(false);
    const [topicName, setTopicName] = useState('');
    const [consecutiveCorrectAnswers, setConsecutiveCorrectAnswers] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null); // Track selected answer
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false); // Track if answer is correct
    const [isPaused, setIsPaused] = useState(false); // For pause functionality

    useEffect(() => {
        // Initialize the quiz - this runs only once on component mount
        const randomIndex = Math.floor(Math.random() * topicsForHard.length);
        const selectedTopic = topicsForHard[randomIndex];
        setCurrentTopic(selectedTopic);
        setTopicName(selectedTopic.name);
        setQuestions(shuffleArray(selectedTopic.questions));
        setCurrentQuestionIndex(0);
        setScore(0);
        setConsecutiveCorrectAnswers(0);
        setTimer(20);
    }, []); // Empty dependency array ensures this runs only once

    useEffect(() => {
        // Timer functionality - starts/stops based on isPaused state
        if (!isPaused) {
            const timerId = setInterval(() => {
                setTimer(prevTimer => {
                    if (prevTimer <= 1) {
                        clearInterval(timerId);
                        setModalVisible(true);
                        return 0; // Stop the timer when it reaches 0
                    }
                    return prevTimer - 1;
                });
            }, 1000);

            return () => clearInterval(timerId); // Cleanup interval on unmount
        }
    }, [isPaused]); // This effect only reruns when isPaused changes

    // Shuffle array function
    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

    // Handle answer selection
    const handleAnswer = (answer) => {
        setSelectedAnswer(answer);
        const currentQuestion = questions[currentQuestionIndex];

        if (answer === currentQuestion.answer) {
            setScore(prevScore => prevScore + 1);
            setIsAnswerCorrect(true);
            setConsecutiveCorrectAnswers(prevCount => prevCount + 1);

            if (consecutiveCorrectAnswers + 1 === 2) {
                setTimer(prevTimer => prevTimer + 10); // Add 30 seconds for 2 correct answers
                setConsecutiveCorrectAnswers(0); // Reset consecutive counter
            }
        } else {
            setIsAnswerCorrect(false);
            setConsecutiveCorrectAnswers(0); // Reset if wrong answer
        }

        // Move to next question or end quiz
        if (currentQuestionIndex + 1 < questions.length) {
            setTimeout(() => {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
                setSelectedAnswer(null); // Reset after moving to the next question
            }, 1000);
        } else {
            setModalVisible(true);
        }
    };

    // Handle Pause functionality
    const handlePauseToggle = () => {
        setIsPaused(!isPaused);
    };

    // Handle Modal close and reset quiz
    const handleModalClose = () => {
        // Shuffle and set a new topic
        const randomIndex = Math.floor(Math.random() * topicsForHard.length);
        const selectedTopic = topicsForHard[randomIndex];

        // Reset the state for the new quiz
        setCurrentTopic(selectedTopic);
        setTopicName(selectedTopic.name);
        setQuestions(shuffleArray(selectedTopic.questions));
        setCurrentQuestionIndex(0);
        setScore(0);
        setConsecutiveCorrectAnswers(0);
        setTimer(20); // Reset timer to 60 seconds
        setSelectedAnswer(null); // Reset selected answer
        setIsAnswerCorrect(false); // Reset answer correctness status

        // Add coins based on the previous score before reset
        setTotalCoins(totalCoins + score * 100); // Award coins for correct answers

        setIsPaused(true);
        // Hide the modal and restart the quiz
        setModalVisible(false);

        navigation.navigate('TrueFalseQuiz');
    };

    return (
            <ImageBackground 
                source={require('../../assets/images/bcgr.jpeg')} // Background image
                style={styles.container}
                blurRadius={3}
            >
            {currentTopic && (
                <>
                    <View style={styles.infoContainer}>
                      {/* Coins */}
                      <View style={styles.coinContainer}>
                        <Image 
                          source={require('../../assets/images/coin.png')} // Replace with your coin image
                          style={styles.coinImage}
                        />
                        <Text style={styles.coinText}>{score * 100}</Text>
                      </View>

                      {/* Pause Button */}
                      <TouchableOpacity style={styles.pauseButton} onPress={handlePauseToggle}>
                        <Icon size={36} name={isPaused ? "play" : "pause"} color={'#000000'}/>
                      </TouchableOpacity>

                      {/* Timer */}
                      <View style={styles.timerContainer}>
                        <Text style={styles.timerText}>{`Time: ${Math.floor(timer / 60)}:${timer % 60 < 10 ? `0${timer % 60}` : timer % 60}`}</Text>
                      </View>
                    </View>
                    <Text style={styles.questionText}>
                        {questions[currentQuestionIndex]?.question}
                    </Text>
                    <View style={styles.buttonContainer}>

                        <TouchableOpacity
                            style={[
                                styles.truefalseButton,
                                selectedAnswer === "true"
                                    ? (isAnswerCorrect ? styles.correctAnswer : styles.wrongAnswer)
                                    : null,
                            ]}
                            onPress={() => handleAnswer("true")}
                            disabled={selectedAnswer !== null || isPaused} // Disable buttons after selection or during pause
                        >
                            <Text style={styles.truefalseText}>True</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.truefalseButton,
                                selectedAnswer === "false"
                                    ? (isAnswerCorrect ? styles.correctAnswer : styles.wrongAnswer)
                                    : null,
                            ]}
                            onPress={() => handleAnswer("false")}
                            disabled={selectedAnswer !== null || isPaused} // Disable buttons after selection or during pause
                        >
                            <Text style={styles.truefalseText}>False</Text>
                        </TouchableOpacity>

                    </View>
                </>
            )}

            <Modal visible={isModalVisible} animationType="slide">
              <ImageBackground 
                source={require('../../assets/images/bcgr.jpeg')} // Background image
                style={styles.container}
                blurRadius={3}
                >
                  <View style={styles.modalContent}>
                      <View style={styles.button}>
                        <Text style={[styles.modalText, {fontWeight: '700', top: 10}]}>Your time is up, please try again!</Text>
                      </View>
                      <Text style={[styles.topicText, {top: -50}]}>Topic: {topicName}</Text>
                      <View style={[styles.coinContainer, {top: -10}]}>
                        <Text style={styles.coinText}>{score * 100} </Text>
                        <Image 
                          source={require('../../assets/images/coin.png')} // Replace with your coin image
                          style={styles.coinImage}
                        />
                      </View>
                      <TouchableOpacity style={[styles.truefalseButton, {top: 30}]} onPress={handleModalClose}>
                        <Text style={styles.truefalseText}>Try Again</Text>
                      </TouchableOpacity>
                  </View>
              </ImageBackground>
            </Modal>
        </ImageBackground>
    );
}
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContainer: {
      flexDirection: 'row', // Align items horizontally
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '95%',
      padding: 10,
      backgroundColor: '#00000080', // Optional: Background color for the container
      borderRadius: 30, // Rounded corners
      shadowColor: '#000', // Optional: Shadow for iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 3, // Shadow for Android
      borderWidth: 2,
      borderColor: '#FFD700',
      top: -30
    },
    coinImage: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
    coinText: {
      fontSize: 18,
      fontWeight: '900',
      color: '#fff', // Black text color
    },
    coinContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5,
      backgroundColor: '#00000000', // Light background to match the image you provided
      borderRadius: 10,
      paddingHorizontal: 10,
    },
    correctAnswer: {
        backgroundColor: '#00ff0080', // Correct answer background
    },
    wrongAnswer: {
        backgroundColor: '#ff000080', // Wrong answer background
    },
    topicText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    pauseButton: {
        top: 12,
        color: '#FFD700',
        position: 'absolute',
        left: 165,
        backgroundColor: '#FFD700',
        borderRadius: 25
    },
    timerContainer: {
      padding: 5,
      backgroundColor: '#00000000', // Light background
      borderRadius: 10,
      paddingHorizontal: 10,
      position: 'absolute',
      left: 240
    },
    timerText: {
      fontSize: 18,
      fontWeight: '900',
      color: '#fff', // Black text color
    },
    questionText: {
        fontSize: 20,
        paddingVertical: 40,
        textAlign: 'center',
        color: 'white',
        width: '90%',
        fontWeight: '700'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        position: 'absolute',
        top: 550
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#00000080',
        width: '100%'
    },
    modalText: {
        fontSize: 22,
        marginBottom: 20,
        color: 'white',
    },
    truefalseButton: {
      backgroundColor: '#FFD700',
      padding: 12,
      borderRadius: 30,
      alignItems: 'center',
      width: 150,
      alignSelf: 'center',
      height: 50,
    },
    truefalseText: {
      top: 2,
      fontSize: 18,
      fontWeight: '900',
      color: '#000',
    },
    button: {
      backgroundColor: '#00000040', // Semi-transparent button color
      // paddingVertical: 15,
      // paddingHorizontal: 25,
      borderRadius: 30,
      alignItems: 'center',
      marginBottom: 20,
      shadowColor: '#000', // Button shadow
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5, // Shadow for Android
      borderColor: '#FFD700',
      borderWidth: 2,
      top: -50,
      width: 370
    },
});
