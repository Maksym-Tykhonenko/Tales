import React, { useState, useEffect } from 'react';
import { Alert, Modal, View, Text, TextInput, Button, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

export default function UsersContent ({ userTopics, setUserTopics }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [newTopic, setNewTopic] = useState({
    id: Date.now(),
    title: '',
    description: '',
    purchased: true,
    image: '',
    articles: []
  });

  const [newArticle, setNewArticle] = useState({
    title: '',
    content: ''
  });

  const handleAddArticle = () => {
    if (!newArticle.title || !newArticle.content) {
      Alert.alert("Empty Fields", "Please fill in all topic fields.");
      return;
    }

    const updatedTopic = {
      ...newTopic,
      articles: [...newTopic.articles, newArticle]
    };
    setNewTopic(updatedTopic);
    setNewArticle({ title: '', content: '' });
  };

  const handleAddTopic = () => {
    if (!newTopic.title || !newTopic.description) {
      Alert.alert("Empty Fields", "Please fill in all topic fields.");
      return;
    }
  
    if (!newTopic.image) {
      Alert.alert("No Image", "Please add an image to the article.");
      return;
    }
  
    const updatedTopics = [...userTopics, newTopic];
    setUserTopics(updatedTopics);
    saveUserTopics(updatedTopics);
    setModalVisible(false);
    setNewTopic({
      id: Date.now(),
      title: '',
      description: '',
      purchased: true,
      image: '',
      articles: []
    });
  };
  

  const handleRemoveTopic = (index) => {
    const updatedTopics = userTopics.filter((_, i) => i !== index);
    setUserTopics(updatedTopics);
    saveUserTopics(updatedTopics);
  };

  useEffect(() => {
    loadUserTopics();
  }, []);

  // Save user topics to AsyncStorage
  const saveUserTopics = async (topics) => {
    try {
      await AsyncStorage.setItem('userTopics', JSON.stringify(topics));
    } catch (error) {
      console.error("Error saving user topics:", error);
    }
  };

  // Load user topics from AsyncStorage
  const loadUserTopics = async () => {
    try {
      const storedTopics = await AsyncStorage.getItem('userTopics');
      if (storedTopics !== null) {
        setUserTopics(JSON.parse(storedTopics));
      }
    } catch (error) {
      console.error("Error loading user topics:", error);
    }
  };

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setNewTopic({ ...newTopic, image: response.assets[0].uri });
      }
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.addArticleBox]}>
        <Text style={[{ fontSize: 16, fontWeight: '900', color: 'black', textAlign: 'center'}]}>Add Article</Text>
      </TouchableOpacity>

      {/* Add Topic Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={[{ color: '#FFD700', marginBottom: 10, fontWeight: '900' }]}>Add New Article</Text>

          <TextInput
            placeholder="Title"
            value={newTopic.title}
            onChangeText={(text) => setNewTopic({ ...newTopic, title: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            value={newTopic.description}
            onChangeText={(text) => setNewTopic({ ...newTopic, description: text })}
            style={styles.input}
          />
          {/* <TextInput
            placeholder="Image URL"
            value={newTopic.image}
            onChangeText={(text) => setNewTopic({ ...newTopic, image: text })}
            style={styles.input}
          /> */}
          <TouchableOpacity onPress={selectImage} style={styles.addArticleBox}>
            <Text style={[{ fontSize: 12, fontWeight: '900', color: '#000', textAlign: 'center'}]}>Select Image</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={captureImage} style={styles.addArticleBox}>
            <Text style={[{ fontSize: 12, fontWeight: '900', color: '#000', textAlign: 'center'}]}>Capture Image</Text>
          </TouchableOpacity> */}

          {/* Add Article Section */}
          <Text style={[{ color: '#FFD700', marginBottom: 10, marginTop: 20, fontWeight: '900' }]}>Add Topics to Article</Text>
          <TextInput
            placeholder="Article Title"
            value={newArticle.title}
            onChangeText={(text) => setNewArticle({ ...newArticle, title: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Article Content"
            multiline
            value={newArticle.content}
            onChangeText={(text) => setNewArticle({ ...newArticle, content: text })}
            style={styles.input}
          />

          <TouchableOpacity onPress={handleAddArticle} style={styles.addArticleBox}>
            <Text style={[{ fontSize: 16, fontWeight: '900', color: '#000', textAlign: 'center' }]}>Add Topic</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleAddTopic} style={styles.addArticleBox}>
            <Text style={[{ fontSize: 16, fontWeight: '900', color: '#000', textAlign: 'center' }]}>Add Article</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.addArticleBox}>
            <Text style={[{ fontSize: 16, fontWeight: '900', color: '#000', textAlign: 'center' }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Display User Topics */}
      {/* <FlatList
        data={userTopics}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={[styles.topicContainer, {marginTop: 10, alignSelf: 'center'}]}>
            <View style={[{flexDirection: 'row', justifyContent: 'center'}]}>
                <Text style={[styles.topicTitle, {top: 12}]}>{item.title}</Text>
                <TouchableOpacity onPress={() => handleRemoveTopic(index)} style={[styles.addArticleBox, {left: 30, marginBottom: 10}]}>
                    <Text style={[{ fontSize: 14, fontWeight: '900', color: '#000', textAlign: 'center' }]}>Remove Article</Text>
                </TouchableOpacity>
            </View> */}

            {/* Display Articles in Topic */}
            {/* {item.articles.map((article, i) => (
              <View key={i} style={styles.articleContainer}>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <Text style={styles.articleContent}>{article.content}</Text>
              </View>
            ))} */}
          {/* </View> */}
        {/* )} */}
      {/* /> */}
    </View>
  );
}

const styles = StyleSheet.create({
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
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    width: '100%',
    padding: 10,
    color: '#black',
    backgroundColor: 'white',
    borderRadius: 40,
    padding: 5,
    paddingHorizontal: 10
  },
  topicContainer: {
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: '#00000080',
    borderRadius: 40,
    width: '95%'
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10
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
  topicTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '900',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 10
  },
  topicDescription: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    marginBottom: 10
  },
  articleContainer: {
    padding: 5,
    marginVertical: 5,
    backgroundColor: '#ffffff40',
    borderRadius: 20,
    alignItems: 'center'
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFD700',
    marginBottom: 5
  },
  articleContent: {
    fontSize: 14,
    fontWeight: '400',
    color: 'white'
  }
});
