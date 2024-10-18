import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ImageBackground, Alert, Image, Animated } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { CoinContext } from '../CoinProvider'; // Import the CoinContext
import { QuizContext } from '../QuizProvider';
import { useNavigation } from '@react-navigation/native';

export default function QuizModal({ isVisible, onClose, onComplete, selectedTopic }) {
    const [timer, setTimer] = useState(300);
    const [lives, setLives] = useState(5);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const questions = selectedTopic.questions;
    const [earnedCoins, setEarnedCoins] = useState(0); 
    const [numberOfAnswers, setNumberOfAnswers] = useState(0);
    const [disabledAnswers, setDisabledAnswers] = useState([]); 
    const quizEndLock = useRef(false);
    const cloverPosition = useRef(new Animated.Value(0)).current;
    const [isPurchasing, setIsPurchasing] = useState(false);

    const navigation = useNavigation();

    const [showWinModal, setShowWinModal] = useState(false);
    const [showGameOverModal, setShowGameOverModal] = useState(false);

    const { setWinMode, setTopicId } = useContext(QuizContext);

    const { totalCoins, setTotalCoins } = useContext(CoinContext);

    useEffect(() => {
        const progress = currentQuestion / questions.length;
        Animated.timing(cloverPosition, {
            toValue: progress * 300,
            duration: 250,
            useNativeDriver: false,
        }).start();
    }, [currentQuestion]);

    useEffect(() => {
        if (numberOfAnswers === 10) {
            handleQuizEnd();
        }
    }, [numberOfAnswers]);

    const handleRemoveOneHint = () => {
        const hintCost = 50;
        if (totalCoins >= hintCost) {
            // Deduct the coins
            const newTotalCoins = totalCoins - hintCost;
            setTotalCoins(newTotalCoins);
            saveCoins(newTotalCoins); // Save the new total directly
    
            // Ensure current question and options are defined
            if (questions[currentQuestion] && questions[currentQuestion].options) {
                const incorrectOptions = questions[currentQuestion].options
                    .map((option, index) => ({ ...option, index })) // Add index to keep track
                    .filter(option => !option.isCorrect && !disabledAnswers.includes(option.index)); // Filter incorrect options that aren't already removed
    
                // Randomly pick one incorrect answer to disable
                if (incorrectOptions.length > 0) {
                    const randomIndex = Math.floor(Math.random() * incorrectOptions.length);
                    const optionToDisable = incorrectOptions[randomIndex].index;
                    setDisabledAnswers(prev => [...prev, optionToDisable]);
                    Alert.alert('One incorrect option has been removed!');
                } else {
                    Alert.alert('No incorrect options available to remove.');
                }
            } else {
                Alert.alert('Unable to use hint due to an issue with the current question.');
            }
        } else {
            Alert.alert('Not enough points to use this hint.');
        }
    };
    

    const openPurchaseModal = () => {
        setIsPurchasing(true);
    };

    const closePurchaseModal = () => {
        setIsPurchasing(false);
    };


    const handleReadArticle = () => {
        // Logic to open the article with a sweet recipe
        Alert.alert("Opening Sweet Recipe Article...");
        navigation.navigate('RecipeBook');
    };

    const purchaseLives = () => {
        // Logic to add lives
        const liveCost = 200
        if (totalCoins >= liveCost) {
            setLives(prevLives => prevLives + 1);
            setTotalCoins(prevCoins => prevCoins - liveCost);
            closePurchaseModal();
        } else {
            Alert.alert('Not enough points to buy more lives.');
        }
    };

    const purchaseTime = () => {
        // Logic to add time
        const timeCost = 200
        if (totalCoins >= timeCost) {
            setTimer(prevTimer => prevTimer + 60);
            setTotalCoins(prevCoins => prevCoins - timeCost);
            closePurchaseModal();
        } else {
            Alert.alert('Not enough points to buy more time.');
        }
    };

    const handleWinModalAction = (action) => {
        setShowWinModal(false); // Close the win modal
        // onComplete(earnedCoins); // Complete the quiz and move to next topic
        if (action === 'next') {
            onClose(); // Close the quiz modal
        } else if (action === 'read') {
            onClose();
            handleReadArticle(); // Logic for reading the article
        } else {
            onClose(); // Go back to TopicSelectionScreen
        }
    };

    const handleTryAgain = () => {
        setShowGameOverModal(false); 
        setTimer(300); 
        setLives(5); 
        setCurrentQuestion(0); 
        setNumberOfAnswers(0); 
        setEarnedCoins(0);  
        setDisabledAnswers([]); 
        setSelectedAnswer(null); 
        quizEndLock.current = false; 
        setIsPurchasing(false);
    };

    useEffect(() => {        
        const interval = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);
    
        if (timer === 0 || lives === 0) {
            clearInterval(interval);
            console.log("Timer or lives reached 0, calling handleQuizEnd");
            handleQuizEnd();  // Trigger the quiz end
            setShowGameOverModal(true);
            // Alert.alert('Game Over! Start again to get better!');
        }
    
        return () => {
            // console.log("Cleaning up interval");
            clearInterval(interval);
        };
    }, [timer, lives]);

    const handleAnswer = (isCorrect, answerIndex, hintMark) => {
        if (selectedAnswer === null) {
            setSelectedAnswer(answerIndex);
    
            if (isCorrect) {
                if (!hintMark) {
                    // Player answered correctly without using 'showCorrect' hint
                    setEarnedCoins(prev => prev + 100);
                    setNumberOfAnswers(prev => prev + 1);
                    console.log(`+1, ${numberOfAnswers}`);
                    console.log('not used hint');
                }
                else {
                    setNumberOfAnswers(prev => prev + 1);
                    console.log('used hint');
                }
                // Else, do not add coins
            } else {
                setLives(prevLives => prevLives - 1);
            }
    
            // Reset for the next question
            setTimeout(() => {
                setSelectedAnswer(null);
                setDisabledAnswers([]);
                // setUsedShowCorrectHint(false);
                if (currentQuestion < questions.length - 1) {
                    setCurrentQuestion(prevQuestion => prevQuestion + 1);
                } else {
                    handleQuizEnd();
                }
            }, 1000);
        }
    };

    const handleQuizEnd = () => {
        if (quizEndLock.current) {
            return;  // Exit if the quiz end process has already started
        }
    
        const finalAnswerCount = numberOfAnswers;  // Assume the answer just before the end is correct
    
        console.log(`Starting quiz end process ${finalAnswerCount}`);
        quizEndLock.current = true;  // Lock the process immediately
    
        if (finalAnswerCount === 10) {
            setWinMode(true);  // Set win mode to true
            setTopicId(selectedTopic.id);  // Store the topic ID in context
            
            // Add earned coins to totalCoins
            const newTotalCoins = totalCoins + earnedCoins;
            setTotalCoins(newTotalCoins);
            saveCoins(newTotalCoins);  // Save the updated totalCoins
    
            setShowWinModal(true); // Show win modal
        } else {
            onComplete(earnedCoins); // Complete the quiz and move to next topic
            setWinMode(false);
            setTopicId(null);
            setShowGameOverModal(true);
        }
    };
    
    
    
    
    const handleHint = (type) => {
        if (type === 'showCorrect') {
            const hintCost = 75;
            if (totalCoins >= hintCost) {
                // setUsedShowCorrectHint(true);
                setTotalCoins(prevCoins => prevCoins - hintCost);
                saveCoins(totalCoins - hintCost);
                handleAnswer(true, null, true); // Automatically answer correctly
            } else {
                Alert.alert('Not enough points to use this hint.');
            }
        }
    };

    const handleExit = () => {
        // Player exits early; do not add earnedCoins to totalCoins
        setEarnedCoins(0); // Reset earned coins
        onClose();
    };

    const saveCoins = async (amount) => {
        try {
            await AsyncStorage.setItem('totalCoins', amount.toString());
            console.log(`Coins saved: ${amount}, ${numberOfAnswers}`);
        } catch (error) {
            console.error('Failed to save coins:', error);
        }
    };

    useEffect(() => {
        // Reset earnedCoins when the quiz starts
        if (isVisible) {
            setEarnedCoins(0);
            // setUsedShowCorrectHint(false);
        }
    }, [isVisible]);

    if (!selectedTopic || !selectedTopic.questions || !selectedTopic.questions.length) {
        return null;
    }

    return (
        <Modal visible={isVisible} transparent={true}>
            <ImageBackground 
                source={require('../../assets/images/bcgr.jpeg')}
                style={styles.background}
                blurRadius={3}
            >
                <View style={styles.main}>
                    <View style={styles.header}>
                        <View style={styles.container}>
                            <TouchableOpacity style={styles.progressBarContainer} onPress={openPurchaseModal}>
                                <Image source={require('../../assets/images/heart.png')} style={styles.heartIcon} />
                                <Image source={require('../../assets/images/plus-empty.png')} style={styles.plusSign} />
                                <Text style={styles.livesText}>{lives}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.playerCoinsBox}>
                            <View style={[styles.coinContainer]}>
                                <Text style={styles.textCoin}>{totalCoins !== undefined ? totalCoins : 'Loading...'}</Text>
                                <Image style={[styles.coinIcon, {}]} source={require('../../assets/images/coin.png')} />
                            </View>
                        </View>

                        <View style={styles.container}>
                            <TouchableOpacity style={styles.progressBarContainer} onPress={openPurchaseModal}>
                                <Image source={require('../../assets/images/clock.png')} style={styles.timerIcon} />
                                <Image source={require('../../assets/images/plus-empty.png')} style={[styles.plusSign, {top: 5}]} />
                                <Text style={styles.timerText}>{`${Math.floor(timer / 60)}:${timer % 60 < 10 ? `0${timer % 60}` : timer % 60}`}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={styles.progressBarContainer}>
                        <ProgressBar 
                            progress={currentQuestion / questions.length} 
                            width={300} 
                            color='#FFD700'
                        />
                        <Animated.View style={[styles.cloverContainer, { left: cloverPosition }]}>
                            <Image source={require('../../assets/images/clover.png')} style={styles.cloverIcon} />
                        </Animated.View>
                    </View>

                    {currentQuestion < questions.length ? (
                        <Text style={styles.questionText}>{questions[currentQuestion].question}</Text>
                    ) : (
                        <Text>Quiz Finished!</Text>
                    )}

                    {currentQuestion < questions.length && questions[currentQuestion]?.options.map((answer, index) => (
                        <TouchableOpacity 
                            key={answer.text} // Prefer a unique identifier if available
                            onPress={() => handleAnswer(answer.isCorrect, index)} 
                            style={[
                                styles.answerButton, 
                                disabledAnswers.includes(index) ? styles.disabledAnswer : styles.defaultAnswer, // Apply disabled style
                                selectedAnswer === index 
                                    ? (answer.isCorrect ? styles.correctAnswer : styles.wrongAnswer) 
                                    : null
                            ]}
                            disabled={selectedAnswer !== null || disabledAnswers.includes(index)} // Disable if selected or removed
                        >
                            <Text style={styles.buttonText}>{answer.text}</Text>
                        </TouchableOpacity>
                    ))}

                    <View style={styles.hintButtons}>
                        <TouchableOpacity onPress={handleRemoveOneHint} style={styles.leftHintButton}>
                            <Image style={styles.hintEraserIcon} source={require('../../assets/images/eraser.png')}/>
                            <View style={styles.coinContainer}>
                                <Image style={styles.coinIcon} source={require('../../assets/images/coin.png')} />
                                <Text style={styles.priceText}>50</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleHint('showCorrect')} style={styles.rightHintButton}>
                            <Image style={styles.hintMarkIcon} source={require('../../assets/images/check-mark.png')}/>
                            <View style={styles.coinContainer}>
                                <Image style={styles.coinIcon} source={require('../../assets/images/coin.png')} />
                                <Text style={styles.priceText}>75</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={handleExit} style={styles.exitButton}>
                        <Text style={[styles.text, {fontWeight: '900'}]}>Exit</Text>
                    </TouchableOpacity>
                </View>

                {/*Purchase Modal Window*/}
                <Modal
                    visible={isPurchasing}
                    transparent={true}
                    onRequestClose={closePurchaseModal}
                    animationType='fade'>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Purchase Options</Text>

                            <TouchableOpacity onPress={purchaseLives} style={styles.purchaseContainer}>
                                <Image source={require('../../assets/images/heart.png')} style={[styles.heartIcon, {left: -40}]} />
                                <View style={[styles.playerCoinsBox, {width: 140, flexDirection: 'row', height: 40, left: 15}]}>
                                    <Text style={styles.modalButton}>200 </Text>
                                    <Image style={[styles.coinIcon, {left: 15}]} source={require('../../assets/images/coin.png')} />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={purchaseTime} style={styles.purchaseContainer}>
                                <Image source={require('../../assets/images/clock.png')} style={[styles.timerIcon, {left: -40}]} />
                                <View style={[styles.playerCoinsBox, {width: 140, flexDirection: 'row', height: 40, left: 15}]}>
                                    <Text style={styles.modalButton}>200 </Text>
                                    <Image style={[styles.coinIcon, {left: 15}]} source={require('../../assets/images/coin.png')} />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={closePurchaseModal}>
                                <Text style={styles.closeButton}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                    
                {/*Game Over Modal Window*/}
                    <Modal visible={showGameOverModal} transparent={true} animationType="fade">
                        <View style={[styles.completionModal, {paddingTop: 80}]}>
                            <View style={styles.titleBox}>
                                <Text style={[styles.completionTitle, {paddingHorizontal: 10}]}>Unfortunately, the game is over. Start again to get better!</Text>
                            </View>
                            <View style={[styles.coinContainer, {marginBottom: 20}]}>
                                <Text style={styles.coinText}>{earnedCoins} </Text>
                                <Image source={require('../../assets/images/coin.png')} style={styles.coinIcon} />
                            </View>

                            <View style={styles.progressBarWrapper}>
                                <ProgressBar 
                                    progress={currentQuestion / questions.length} 
                                    width={300} 
                                    color='#FFD700'
                                />
                                <Animated.View style={[styles.cloverContainer, { left: cloverPosition }]}>
                                    <Image source={require('../../assets/images/clover.png')} style={styles.cloverIcon} />
                                </Animated.View>
                            </View>

                            <TouchableOpacity onPress={handleTryAgain} style={styles.winModalButton}>
                                <Text style={[{color: '#fff', paddingHorizontal: 40, fontWeight: '900'}]}>Try Again</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                {/*WinModal Window*/}
                    <Modal visible={showWinModal} transparent={true} animationType="fade">
                        <View style={styles.completionModal}>
                            <View style={styles.titleBox}>
                                <Text style={styles.completionTitle}>The topic is completed, keep up the good work!</Text>
                            </View>
                            <View style={[styles.coinContainer, {marginBottom: 20}]}>
                                <Text style={styles.coinText}>{earnedCoins} </Text>
                                <Image source={require('../../assets/images/coin.png')} style={styles.coinIcon} />
                            </View>

                            <View style={styles.progressBarWrapper}>
                                <ProgressBar 
                                    progress={1} 
                                    width={300} 
                                    color='#FFD700'
                                />
                                <Animated.View style={[styles.cloverContainer, { left: 300 }]}>
                                    <Image source={require('../../assets/images/clover.png')} style={styles.cloverIcon} />
                                </Animated.View>
                            </View>

                            <Text style={styles.recipeTitle}>Get a Sweet Recipe!</Text>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={() => handleWinModalAction('next')} style={styles.winModalButton}>
                                    <Text style={[{color: '#fff', paddingHorizontal: 40, fontWeight: '900'}]}>Next</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleWinModalAction('read')} style={styles.winModalButton}>
                                    <Text style={[{color: '#fff', paddingHorizontal: 40, fontWeight: '900'}]}>Read Article</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleWinModalAction('goBack')} style={styles.winModalButton}>
                                    <Text style={[{color: '#fff', paddingHorizontal: 40, fontWeight: '900'}]}>Go Back</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

            </ImageBackground>
        </Modal>
    );
}


const styles = StyleSheet.create({
    titleBox: {
        backgroundColor: '#FFD700',
        padding: 12,
        marginBottom: 15,
        borderRadius: 30,
    },
    completionModal: {
        backgroundColor: '#000000ee',
        padding: 20,
        borderRadius: 50,
        alignItems: 'center',
        paddingTop: 70,
        borderColor: '#FFD700',
        borderWidth: 2,
        top: -5
    },
    coinText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '900',
    },
    disabledAnswer: {
        opacity: 0.5, // or any other style that indicates the option is disabled
        backgroundColor: '#000000', // optional, to indicate it's inactive
    },
    progressBarWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    winModalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    winModalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    winModalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    winModalButton: {
        marginVertical: 5,
        padding: 10,
        backgroundColor: '#00000090',
        borderRadius: 5,
        alignItems: 'center',
        borderColor: '#FFD700',
        borderWidth: 2,
        borderRadius: 40
    },
    completionTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: '#000',
        textAlign: 'center'
    },
    recipeTitle: {
        fontSize: 16,
        fontWeight: '800',
        marginBottom: 20,
        textAlign: 'center',
        color: '#fff'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    readButton: {
        backgroundColor: '#FFA500',
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
    },
    nextButton: {
        backgroundColor: '#FFD700',
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
    },
    playerCoinsBox: {
        backgroundColor: '#00000040', // Semi-transparent button color
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#000', // Button shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5, // Shadow for Android
        borderColor: '#FFD700',
        borderWidth: 2,
        width: 100,
        right: 35,
        height: 50
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        padding: 20,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    main: {
        alignItems: 'center',
        backgroundColor: '#00000040',
        width: 350,
        borderRadius: 75,
        borderWidth: 2,
        borderColor: '#FFD700',
        padding: 20,
        height: 625,
    },
    answerButton: {
        backgroundColor: '#00000040', // Semi-transparent button color
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#000', // Button shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5, // Shadow for Android
        borderColor: '#FFD700',
        borderWidth: 2,
        width: 250
    },
    correctAnswer: {
        backgroundColor: 'green', // Highlight correct answer in green
    },
    wrongAnswer: {
        backgroundColor: 'red', // Highlight wrong answer in red
    },
    questionText: {
        fontSize: 20,
        marginVertical: 20,
        textAlign: 'center',
        height: 100,
        color: '#FFD700'
    },
    buttonText: {
        color: '#FFD700', // Gold color for button text
        fontSize: 14,
        fontWeight: '900',
    },
    hintButtons: {
        borderColor: 'red',
        borderWidth: 3,
        borderRadius: 30,
        width: 300,
        alignItems: 'center',
        height: 200, 
        paddingTop: 10,
        backgroundColor: '#00000040',
        marginTop: 20,
        shadowColor: '#000', // Button shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        marginTop: 30
    },
    text: {
        margin: 5,
        color: '#FFD700',
        fontWeight: 'light',
    },
    textCoin: {
        margin: 5,
        color: '#FFD700',
        fontWeight: '900',
    },
    exitButton: {
        backgroundColor: '#00000040', // Semi-transparent button color
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#000', // Button shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5, // Shadow for Android
        borderColor: '#FFD700',
        borderWidth: 2,
        width: 150,
        marginTop: 30,
    },
    hintButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 30,
        marginTop: 20,
    },
    leftHintButton: {
        backgroundColor: '#00ff0080', // White background for the left button
        padding: 10,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#FFD700', // Add border color if needed
        width: 80,
        height: 80,
    },
    rightHintButton: {
        backgroundColor: '#00ff0080', // Semi-transparent background for the right button
        padding: 10,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#FFD700', // Add border color if needed
        width: 80,
        height: 80,
    },
    hintEraserIcon: {
        width: 45,
        height: 45,
    },
    hintMarkIcon: {
        width: 50,
        height: 40,
    },
    coinContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5, // Space between the hint icon and the price
    },
    coinIcon: {
        width: 20,
        height: 20,
        marginRight: 5, // Space between the coin and the price
    },
    priceText: {
        color: '#FFD700',
        fontSize: 14,
        fontWeight: 'bold',
    },
    cloverIcon: {
        width: 25,
        height: 25,
        marginTop: 2,
        marginLeft: -15
    },
    progressBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        position: 'relative',
    },
    cloverContainer: {
        position: 'absolute',
        top: -10, // Розташування клеверу над ProgressBar
    },
    modalBackground: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
        backgroundColor: '#00000090' // Darkened background
    },
    closeButton: {
        fontSize: 16,
        marginTop: 30,
        color: 'red',
        borderWidth: 2,
        borderColor: 'red',
        borderRadius: 10,
        width: 150,
        textAlign: 'center',
        height: 30,
        fontWeight: 'bold',
        paddingTop: 2
    },
    modalContent: {
        backgroundColor: '#000000',
        padding: 20,
        alignItems: 'center',
        borderRadius: 70,
        borderColor: '#FFD700',
        borderWidth: 2,
        width: 380,
        height: 320,
        marginTop: -80
    },
    purchaseContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        width: 100,
        marginHorizontal: 10,
        height: 30,
        left: -10,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 20,
        color: '#FFD700',
        paddingTop: 70
    },
    modalButton: {
        fontSize: 18,
        marginVertical: 10,
        color: '#FFD700',
        height: 30,
        margin: 10,
        top: 5,
        left: 20,
        fontWeight: 'bold',
    },
    plusSign: {
        width: 20,
        height: 20,
        color: 'blue',
        marginLeft: -15,
        marginTop: 20
    },
    heartIcon: {
        width: 40,
        height: 40,
        
    },
    timerIcon: {
        width: 40,
        height: 40,
        
    },
    timerText: {
        fontSize: 14,
        color: '#fff',
        right: 41,
        fontWeight: 'bold'
    },
    livesText: {
        fontSize: 15,
        color: '#fff',
        right: 30,
        top: -2,
        fontWeight: 'bold'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        width: 100,
        marginHorizontal: 10,
        height: 30,
        left: -10
    },
});