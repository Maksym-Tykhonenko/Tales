import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, Modal, TouchableOpacity, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function RecipeDetail({ route }) {
  const { recipe } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ImageBackground 
              source={require('../../assets/images/bcgr.jpeg')} // Background image
              style={styles.container}
              blurRadius={3}
          >
    <View style={styles.box}>
        <ScrollView>
            <View style={styles.articleTextBox}>
                <Image
                  source={typeof recipe.image === 'string' ? { uri: recipe.image } : recipe.image}
                  style={styles.image}
                />
                <Text style={styles.fullTitle}>{recipe.fullTitle}</Text>
                <Text style={styles.articleText}>{recipe.article}</Text>
                <TouchableOpacity
                    style={styles.buttonBox}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.buttonText}>Recipe & Cooking Instructions</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </View>
      {/* Modal for Recipe & Instructions */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              {/* <Text style={styles.closeButton}>X</Text> */}
              <Icon name="close" size={35} style={styles.closeButton} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Recipe</Text>
            <Text style={styles.modalSubtitle}>{recipe.recipe}</Text>
            <Text style={styles.modalTitle}>Instructions</Text>
            <Text style={styles.modalSubtitle}>{recipe.instructions}</Text>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 70,
    backgroundColor: '#fff',
  },
  fullTitle: {
    top: 15,
    fontSize: 18,
    fontWeight: '900',
    color: '#FFD700',
    textAlign: 'center',
  },
  articleText: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', 
    padding: 10,
    textAlign: 'center'
  },
  articleTextBox: {
    backgroundColor: '#00000040', // Semi-transparent button color
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 40,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000', // Button shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Shadow for Android
    borderColor: '#FFD700',
    borderWidth: 2,
    width: 350,
    alignSelf: 'center'
  },
  titleUserBox: {
    borderWidth: 2,
    borderColor: '#FFD700',
    backgroundColor: '#00000080',
    borderRadius: 40,
  },
  titleUser: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '900',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 10,
    marginHorizontal: 5
  },
  buttonBox: {
    backgroundColor: '#00000040', // Semi-transparent button color
    borderRadius: 30,
    shadowColor: '#000', // Button shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Shadow for Android
    borderColor: '#FFD700',
    borderWidth: 2,
    width: 300,
    height: 40,
    alignSelf: 'center'
  },
  buttonText: {
    marginTop: 8,
    fontSize: 16,
    textAlign: 'center',
    color: 'gold',
    fontWeight: '900'
  },
  box: {
    paddingBottom: 80
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 40,

  },
  article: {
    fontSize: 16,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    padding: 20,
    width: '80%',
    backgroundColor: '#000000ff', // Semi-transparent button color
    paddingVertical: 5,
    borderRadius: 30,
    shadowColor: '#000', // Button shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Shadow for Android
    borderColor: '#FFD700',
    borderWidth: 2,
    alignSelf: 'center'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '900',
    marginVertical: 10,
    color: '#FFD700',
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20
  },
  closeButton: {
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    color: '#FFD700',
  },
});
