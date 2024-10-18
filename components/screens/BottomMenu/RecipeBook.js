import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Button, Alert } from 'react-native';
import { QuizContext } from '../../QuizProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UsersTopics from '../UsersTopics';
import { ScrollView } from 'react-native-gesture-handler';

const articlesID = [
  
{
  id: '1',
  title: 'Macaron',
  fullTitle: 'Macaron: The History and Art of French Almond Cookies',
  image: require('../../../assets/images/recipeImgs/macaron.jpg'),
  unlocked: false,
  article: `
  The small and exquisite macaron has become a symbol of French pastry culture. These bright cookies, with a light crunch and airy filling, are known for their variety of flavors, ranging from classic vanilla and chocolate to exotic lavender or pistachio.
  
    History:    
  The origins of macarons go back to Italy, where they were first created by monks in the Middle Ages. They made their way to France thanks to Catherine de' Medici in the 16th century. However, the modern version of the macaron, with filling between two halves, appeared only in the early 20th century at the famous Parisian patisserie Ladurée. Today, macarons have become an art form, with each patisserie competing in creativity of flavors and presentation.
  `,
  recipe: `  
    Ingredients:  
  - 100 g almond flour
  - 100 g powdered sugar
  - 75 g egg whites (from 2 eggs)
  - 100 g granulated sugar
  - Pinch of salt
  - Filling (ganache, jam, or cream)
  `,
  instructions: `
    Instructions:  
  1. Sift the almond flour and powdered sugar together.
  2. Whisk egg whites with salt until soft peaks form, then gradually add sugar and beat until stiff peaks.
  3. Gently fold the almond mixture into the egg whites.
  4. Pipe the batter into circles on a baking sheet.
  5. Let them sit for 30 minutes to form a skin.
  6. Bake at 150°C for 15-18 minutes.
  7. Cool and sandwich with filling.
  `
}, 

{
  id: '2',
  title: 'Tarte Tatin',
  fullTitle: 'Tarte Tatin: A Serendipitous Masterpiece of French Cuisine',
  image: require('../../../assets/images/recipeImgs/tarte-tatin.jpg'),
  unlocked: false,
  article: `
  Tarte Tatin is not just an apple pie, but a symbol of French elegance and accidental culinary genius. Legend has it that this dish was created by accident when one of the Tatin sisters overturned a pie in the oven and, to save it, served it upside down. This inverted pie with caramelized apples quickly gained popularity.

    Key to Success:    
  The magic of tarte Tatin lies in the caramel. The secret is to make sure the caramel is perfectly balanced—not too bitter, yet not overly sweet. The pie pairs wonderfully with a scoop of vanilla ice cream, accentuating the warm and sweet notes of the apples.
  `,
  recipe: ` 
    Ingredients:  
  - 200 g puff pastry
  - 6 apples
  - 100 g sugar
  - 100 g butter
  - Pinch of cinnamon
  `,
  instructions: `
    Instructions:  
  1. Peel and slice apples.
  2. In a pan, melt butter and sugar until caramel forms.
  3. Add apples to the caramel and cook for 10 minutes.
  4. Cover the apples with rolled puff pastry.
  5. Bake for 25-30 minutes at 180°C.
  6. Invert the tart onto a plate before serving.
  `
}, 

{
  id: '3',
  title: 'Sacher Torte',
  fullTitle: 'Sacher Torte: The Chocolate Symbol of Vienna',
  image: require('../../../assets/images/recipeImgs/sacher-torte.jpg'),
  unlocked: false,
  article: `
  The Sacher torte is an Austrian culinary masterpiece with a rich history. Its creator, Franz Sacher, invented this dessert in 1832 while working for Viennese Prince Metternich. Since then, the cake has become a true hallmark of Viennese cafés.

    Tradition:    
  What makes this cake unique? First of all, its rich chocolate texture and a layer of apricot jam, which adds a slight tang. The cake is topped with a shiny chocolate glaze. Each year, Vienna hosts tournaments to determine the best Sacher torte, with top pastry chefs from around the world competing.
  `,
  recipe: `
    Ingredients:  
  - 150 g dark chocolate
  - 150 g butter
  - 150 g sugar
  - 6 eggs
  - 130 g flour
  - Apricot jam
  - Chocolate glaze
  `,
  instructions: `
    Instructions:  
  1. Melt chocolate and butter in a double boiler.
  2. Whisk egg yolks with half the sugar until fluffy.
  3. In another bowl, whisk egg whites with remaining sugar until stiff.
  4. Fold the chocolate mixture into the yolks, then add flour, and carefully fold in the whipped egg whites.
  5. Bake at 170°C for 40-50 minutes.
  6. Slice the cooled cake, spread with apricot jam, and coat with chocolate glaze.
  `
}, 

{
  id: '4',
  title: 'Croquembouche',
  fullTitle: 'Croquembouche: The French Pyramid of Festive Luxury',
  image: require('../../../assets/images/recipeImgs/croquembouche.jpg'),
  unlocked: false,
  article: `
  Croquembouche, literally meaning "crunch in the mouth," is an impressive tower of cream puffs bound with caramel. Traditionally served at weddings and celebrations, it symbolizes abundance and luxury.

    Tradition:    
  Croquembouche is often adorned with golden threads of caramel that wrap around the tower, creating a stunning spectacle. This dessert requires skill in preparing caramel and assembling the pyramid without it collapsing. It’s quite the show when the caramel stretches as each puff is pulled away, and guests break apart the towering creation.
  `,
  recipe: `
    Ingredients:  
  - 250 ml water
  - 100 g butter
  - 150 g flour
  - 4 eggs
  - Vanilla cream
  - 200 g sugar for caramel
  `,
  instructions: `
    Instructions:  
  1. Boil water with butter, add flour, and stir until the dough forms.
  2. Add eggs one at a time and mix well.
  3. Pipe dough onto a baking sheet and bake at 200°C for 20 minutes.
  4. Fill profiteroles with vanilla cream.
  5. Make caramel, dip each profiterole in it, and assemble a tower.
  `
}, 

{
  id: '5',
  title: 'Pavlova',
  fullTitle: 'Pavlova: Lightness and Elegance on Your Table',
  image: require('../../../assets/images/recipeImgs/pavlova.jpg'),
  unlocked: false,
  article: `
  This airy dessert, named after the famous Russian ballerina Anna Pavlova, symbolizes her grace and lightness. Served with delicate cream and fresh fruit, pavlova combines a crispy exterior with a soft meringue center.

    Fun Fact:    
  Although pavlova is associated with Russia due to its name, its origin is either Australia or New Zealand. Both countries still argue over who created it first. Regardless of its origins, pavlova has become a staple on holiday tables worldwide.
  `,
  recipe: `
    Ingredients:  
  - 4 egg whites
  - 200 g sugar
  - 1 tsp cornflour
  - 1 tsp vinegar
  - Vanilla cream and berries for garnish
  `,
  instructions: `
    Instructions:  
  1. Whisk egg whites until foamy, gradually adding sugar.
  2. Fold in cornflour and vinegar.
  3. Shape the meringue into a circle on a baking sheet and bake at 120°C for 90 minutes.
  4. Garnish with whipped cream and fresh berries.
  `
}, 

{
  id: '6',
  title: 'Baklava',
  fullTitle: 'Baklava: The Sweet Eastern Temptation',
  image: require('../../../assets/images/recipeImgs/baklava.jpg'),
  unlocked: false,
  article: `
  Baklava is a symbol of luxury and sweetness in the East. This dessert, made of the thinnest phyllo dough, nuts, and honey, has centuries-old roots and traces back to the Ottoman Empire. Baklava is popular in Turkey, Greece, the Middle East, and beyond.

    Fun Fact:    
  It's said that the recipe for baklava was passed down from generation to generation among Ottoman sultans, and this dish was considered so exquisite that only royal chefs could prepare it. The key to a successful baklava is in the skill of making phyllo dough: the thinner the layers, the better.
  `,
  recipe: `
    Ingredients:  
  - 400 g phyllo dough
  - 300 g walnuts
  - 200 g butter
  - 300 g sugar
  - 100 ml water
  - 100 ml honey
  `,
  instructions: `
    Instructions:  
  1. Layer phyllo dough sheets, brushing each with butter.
  2. Spread chopped nuts between the layers.
  3. Bake at 180°C for 45 minutes.
  4. Make syrup from sugar, water, and honey, and pour over the hot baklava.
  `
}, 

{
  id: '7',
  title: 'Mille-feuille',
  fullTitle: 'Mille-feuille: A Thousand Layers of Sweet Perfection',
  image: require('../../../assets/images/recipeImgs/mille-feuille.jpg'),
  unlocked: false,
  article: `
  Mille-feuille, also known as "Napoleon," is a classic French pastry consisting of layers of crispy puff pastry and cream. The name means "a thousand layers," emphasizing the delicate and complex nature of the dessert.

    Fun Fact:    
  Pastry masters compete to create the thinnest and airiest layers of pastry. The dessert originated in the 17th century, but the modern version appeared thanks to 19th-century French pastry chefs. Today, it’s served with various fillings, including cream, fruits, and jams.
  `,
  recipe: `
    Ingredients:  
  - 500 g puff pastry
  - 500 ml milk
  - 3 egg yolks
  - 100 g sugar
  - 50 g flour
  - Vanilla
  `,
  instructions: `
    Instructions:  
  1. Bake puff pastry at 200°C until golden.
  2. Make cream by whisking egg yolks with sugar, adding flour and hot milk, and cooking over low heat.
  3. Assemble the dessert by alternating layers of pastry and cream.
  `
}, 

{
  id: '8',
  title: 'Opera Cake',
  fullTitle: 'Opera Cake: A Musical Symphony of Flavors',
  image: require('../../../assets/images/recipeImgs/opera-cake.jpg'),
  unlocked: false,
  article: `
    Opera cake is a French masterpiece with many layers that resemble parts of an operatic symphony: almond sponge cake, coffee cream, and chocolate glaze create a harmonious combination of flavors. The dessert was created in the 1950s at Parisian patisserie Dalloyau.

    Fun Fact:    
  The opera cake is said to have been named after the grand opera houses of Paris. Each layer of this cake requires separate preparation, and its creation is a true art. This dessert is prized for its rich and balanced flavor, as well as its visual appeal.
  `,
  recipe: `
    Ingredients:  
  - 6 eggs
  - 150 g sugar
  - 100 g flour
  - 100 g almond flour
  - Coffee buttercream
  - Chocolate glaze
  `,
  instructions: `
    Instructions:  
  1. Whisk eggs with sugar, fold in the flour and almond flour.
  2. Bake sponge layers at 180°C for 20 minutes.
  3. Layer the cake with coffee buttercream and cover with chocolate glaze.
  `
}, 

{
  id: '9',
  title: 'Gold-leaf Chocolate Truffle',
  fullTitle: 'Gold-leaf Chocolate Truffle: Chocolate with a Touch of Luxury',
  image: require('../../../assets/images/recipeImgs/gold-leaf.jpg'),
  unlocked: false,
  article: `
  Gold-leaf chocolate truffles are a symbol of refined taste and high class. These desserts grace the tables at elite events, and their exquisite flavor and appearance showcase the mastery of pastry chefs.

    Fun Fact:    
  The gold leaf used to adorn these truffles is edible and safe. It's believed that gold has health benefits, although this is more myth than fact. Nonetheless, these truffles add an element of luxury to any event, making it unforgettable.
  `,
  recipe: `
    Ingredients:  
  - 200 g dark chocolate
  - 100 ml cream
  - 50 g butter
  - Edible gold for decoration
  `,
  instructions: `
    Instructions:  
  1. Melt chocolate, cream, and butter in a double boiler.
  2. Chill the mixture and roll into truffles.
  3. Decorate with edible gold.
  `
}, 

{
  id: '10',
  title: 'Strawberry Fraisier',
  fullTitle: 'Strawberry Fraisier: Summer Freshness in a French Dessert',
  image: require('../../../assets/images/recipeImgs/strawberry-fraisier.jpg'),
  unlocked: false,
  article: `
  Fraisier is a French strawberry cake that’s perfect for summer celebrations. Juicy berries, cream, and light sponge cake make it a true gem in French pastry culture.

    Fun Fact:    
  Fraisier is considered one of the best French desserts due to its perfect balance of sweetness and freshness. It’s named after strawberries ("fraise" in French). This cake is often served at weddings and festive events and has become a symbol of summer and sunshine.
  `,
  recipe: `
    Ingredients:  
  - 200 g strawberries
  - 4 eggs
  - 100 g sugar
  - 100 g flour
  - 300 ml cream
  - Vanilla
  `,
  instructions: `
    Instructions:  
  1. Whisk eggs with sugar, add flour, and bake at 180°C for 20 minutes.
  2. Whip cream with vanilla and fold in strawberries.
  3. Assemble the cake and garnish with fresh berries.
  `
}

];

export default function RecipeBook({ navigation, articles }) {
  const { winMode, topicId } = useContext(QuizContext);
  const [articlesAndRecipes, setArticlesAndRecipes] = useState(articlesID);
  const [userArticles, setUserArticles] = useState([]); 

  useEffect(() => {
    if (winMode && topicId) {
      console.log('Topic ID:', topicId);
    }
  }, [winMode, topicId]);

  // Function to save articles to local storage
  const saveArticles = async (updatedArticles) => {
    try {
      await AsyncStorage.setItem('articlesAndRecipes', JSON.stringify(updatedArticles));
    } catch (error) {
      console.error('Failed to save articles:', error);
    }
  };

  const loadArticles = async () => {
    try {
      const savedArticles = await AsyncStorage.getItem('articlesAndRecipes');
      if (savedArticles !== null) {
        setArticlesAndRecipes(JSON.parse(savedArticles));
      } else {
        // If no saved articles, save the default articles with topicId
        saveDefaultArticles();
      }
    } catch (error) {
      console.error('Failed to load articles:', error);
      // Also save the default articles if loading fails
      saveDefaultArticles();
    }
  };

  const saveDefaultArticles = async () => {
    try {
      await AsyncStorage.setItem('articlesAndRecipes', JSON.stringify(articlesID));
      console.log('Default articles saved.');
    } catch (error) {
      console.error('Failed to save default articles:', error);
    }
  };

  useEffect(() => {
    // Load saved progress on component mount
    loadArticles();
  }, []);

  const updateArticlesState = async (updatedArticles) => {
    setArticlesAndRecipes(updatedArticles); // Update the state immediately
    await saveArticles(updatedArticles); // Save to AsyncStorage
  };

  useEffect(() => {
    if (winMode && topicId) {
      if (topicId === '10') {
        Alert.alert('Congratulations, you unlocked all articles!');
      }

      setArticlesAndRecipes((prevArticles) => {
        const updatedArticles = prevArticles.map((article) => {
          if (article.id === topicId) {
            return { ...article, unlocked: true };
          }
          return article;
        });

        // Save the updated state to AsyncStorage
        updateArticlesState(updatedArticles);
        // saveArticles(updatedArticles);

        return updatedArticles;
      });
    }
  }, [winMode, topicId]);

  const renderRecipe = ({ item }) => (
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
    </TouchableOpacity>
  );
  

  return (
    <ImageBackground 
  source={require('../../../assets/images/bcgr.jpeg')} // Background image
  style={styles.container}
  blurRadius={3}
>
  <FlatList
    data={[...articlesAndRecipes]} // Combine data for both FlatLists
    renderItem={renderRecipe}
    keyExtractor={(item, index) => item.id ? item.id : `title-${index}`} // Unique keys for articles and title
    numColumns={2}
    contentContainerStyle={styles.forFlatList} // Styles for the content
    ListFooterComponent={<UsersTopics userArticles={userArticles} setUserArticles={setUserArticles} navigation={navigation}/>} // User topics at the bottom
    nestedScrollEnabled={true}
  />
</ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8DDF3',
    padding: 10,
    paddingTop: 50,
    paddingBottom: 80
  },
  forFlatList: {
    // paddingBottom: 70
  },
  recipeItem: {
    // flex: 1,
    width: '45%',
    margin: 10,
    borderRadius: 25,
    elevation: 5,
    backgroundColor: '#00000080',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: 15,
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
  recipeImage: {
    width: 150,
    height: 150,
    borderRadius: 20,
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
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});