import React, { useState, useContext, useEffect, cloneElement, useRef } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Animated, TouchableOpacity, Image, ImageBackground, ScrollView, Alert } from 'react-native';
import { CoinContext } from '../../CoinProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UsersContent from '../UsersContent';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

export const resetPurchases = async (topics, setTopics) => {

  try {
    // Reset the purchased flag for all topics
    const resetTopics = topics.map(t => ({ ...t, purchased: false }));

    // Update topics in state immediately
    setTopics(resetTopics);

    // Save the reset topics to AsyncStorage
    await AsyncStorage.setItem('purchasedTopics', JSON.stringify(resetTopics));

  } catch (error) {
    console.error('Failed to reset purchases or save to AsyncStorage:', error);
  }
};


export default function Magazine () {
  const { totalCoins, setTotalCoins } = useContext(CoinContext);
  const [topics, setTopics] = useState([
    {
      id: 1,
      title: "Sweet Legends",
      description: "These articles highlight how accidental discoveries and lucky moments have changed the history of sweets, turning mistakes or experiments into culinary masterpieces. They demonstrate that luck often accompanies creativity, especially in the kitchen, and how such moments can become a part of our everyday culture.",
      purchased: false,
      image: require('../../../assets/images/topicsImgs/sweet-legend.jpeg'),
      articles: [
        {
          title: "Chocolate Chip Cookies",
          content: `
            Chocolate Chip Cookies: How One Accidental Invention Became a Global Phenomenon
            
            The story of chocolate chip cookies is one of the most popular and inspiring legends in the culinary world. In 1930, Ruth Wakefield, the owner of the Toll House Inn in Massachusetts, decided to bake a batch of regular chocolate cookies for her guests. When she ran out of cocoa powder, she added chunks of semi-softened chocolate to the dough. To her surprise, instead of melting, the chocolate pieces retained their shape, creating a unique texture and flavor.

            This "accidental" discovery quickly won the hearts of her guests. Soon, the recipe spread across the country, becoming Ruth Wakefield’s signature creation. Nestlé, inspired by the recipe’s popularity, even made an agreement with her, gaining the right to print the recipe on their chocolate packaging, while Ruth received a lifetime supply of chocolate in return. Chocolate chip cookies became so popular that they are now considered a symbol of American culture. This story shows how luck and chance can turn a simple mistake into a culinary masterpiece loved by millions worldwide.
          `
        },
        {
          title: "Toffee",
          content: `
            Toffee: From Mistake to Classic Sweet

            The story of toffee begins with a culinary mistake that turned into a legend. In the 19th century, one of the earliest known cases of toffee creation occurred when a British confectioner accidentally overheated a mixture of sugar and butter, expecting to make caramel. Instead of smooth caramel, he ended up with a hard, chewy product with a unique texture and delightful flavor—thus, toffee was born.
          
            This "failure" quickly gained popularity among sweet lovers. Soon, confectioners around the world began experimenting with different recipe variations, adding milk, cream, and even chocolate. Toffee became an important part of confectionery culture and was praised for its versatility. Today, toffee can be found in various forms around the world—from classic hard toffees to soft, creamy candies.

            This accidental success showed that sometimes a recipe mistake can open new culinary horizons and lead to the creation of an entire category of sweets.
          `
        },
        {
          title: "Chocolate Truffle",
          content: `
            Chocolate Truffle: A Pastry Chef's Mistake That Became a Symbol of Luxury

            Chocolate truffles are not just a dessert; they are a symbol of luxury, elegance, and refinement. But few know that their creation resulted from an accidental mistake. In the early 20th century, French pastry chef August Esprit, while making a cream ganache, accidentally added too much hot cream to the chocolate. The result was unexpected—a thick, velvety mixture from which small balls could be formed. When these chocolate balls were dipped in melted chocolate and dusted with cocoa powder, the truffle was born.
          
            Initially, this mistake seemed insignificant, but truffles quickly gained popularity due to their exquisite taste and simple yet refined presentation. Later, chocolate truffles became a hallmark of elite confectionery shops and were given premium status, reserved for special occasions. Today, truffles can be found worldwide, from small cafés to luxurious chocolate boutiques.
            
            This story reminds us that sometimes an accidental mistake can lead to the creation of something truly unique and timeless, like the chocolate truffle.
          `
        },
        {
          title: "Ice Cream Sandwich",
          content: `
            Ice Cream Sandwich: The Accidental Invention That Became a Summer Icon

            The ice cream sandwich is a symbol of summer and childhood for many people, but its creation was more accidental than intentional. In the early 20th century, a New York street vendor stumbled upon a new way to serve dessert. In an attempt to offer something new to his customers, he experimented with the idea of "edible packaging" for ice cream. The result was placing a scoop of ice cream between two soft wafers. The new dessert was so convenient that it immediately won the hearts of locals.

            The ice cream sandwich became a hit at summer fairs, then at beaches and parks across the country. Its popularity grew rapidly, and soon confectionery companies began producing commercial versions of this treat. By the 21st century, the ice cream sandwich remained one of the most popular summer snacks, reminding people of carefree, joyful moments.

            This story shows how a simple experiment and a stroke of luck can lead to the creation of an iconic product that becomes a part of seasonal traditions and memories for millions worldwide.
          `
        }
      ]
    },

    {
      id: 2,
      title: "Following the Path of Sweet Success",
      description: "These stories highlight how a passion for sweets, perseverance, and fortunate opportunities helped these individuals build their empires in the confectionery world. Whether it's caramel or chocolate, their success proves that chance encounters can become the starting point for great achievements.",
      purchased: false,
      image: require('../../../assets/images/topicsImgs/traditions.jpeg'),
      articles: [
        {
          title: "Garage Bakery",
          content: `
            From a Garage Bakery to Millions: The Story of Charlotte Rachels

            Charlotte Rachels’ story is an example of how a love for sweets and a stroke of luck can lead to millions. In 2005, Charlotte began baking cupcakes in her kitchen for local celebrations. Her recipe, inherited from her grandmother, featured a unique ingredient—vanilla-flavored cream. Initially, she sold her desserts to local cafés, but one day, the owner of a coffee chain, after trying her cupcakes, offered her an exclusive supply contract.

            This event was the turning point. Charlotte quickly founded her own company, hired staff, and rented a small production space. Soon her cupcakes were available all over the city, and then nationwide. Today, the   "Rachel’s Cupcakes"   brand generates multimillion-dollar revenues, and Charlotte has opened her own chain of confectioneries. Her story is a vivid example of how perseverance and luck can lead to sweet success.
          `
        },
        {
          title: "The Italian Dream",
          content: `
            The Italian Dream: How Ferrero Built an Empire

            Few could have imagined that a small confectionery shop in a tiny Italian town would become the start of a globally recognized company. In 1946, Pietro Ferrero, an Italian baker and confectioner, decided to create a new product—a chocolate-hazelnut spread. At the time, chocolate was expensive, so he mixed it with hazelnuts, creating an affordable and delicious cream. Thus, the legendary Nutella was born.
          
            Despite the challenges of the post-war years, the Ferrero family continued to grow their business. In the 1960s, Pietro’s son, Michele Ferrero, expanded the company, turning   Ferrero Rocher   into one of the most recognizable brands in the world of sweets. Today, the   Ferrero   company is a global corporation with billions in revenue, and   Nutella   has become a favorite breakfast treat for millions around the world. The Ferrero story proves that persistence, innovation, and boldness can lead to international success.  
          `
        },
        {
          title: "The Long Road to Success",
          content: `
            The Long Road to Success: The Story of Deborah Lindsay and Her Chocolate Empire

            Deborah Lindsay started her journey in the confectionery industry from scratch. In the 1990s, as a single mother, she decided to try her hand at cooking to support her family. At first, she made chocolate candies for friends and neighbors, experimenting with recipes. But her big break came when a chef from one of the city’s top restaurants noticed her and offered a contract to supply desserts.
            
            Deborah began growing her business, opening a small chocolate factory. Her signature truffle candies became incredibly popular. Fifteen years later, her brand   "Lindsay’s Chocolates"   gained international recognition. Today, her chocolates are sold in high-end stores around the world, and she continues to expand her business, showing how you can achieve success by starting small and believing in yourself.
          `
        },
        {
          title: "Caramel World",
          content: `
            How Vanilla de Gonzalez’s Perseverance Conquered the Caramel World

            Vanilla de Gonzalez is one of those individuals whose passion for creating sweets literally transformed her life. Growing up in a poor family in Argentina, she always dreamed of creating unique desserts. Her first success was making caramel candies inspired by family recipes. She started selling them at local markets, not realizing that her talent would soon open doors to great opportunities.
            
            Her breakthrough came when a tourist bought her candies and sent them to a renowned European confectionery chain. Soon, Vanilla received an invitation to participate in an international exhibition, where her products won numerous awards. Thus,   "Gonzalez Sweets"   was born, a company known for its innovative flavors and quality. Today, Vanilla's caramels are sold worldwide, and she has become one of the most successful confectioners in Latin America.
          `
        }
      ]
    },

    {
      id: 3,
      title: "Sweet Amulets",
      description: "These examples highlight how sweets can carry not only flavor but also the symbolism of luck. In different cultures, sweet amulets have become an important part of customs and celebrations, blending tradition with belief in a bright future.",
      purchased: false,
      image: require('../../../assets/images/topicsImgs/sweet-rit-trad.jpeg'),
      articles: [
        {
          title: "Fortune Cookies",
          content: `
            Fortune Cookies: Messages of Luck Wrapped in Sweetness

            One of the most famous symbols of luck in the world of sweets is the fortune cookie. Though commonly associated with Chinese cuisine, the fortune cookie actually originated in America in the early 20th century. Its magic lies in the small slip of paper hidden inside, containing a prediction, wish, or advice for the future.

            Fortune cookies have become not only a symbol of Eastern wisdom but also a kind of "amulet" of luck. In many cultures, people believe that luck can come along with the message hidden inside the cookie. These treats are especially popular during holidays when people are seeking signs for a prosperous new year or phase in life.
          `
        },
        {
          title: "The Horseshoe Symbol",
          content: `
            The Horseshoe Symbol: How Caramel Becomes a Lucky Charm

            The horseshoe has long been considered a powerful symbol of luck, and this image is often used in the creation of sweets. In many countries, caramel or chocolate horseshoes are given during holidays or special events like weddings and housewarmings. It is believed that the horseshoe brings luck to the home if hung with its ends facing up, forming a kind of "bowl" to hold happiness.
          
            Sweet horseshoes can be found not only in candy shops but also at fairs, where they are bought as lucky talismans. They may be made from different materials—chocolate, marzipan, and more—but always carry the symbolism of prosperity and well-being.
          `
        },
        {
          title: "Golden Shortbread Cake",
          content: `
            Golden Shortbread Cake: An English Tradition of Sweet Luck

            In England, there is a tradition of baking shortbread cakes shaped like coins or with golden nuts and caramel pieces. These cakes symbolize not just the sweetness of life but also financial success and luck. During festive times, especially Christmas, these cakes are often served, with the belief that they bring prosperity to the household.
            
            Some bakers even add small golden amulets or charms into the dough, making each slice not only delicious but also symbolic. Finding such a "surprise" while eating is considered a sign that luck will shine on you in the near future.
          `
        },
        {
          title: "Japanese Omotenashi",
          content: `
            Japanese Omotenashi: Sweets as Attractors of Luck

            In Japanese culture, the symbolism of luck is deeply respected and appears in various forms, including sweets. Traditional Japanese confections known as   wagashi  , made from rice flour and bean paste, are often shaped like symbols of good fortune, such as plum blossoms, cranes, or turtles. Each of these symbols is associated with wishes for longevity, happiness, and harmony.
            
            At weddings and celebrations, omotenashi (the art of hospitality) often includes sweets that bring good fortune. Sweet symbols are presented to guests as a token of gratitude and a wish for well-being, making them an essential part of Japanese rituals.
          `
        }
      ]
    },

    {
      id: 4,
      title: "Tasty Secrets",
      description: "These examples illustrate how rituals and traditions in different cultures are linked to the preparation of sweets and beliefs in luck. Sweet dishes often become not just treats but powerful symbols that bring happiness, health, and prosperity into the home.",
      purchased: false,
      image: require('../../../assets/images/topicsImgs/hidden-sweet.jpg'),
      articles: [
        {
          title: "Christmas Pudding",
          content: `
            Christmas Pudding: A Family Ritual and Symbol of Prosperity

            In England, the tradition of making Christmas pudding comes with a special ritual believed to bring good fortune. According to custom, the whole family gathers to mix the ingredients, and each member is supposed to make a wish while stirring the pudding clockwise. A coin or small charms are often added to the pudding, symbolizing wealth and happiness.

            This ritual not only strengthens family bonds but, according to folklore, also ensures that the pudding will be especially lucky and a symbol of prosperity for the coming year. Participation from all family members is believed to enhance the success and fortune associated with the pudding.
          `
        },
        {
          title: "Mooncakes",
          content: `
            Mooncakes: A Chinese Tradition of Luck and Well-Being

            During the Chinese Mid-Autumn Festival, one of the key traditions is making and eating mooncakes. These round pastries symbolize family unity and completeness, with fillings that can be sweet or savory. Many believe that eating these cakes during the full moon brings good fortune and harmony.
          
            Mooncakes are often decorated with symbols of luck, happiness, and longevity. Sharing and eating them with loved ones is both a family ritual and a way to attract happiness and balance into the home.
          `
        },
        {
          title: "Carnival Donuts",
          content: `
            Carnival Donuts: A Symbol of Luck during Shrovetide

            Shrovetide (Maslenitsa) is a vibrant festival in Slavic countries where making pancakes and sweet donuts is a central tradition. These sweets symbolize the sun and the arrival of spring, and the process of preparing them is associated with rituals believed to bring good fortune.
            
            It is often said that the number of pancakes or donuts made during Shrovetide can predict the amount of luck for the year ahead. The more that are baked, the more prosperous and fertile the coming year is believed to be. Some cooks even make wishes while flipping the first pancake or frying donuts, believing that this act will bring happiness.
          `
        },
        {
          title: "Día de los Muertos",
          content: `
            Día de los Muertos: Luck through Sweets in Mexican Tradition

            In Mexico, during Día de los Muertos (Day of the Dead), sweets play a special role in honoring deceased loved ones. Among these sweets are sugar skulls, which symbolize not only remembrance but also luck, health, and well-being in life.
            
            Traditional sweets like "pan de muerto" — a sweet, anise-flavored bread — are prepared and placed on altars with great respect for spiritual traditions. It is believed that properly preparing and sharing these treats with family can attract happiness and good fortune throughout the year.
          `
        }
      ]
    },

    {
      id: 5,
      title: "Sweet Treasure Hunt",
      description: "These articles illustrate how legends and myths about hidden confections can inspire people to seek out and embark on adventures. Sweets become not only a treat but also part of captivating stories, turning the search for treasures into a true art form.",
      purchased: false,
      image: require('../../../assets/images/topicsImgs/sweet-rituals.jpg'),
      articles: [
        {
          title: "Chocolate Golden Secrets",
          content: `
            Chocolate Golden Secrets: The Story of Christmas Figures

            In the early 20th century in Switzerland, one of the most famous confectionery companies decided to make Christmas even more magical. They hid small golden figures in Christmas chocolate sets, which were sold in limited quantities. These figures were part of a legendary promotional campaign.

            The legend has it that finding these golden figures not only brought a sweet treat but also significant monetary prizes. The story of these hidden treasures inspired many to search and collect, turning chocolate sets into coveted treasures for true fortune seekers.
          `
        },
        {
          title: "The Lollipop Map Mystery",
          content: `
            The Lollipop Map Mystery: Hunting in the Candy Labyrinth

            In the 1960s in the United States, an exciting advertisement was created for a popular lollipop brand. As part of the campaign, a lollipop map was designed, indicating that special lollipops with golden wrappers were hidden across the country. These lollipops were "keys" to mysterious prizes such as free yearly supplies of sweets or even large cash rewards.
          
            The storyline of this campaign inspired entire generations of explorers and sweet enthusiasts to search for sweet treasures. Search games were organized in various cities, creating real adventures and drawing attention to the brand. This story remains an example of how sweets can become part of an engaging quest.
          `
        },
        {
          title: "Searching for Forgotten Recipes",
          content: `
            The Chocolate Treasure Hunter's Secret: Searching for Forgotten Recipes

            The legend of the chocolate treasure hunter came from France in the early 1900s. A certain chocolatier, known for his unique recipes, left behind encrypted clues about his "sweet treasure" — a recipe for a special chocolate that was rumored to have a unique taste and qualities. His will contained a quest that led seekers to various parts of the country.
            
            Many people tried to decipher the riddles and find the recipe, turning it into a cult adventure among gourmets and chocolatiers. This story of the quest attracted a large number of participants and continues to inspire the search for unique recipes and sweet secrets.
          `
        },
        {
          title: "The Candy Cache",
          content: `
            The Candy Cache: The Tale of Ancient Sweet Seekers

            In ancient cultures, such as ancient Egypt and the Roman Empire, there are myths about candy caches that were hidden for future generations. According to legend, these sweets were not only delicacies but also carriers of magical properties, capable of bringing luck and health.
            
            Stories of hidden candy caches formed the basis of many search quests and legends, in which seekers of sweet treasures aimed to find not only delicious treats but also magical artifacts. These ancient myths continue to inspire modern adventure stories and games, merging the richness of history with the search for sweet treasures.
          `
        }
      ]
    },

    {
      id: 6,
      title: "Sweet Choice",
      description: "These articles highlight how strategic decisions and choices in production and marketing can significantly impact success in the confectionery industry. Whether it’s adopting innovative technologies, focusing on sustainability, or pursuing global expansion, each choice can be a crucial factor in shaping success and fortune in the sweet business.",
      purchased: false,
      image: require('../../../assets/images/topicsImgs/history-of-chocolate.jpg'),
      articles: [
        {
          title: "Key Choices",
          content: `
            From Serendipitous Discovery to Global Brand: How Key Choices Led Lindt to Success

            Lindt, renowned for its premium chocolates, achieved success through strategic decisions and innovative approaches. One pivotal moment was their investment in the unique conching process—a method that makes chocolate smoother and more aromatic. This choice, made in the late 19th century, was crucial in creating their distinctive flavor.

            Additionally, Lindt focused on expanding its product range and creating exclusive collections, which helped it become a global brand. Thus, decisions related to production technology and product portfolio played a key role in shaping their success.
          `
        },
        {
          title: "Cocoa Farmers",
          content: `
            Cocoa Farmers and Sustainable Development: How Informed Choices Drive Success for Theo Chocolate

            Theo Chocolate, based in the United States, is an example of a company that prioritized sustainability and fair trade. One key decision was to partner with cocoa farmers from Latin America, implementing fair trade practices and sustainable farming methods.
          
            This choice not only resulted in high-quality chocolate but also strengthened relationships with farmers, helping the company establish itself as a leader in ethical production. Theo Chocolate leverages its sustainability choices as a competitive advantage, contributing to its market success.
          `
        },
        {
          title: "Market Strategy",
          content: `
            Innovation and Market Strategy: How Strategic Choices Fueled Ben & Jerry's Success

            Ben & Jerry's, known for its unique ice cream flavors, prioritized innovation and creativity from the start. One successful decision was the introduction of "chunky" elements in their ice cream, creating distinctive flavor combinations and textures.
            
            This choice helped the company stand out from competitors and build a loyal customer base. Ben & Jerry's also leveraged marketing campaigns linked to social and environmental issues, further strengthening their brand and attracting customers who share their values.
          `
        },
        {
          title: "Global Success",
          content: `
            From Family Business to Global Success: How Key Choices Fueled Godiva’s Growth

            Godiva, founded in Brussels in 1926, evolved from a small confectionery shop into a global leader in chocolate production. A pivotal decision was to expand into international markets and position the brand as a premium luxury product.
            
            Launching boutiques in key cities around the world and developing exclusive products allowed Godiva to establish itself as a symbol of luxury and quality. These decisions helped the company secure a strong position in the global market and achieve sustained success in the confectionery industry.
          `
        }
      ]
    },

    {
      id: 7,
      title: "Lucky Ingredients",
      description: "These articles show how certain ingredients can not only enhance the flavor of sweets but also add an element of luck and symbolic meaning to their preparation. Using lucky ingredients helps create sweets that attract attention and achieve success in the market.",
      purchased: false,
      image: require('../../../assets/images/topicsImgs/lucky-ingr.jpeg'),
      articles: [
        {
          title: "Chocolate and Happiness",
          content: `
            Chocolate and Happiness: How Cocoa Contributes to Success in Sweets

            Chocolate is not only a beloved treat around the world but also a symbol of happiness and luck in many cultures. In Latin American countries, where cocoa originates, it is often associated with prosperity and success. Using high-quality cocoa in sweets can be a key factor in their popularity and success in the market.

            For example, companies like Lindt and Godiva pay special attention to the selection and processing of cocoa beans to create chocolate with rich flavor and aroma. This attention to ingredients helps them stand out from competitors and gain consumer recognition. Thus, cocoa not only enhances taste but also adds an element of luck and success to sweet production.
          `
        },
        {
          title: "Sweet Success",
          content: `
            Honey as a Symbol of Longevity: The Impact of Honey on Sweet Success

            Honey is considered a symbol of longevity and prosperity in various cultures. In ancient Egypt, honey was used as a gift to the gods, and in Greece, it was associated with wealth and immortality. These ancient associations make honey not only a delicious but also a lucky ingredient for sweets.
          
            Modern confectioners use honey in recipes for cakes, candies, and caramels to add natural sweetness and depth of flavor. For instance, honey combined with nuts and spices is often used in traditional Middle Eastern sweets like baklava. Honey not only improves texture and taste but also connects sweets with a history of luck and well-being.
          `
        },
        {
          title: "Citrus Fruits",
          content: `
            Citrus Fruits: How Lemons and Oranges Bring Luck to Sweets

            Citrus fruits, such as lemons and oranges, are considered symbols of luck and cleansing in various cultures. In Japan, for example, lemon is associated with purification and freshness, while in some European countries, oranges symbolize prosperity and joy.
            
            Using citrus fruits in sweets, such as lemon pies, orange candies, and fruit ganaches, helps not only to refresh the taste but also to add an element of luck to desserts. Chefs often choose citrus fruits to create vibrant and appealing sweet treats that can attract attention and admiration from consumers.
          `
        },
        {
          title: "Nuts and Luck",
          content: `
            Nuts and Luck: How Hazelnuts and Almonds Contribute to Sweet Success

            Nuts, such as hazelnuts and almonds, are often associated with luck and protection in various cultures. In the Mediterranean, nuts were used in rituals to attract luck and well-being. These ingredients add not only flavor and texture but also cultural significance to sweets.
            
            Traditional sweets, such as Italian panettone and French chocolate truffles with nuts, demonstrate how nuts can become an important part of successful recipes. Nuts are often used in premium-class sweets, giving them a special flavor and creating associations with luck and wealth. This ingredient helps confectioners stand out from competitors and attract the attention of buyers.
          `
        }
      ]
    },

    {
      id: 8,
      title: "Sweet Omens",
      description: "These articles illustrate how sweets play a significant role in the culture of luck and happiness, linking omens and traditions with joyful moments in life. Sweet treats not only delight the palate but also create a special atmosphere conducive to positive emotions and good fortune.",
      purchased: false,
      image: require('../../../assets/images/topicsImgs/sweet-omens.jpg'),
      articles: [
        {
          title: "Birthday Cake",
          content: `
            Birthday Cake: A Sweet Symbol of Luck and Happiness

            A birthday cake is more than just a treat; it's a significant symbol in celebration traditions. In various cultures, there are many omens and superstitions associated with the cake. For example, in Germany, there's a tradition of making a wish before blowing out the candles. It’s believed that if the wish is kept secret and the candles are extinguished on the first try, the wish will come true.

            Additionally, in some cultures, it's customary to leave a piece of the cake until the next day to attract good fortune in the coming year. This ritual helps create an atmosphere of happiness and prosperity throughout the year, making the birthday not only a special event but also a moment for bringing luck into one's life.
          `
        },
        {
          title: "Chocolate Candies",
          content: `
            Chocolate Candies as Symbols of Love and Happiness

            Chocolate candies are not just a delicious treat but also symbols of love and happiness. In Western culture, chocolate is a classic gift for Valentine’s Day, associated with romance and joy. However, there are also numerous superstitions related to chocolate.
          
            For instance, in some countries, it is believed that giving chocolate for New Year’s will attract luck and financial prosperity. Additionally, consuming chocolate in moderation throughout the day is thought to bring joy and improve mood. These superstitions highlight the special significance of chocolate in the culture of sweets, influencing feelings of happiness and luck.
          `
        },
        {
          title: "New Year's Cookies",
          content: `
            New Year's Cookies: How Omens and Rituals Attract Luck

            New Year's cookies, especially in festive shapes like stars and hearts, play an important role in New Year celebrations. In some countries, it is customary to bake cookies with specific symbols that are believed to attract good fortune.
            
            One widespread superstition is that baking cookies with New Year’s symbols (such as stars and snowflakes) helps to bring happiness and luck in the coming year. It is also believed that cookies baked in the company of friends and family symbolize unity and bring good fortune in personal life. These traditions create an atmosphere of joy and well-being during the holidays.
          `
        },
        {
          title: "Sweet Traditions",
          content: `
            Sweet Traditions on Saint Nicholas Day: How Lollipops and Pastries Bring Luck

            On Saint Nicholas Day, celebrated in various countries in early December, there are many traditions related to sweets. One such custom is the preparation and giving of sweet treats like lollipops and pastries.
            
            It is believed that giving sweets on this day attracts luck and protects from evil spirits. For example, in Germany, it is customary to place lollipops and pastries in children’s shoes, symbolizing gifts and good fortune for the entire year. In some countries, there is also a tradition of making special sweet dishes in the shape of symbols of luck, such as stars and angels. These sweet traditions help create a festive atmosphere and bring happiness into the home.
          `
        }
      ]
    },
  ]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showArticles, setShowArticles] = useState(false);
  const [userTopics, setUserTopics] = useState([]); // New state for user-added topics
  const priceValue = 1500;

  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const saveUserTopics = async (topics) => {
    try {
      await AsyncStorage.setItem('userTopics', JSON.stringify(topics));
    } catch (error) {
      console.error("Error saving user topics:", error);
    }
  };

  const onHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationX > 50) {
        // Swipe right to go back
        handleBack(); // Call your existing handleBack function
      }
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
      
      translateX.setValue(0);
    }
  };
  
  useEffect(() => {
    const loadPurchasedTopics = async () => {
      try {
        const savedPurchasedTopics = await AsyncStorage.getItem('purchasedTopics');
        const savedUsersTopics = await AsyncStorage.getItem('userTopics'); // Load user topics
  
        if (savedPurchasedTopics) {
          setTopics(JSON.parse(savedPurchasedTopics));
        } else {
          console.log('No purchased topics found, setting to default topics.');
          await AsyncStorage.setItem('purchasedTopics', JSON.stringify(topics));
        }
  
        // Load user topics if they exist
        if (savedUsersTopics) {
          setUserTopics(JSON.parse(savedUsersTopics));
        }
      } catch (error) {
        console.error('Failed to load purchased topics:', error);
        console.log('Resetting to default topics due to error.');
        await AsyncStorage.setItem('purchasedTopics', JSON.stringify(topics));
      }
    };
  
    loadPurchasedTopics();
  }, []);
  
  // Handle topic selection for both purchased and user topics
  const handleSelectTheme = (topic, isUserContent = false) => {
    setSelectedTopic({ ...topic, isUserContent }); // Mark if it's user content
  };
  
  // Skip purchase logic for user-added topics
  const handleBuyTopic = async () => {
    if (selectedTopic.isUserContent) {
        setShowArticles(true); // Directly show articles if it's user content
    } else if (totalCoins >= priceValue && !selectedTopic.purchased) {
        const updatedTotalCoins = totalCoins - priceValue;
        setTotalCoins(updatedTotalCoins);

        const updatedTopics = topics.map(t => 
            t.id === selectedTopic.id ? { ...t, purchased: true } : t
        );
        setTopics(updatedTopics);  
        setSelectedTopic({ ...selectedTopic, purchased: true });
        await AsyncStorage.setItem('purchasedTopics', JSON.stringify(updatedTopics));

        setShowArticles(true);
    } else if (selectedTopic.purchased) {
        setShowArticles(true);
    } else {
        // If the user doesn't have enough coins, show an alert
        Alert.alert(
            'Insufficient Points',
            `You need ${priceValue - totalCoins} more points to purchase this article.`,
            [{ text: 'OK' }]
        );
    }
};
  
  // Handle article selection
  const handleSelectArticle = (article) => {
    setSelectedArticle(article);
  };
  
  // Handle Back button
  const handleBack = () => {
    if (selectedArticle) {
      console.log('Going back from article');
      setSelectedArticle(null);
    } else if (showArticles) {
      console.log('Going back from articles');
      setShowArticles(false);
      setSelectedTopic(null);
    } else {
      console.log('Going back to topic selection');
      setSelectedTopic(null);
    }
  };

  const handleRemoveTopic = (id) => {
    const updatedTopics = userTopics.filter(topic => topic.id !== id);
    setUserTopics(updatedTopics);
    saveUserTopics(updatedTopics); // Save the updated topics after removing the item
  };

  
  return (
    <ImageBackground
      source={require('../../../assets/images/bcgr.jpeg')} 
      style={styles.container}
      blurRadius={3}
    >
    <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
    <Animated.View style={{ transform: [{ translateX }] }}>
      
      {!selectedTopic ? (
        <FlatList
        data={[...topics, ...userTopics]} // Combine purchased and user-added topics
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListFooterComponent={<UsersContent userTopics={userTopics} setUserTopics={setUserTopics}/>}
        renderItem={({ item }) => {
          const isUserTopic = userTopics.some(userTopic => userTopic.id === item.id);
          return (
            <TouchableOpacity 
              style={styles.themeCard} 
              onPress={() => handleSelectTheme(item, isUserTopic)}
            >
              <Image 
                source={typeof item.image === 'string' ? { uri: item.image } : item.image} 
                style={[styles.themeImage]} 
              />
              <Text 
                style={[styles.themeTitle, { color: item.purchased || isUserTopic ? 'white' : '#FFD700' }]}
              >
                {item.title}
              </Text>
              
              {isUserTopic && (
                <TouchableOpacity 
                  style={styles.removeButton} 
                  onPress={() => handleRemoveTopic(item.id)}
                >
                  <Text style={[styles.removeButtonText]}>Remove</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      ) : !showArticles ? (
        <View style={[{marginTop: 30}]}>
          <ScrollView 
            contentContainerStyle={{ paddingBottom: 50, margin: 30 }} // Ensure no extra padding/margin
            showsVerticalScrollIndicator={false} // Optional: Hide scroll indicator
          >
          {!selectedTopic.isUserContent && (
            <View style={styles.priceBox}>
              <Text style={[styles.priceText]}>{totalCoins}  </Text>
              <Image style={styles.coinIcon} source={require('../../../assets/images/coin.png')} />
            </View>
          )}

          <View style={styles.selectedTopicDescriptionBox}>
            <Text style={styles.selectedTopicTitle}>{selectedTopic.title}</Text>
            <Text style={styles.selectedTopicDescription}>{selectedTopic.description}</Text>
          </View>

          {!selectedTopic.isUserContent && (
            <View style={styles.priceBox}>
              <Text style={styles.priceText}>Price: {priceValue}  </Text>
              <Image style={styles.coinIcon} source={require('../../../assets/images/coin.png')} />
            </View>
          )}

          <TouchableOpacity
              style={[
                  styles.viewButton,
                  selectedTopic.isUserContent || (selectedTopic.purchased || totalCoins >= priceValue) ? styles.enabledButton : styles.disabledButton,
              ]}
              onPress={handleBuyTopic}
              // disabled={!selectedTopic.isUserContent && !selectedTopic.purchased && totalCoins < priceValue}
          >
              <Text style={styles.viewText}>
                  {selectedTopic.isUserContent ? 'View Articles' : (selectedTopic.purchased ? 'View Articles' : totalCoins >= priceValue ? 'Buy An Article' : `Buy An Article`)}
              </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.backButton, {top: 20}]} onPress={handleBack}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          </ScrollView>
        </View>
      ) : !selectedArticle ? (
        <ScrollView>
          <Image source={typeof selectedTopic.image === 'string' ? { uri: selectedTopic.image } : selectedTopic.image} style={styles.topicImage} />
          {selectedTopic.articles.map((article, index) => (
            <TouchableOpacity key={index} style={styles.themeInArticlesBox} onPress={() => handleSelectArticle(article)}>
              <Text style={[styles.themeInArticlesText]}>{article.title}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={[styles.backButton, {marginBottom: 50}]} onPress={() => { setShowArticles(false); setSelectedTopic(null); }}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          
        </ScrollView>
      ) : (
        <View style={styles.infoBox}>
          <ScrollView contentContainerStyle={styles.info}>
            <Text style={styles.articleTitle}>{selectedArticle.title}</Text>
            <Text style={styles.articleContent}>{selectedArticle.content}</Text>
            <TouchableOpacity style={[styles.backButton, {marginBottom: 40}]} onPress={handleBack}>
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </Animated.View>
    </PanGestureHandler>
    </ImageBackground>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#fff',
    paddingBottom: 80
  },
  themeBox: {
    backgroundColor: '#00000080',
    borderRadius: 20, 
    width: 170,
    height: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 2
  },
  info: {
    backgroundColor: '#00000040', // Semi-transparent button color
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 40,
    alignItems: 'center',
    marginBottom: 20,
    // marginTop: 50,
    shadowColor: '#000', // Button shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Shadow for Android
    borderColor: '#FFD700',
    borderWidth: 2,
    width: 350,
    alignSelf: 'center',
  },
  infoBox: {
    marginBottom: 0
  },
  backButton: {
    backgroundColor: '#FFD700',
    padding: 12,
    borderRadius: 30,
    alignItems: 'center',
    width: 180,
    alignSelf: 'center',
    height: 40,
    top: 40
  },
  backText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#000',
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
  priceBox: {
    backgroundColor: '#00000040', // Semi-transparent button color
    paddingVertical: 5,
    borderRadius: 30,
    shadowColor: '#000', // Button shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Shadow for Android
    borderColor: '#FFD700',
    borderWidth: 2,
    width: 300,
    height: 50,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  themeInArticlesBox: {
    backgroundColor: '#00000040', // Semi-transparent button color
    // paddingVertical: 5,
    borderRadius: 30,
    shadowColor: '#000', // Button shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Shadow for Android
    borderColor: '#FFD700',
    borderWidth: 2,
    width: 300,
    // height: 50,
    alignSelf: 'center',
    marginTop: 20
  },
  themeInArticlesText: {
    marginVertical: 10,
    fontSize: 16,
    textAlign: 'center',
    color: 'gold',
    fontWeight: '900',
  },
  viewButton: {
    padding: 12,
    borderRadius: 30,
    alignItems: 'center',
    width: 'auto',
    alignSelf: 'center',
    height: 40,
    marginVertical: 20,
  },
  // Style when the button is enabled (purchased or enough coins)
  enabledButton: {
    backgroundColor: '#841584', // Original enabled color
  },
  // Style when the button is disabled (not purchased and not enough coins)
  disabledButton: {
    backgroundColor: '#777', // Darker when disabled
  },
  viewText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#FFFFFF', // Text color for the button
  },
  topicBox: {
    backgroundColor: '#FFD700',
    padding: 12,
    borderRadius: 30,
    alignItems: 'center',
    width: 320,
    alignSelf: 'center',
    marginBottom: 10,
  },
  themeCard: {
    // flex: 1,
    margin: 10,
    borderRadius: 25,
    elevation: 5,
    width: '45%',
    backgroundColor: '#00000080',
    alignItems: 'center', // Center contents within the card
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: 15,
    paddingHorizontal: 5,
    paddingTop: 5,
  },
  coinIcon: {
    width: 25,
    height: 25,
    alignSelf: 'center',
  },
  themeImage: {
    width: '100%',
    height: 100,
    borderRadius: 25,
  },
  themeTitle: {
    marginTop: 10,
    verticalAlign: 'center',
    fontWeight: '900',
    textAlign: 'center',
    color: '#FFD700',
    marginBottom: 5,
    height: 35
  },
  selectedTopicTitle: {
      top: 2,
      fontSize: 18,
      fontWeight: '900',
      color: '#FFD700',
      textAlign: 'center',
  },
  selectedTopicDescription: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', 
    textAlign: 'center',
    padding: 10
  },
  selectedTopicDescriptionBox: {
    backgroundColor: '#00000040', // Semi-transparent button color
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 40,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
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
  priceText: {
    marginVertical: 10,
    fontSize: 16,
    textAlign: 'center',
    color: 'gold',
    fontWeight: '900'
  },
  topicImage: {
    width: '90%',
    height: 200,
    borderRadius: 40,
    marginBottom: 20,
    marginTop: 40,
    alignSelf: 'center',
    borderColor: 'black',
    borderWidth: 2
  },
  articleButton: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#e3e3e3',
    borderRadius: 5,
    alignItems: 'center',
  },
  articleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  articleTitle: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 10,
    textAlign: 'center',
    color: 'white'
  },
  articleContent: {
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 10,
    color: '#FFD700',
  },
});