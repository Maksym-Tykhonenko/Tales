import React, { useState, useEffect } from 'react';
import { Alert, Modal, View, Text, TextInput, Button, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function UsersTopics ({ userArticles, setUserArticles, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: '',
    fullTitle: '',
    image: '',
    unlocked: true,
    article: '',
    recipe: '',
    instructions: ''
  });

  const handleAddArticle = () => {
    if (!newArticle.title || !newArticle.fullTitle || !newArticle.article || !newArticle.recipe || !newArticle.instructions) {
      Alert.alert('Missing Information', 'Please fill in all the fields.');
      return;
    }

    if (!newArticle.image) {
      Alert.alert('Missing Image', 'Please select or capture an image.');
      return;
    }

    const updatedArticles = [...userArticles, newArticle];
    setUserArticles(updatedArticles);
    saveUserArticles(updatedArticles);
    setModalVisible(false);
    setNewArticle({
      title: '',
      fullTitle: '',
      image: '',
      unlocked: true,
      article: '',
      recipe: '',
      instructions: ''
    });
  };

  const handleRemoveArticle = (index) => {
    const updatedArticles = userArticles.filter((_, i) => i !== index);
    setUserArticles(updatedArticles);
    saveUserArticles(updatedArticles);
  };

  useEffect(() => {
    loadUserArticles();
  }, []);

  // Save user articles to AsyncStorage
  const saveUserArticles = async (articles) => {
    try {
      await AsyncStorage.setItem('userArticles', JSON.stringify(articles));
    } catch (error) {
      console.error("Error saving user articles:", error);
    }
  };

  // Load user articles from AsyncStorage
  const loadUserArticles = async () => {
    try {
      const storedArticles = await AsyncStorage.getItem('userArticles');
      if (storedArticles !== null) {
        setUserArticles(JSON.parse(storedArticles));
      }
    } catch (error) {
      console.error("Error loading user articles:", error);
    }
  };

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && !response.error) {
        setNewArticle({ ...newArticle, image: response.assets[0].uri });
      }
    });
  };

  const renderRecipe = ({ item, index }) => (
    <View style={styles.recipeContainer}>
      <TouchableOpacity
        style={styles.recipeItem}
        onPress={() => {
          if (!item.unlocked) {
            Alert.alert(
              "Locked Topic",
              "This recipe is locked. Complete the quiz on this topic to unlock it!",
              [{ text: "OK" }]
            );
          } else {
            navigation.navigate('RecipeDetail', { recipe: item });
          }
        }}
      >
        <Image 
          source={typeof item.image === 'string' ? { uri: item.image } : item.image} 
          style={styles.recipeImage} 
        />
        <Text style={[styles.recipeTitle, { color: !item.unlocked ? '#FFD700' : '#ffffff' }]}>
          {item.title}
        </Text>
        {item.unlocked && (
          <TouchableOpacity
            onPress={() => handleRemoveArticle(index)}
            style={styles.removeButton}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
  
      {/* Remove Button for user articles */}
    </View>
  );
  

  return (
    <View>
      {/* <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addArticleBox}>
        <Text style={[{fontSize: 16, fontWeight: '900', color: 'black', textAlign: 'center'}]}>Add Article</Text>
      </TouchableOpacity> */}
      {/* Add Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={[{color: '#FFD700', marginBottom: 10, fontWeight: '900'}]}>Add New Article</Text>
          
          <TextInput
            placeholder="Title"
            value={newArticle.title}
            onChangeText={(text) => setNewArticle({ ...newArticle, title: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Full Title"
            value={newArticle.fullTitle}
            onChangeText={(text) => setNewArticle({ ...newArticle, fullTitle: text })}
            style={styles.input}
          />
          {/* <TextInput
            placeholder="Image URL"
            value={newArticle.image}
            onChangeText={(text) => setNewArticle({ ...newArticle, image: text })}
            style={styles.input}
          /> */}
          <TouchableOpacity onPress={selectImage} style={[styles.addArticleBox]}>
            <Text style={[{ fontSize: 14, fontWeight: '900', color: '#000', textAlign: 'center' }]}>Select Image</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={captureImage} style={[styles.addArticleBox]}>
            <Text style={[{ fontSize: 14, fontWeight: '900', color: '#000', textAlign: 'center' }]}>Capture Image</Text>
          </TouchableOpacity> */}
          <TextInput
            placeholder="Article"
            value={newArticle.article}
            onChangeText={(text) => setNewArticle({ ...newArticle, article: text })}
            style={[styles.input, {marginTop: 20}]}
          />
          <TextInput
            placeholder="Recipe"
            multiline
            value={newArticle.recipe}
            onChangeText={(text) => setNewArticle({ ...newArticle, recipe: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Instructions"
            value={newArticle.instructions}
            onChangeText={(text) => setNewArticle({ ...newArticle, instructions: text })}
            style={styles.input}
          />
          
          <TouchableOpacity onPress={handleAddArticle} style={styles.addArticleBox}>
            <Text style={[{ fontSize: 14, fontWeight: '900', color: '#000', textAlign: 'center'}]}>Add Article</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.addArticleBox}>
            <Text style={[{ fontSize: 14, fontWeight: '900', color: '#000', textAlign: 'center' }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Display User Articles */}
      <FlatList
        data={userArticles}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} // Display two items per row
        renderItem={renderRecipe}
        contentContainerStyle={styles.forFlatList} // Styles for the content
      />

      <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.addArticleBox, {marginTop: 10}]}>
        <Text style={[{fontSize: 16, fontWeight: '900', color: 'black', textAlign: 'center'}]}>Add Article</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space between title and button
    alignItems: 'center', // Center items vertically
  },
  removeButtonText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '900',
    textAlign: 'center'
  },
  removeButton: {
    width: 150, 
    alignSelf: 'center',
    backgroundColor: '#00000080',
    borderRadius: 40,
    padding: 5,
    borderWidth: 2,
    borderColor: '#FFD700'
  },
  recipeContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '50%',
  },
  modalView: {
    margin: 20,
    padding: 20,
    backgroundColor: '#000000fa',
    borderRadius: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 50,
    borderColor: '#FFD700',
    borderWidth: 2
  },
  recipeImage: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
  recipeItem: {
    // flex: 1,
    // width: '45%',
    margin: 10,
    borderRadius: 25,
    elevation: 5,
    backgroundColor: '#00000080',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    // alignSelf: 'center',
    paddingHorizontal: 10,
    marginTop: 15,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    width: '100%',
    padding: 5,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 40,
    padding: 5,
    paddingHorizontal: 10
  },
  articleContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#00000080',
    borderRadius: 40,
    width: '95%', 
    alignSelf: 'center'
    // alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  addArticleBox: {
    // borderColor: 'black',
    // borderWidth: 2,
    width: 150, 
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#FFD700',
    borderRadius: 40,
    padding: 10
  },
  recipeTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '900',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 10,
    marginHorizontal: 5
  },
  recipeSubtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white'
  },
});
