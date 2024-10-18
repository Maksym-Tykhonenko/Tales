import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, Button, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from 'react-native-reanimated-carousel';
import { Dimensions, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QuizContext } from '../QuizProvider';

const topicsID = [
      {
        id: '1',
        title: 'Sweet Legends',
        image: require('../../assets/images/topicsImgs/sweet-legend.jpeg'),
        unlocked: true,
        questions: [
          {
            question: 'Which ingredient was an accidental discovery in chocolate chip cookies?',
            options: [
              { text: 'Nuts', isCorrect: false },
              { text: 'Raisins', isCorrect: false },
              { text: 'Chocolate', isCorrect: true },
            ],
          },
          {
            question: 'Who invented chocolate truffles?',
            options: [
              { text: 'Pierre Herme', isCorrect: false },
              { text: 'Auguste Escoffier', isCorrect: true },
              { text: 'Jean-Louis Gaitt', isCorrect: false },
            ],
          },
          {
            question: 'What type of candy resulted from overheating a mixture of sugar and butter?',
            options: [
              { text: 'Toffees', isCorrect: true },
              { text: 'Lollipops', isCorrect: false },
              { text: 'Caramels', isCorrect: false },
            ],
          },
          {
            question: 'What is a traditional treat for Valentine\'s Day?',
            options: [
              { text: 'Pies', isCorrect: false },
              { text: 'Chocolate candies', isCorrect: true },
              { text: 'Cookies', isCorrect: false },
            ],
          },
          {
            question: 'Where was the recipe for chocolate chip cookies first developed?',
            options: [
              { text: 'USA', isCorrect: true },
              { text: 'France', isCorrect: false },
              { text: 'UK', isCorrect: false },
            ],
          },
          {
            question: 'What product is considered traditional for New Year\'s celebration in Germany?',
            options: [
              { text: 'Pastry', isCorrect: false },
              { text: 'Cookies', isCorrect: true },
              { text: 'Cake', isCorrect: false },
            ],
          },
          {
            question: 'What type of candy became popular after accidentally adding hot cream to chocolate?',
            options: [
              { text: 'Jelly', isCorrect: false },
              { text: 'Truffles', isCorrect: true },
              { text: 'Paste', isCorrect: false },
            ],
          },
          {
            question: 'What sweet treat is considered a symbol of luck in Japanese culture?',
            options: [
              { text: 'Donuts', isCorrect: false },
              { text: 'Mousse', isCorrect: false },
              { text: 'Mochi', isCorrect: true },
            ],
          },
          {
            question: 'Which of the following treats is considered traditional for New Year celebrations in the USA?',
            options: [
              { text: 'Cake', isCorrect: false },
              { text: 'Pastries', isCorrect: true },
              { text: 'Cupcakes', isCorrect: false },
            ],
          },
          {
            question: 'What sweet product was first used to create chocolate chip cookies?',
            options: [
              { text: 'Chocolate', isCorrect: true },
              { text: 'Vanilla', isCorrect: false },
              { text: 'Honey', isCorrect: false },
            ],
          },
        ],
      },
      
      {
        id: '2',
        title: 'History of Chocolate',
        image: require('../../assets/images/topicsImgs/history-of-chocolate.jpg'),
        unlocked: false,
        questions: [
          {
            question: 'Where was chocolate first discovered?',
            options: [
              { text: 'Mexico', isCorrect: true },
              { text: 'Peru', isCorrect: false },
              { text: 'India', isCorrect: false },
            ],
          },
          {
            question: 'Which ancient civilization first used cocoa beans?',
            options: [
              { text: 'Maya', isCorrect: true },
              { text: 'Egyptians', isCorrect: false },
              { text: 'Romans', isCorrect: false },
            ],
          },
          {
            question: 'What famous chocolate drink was popular among European aristocrats in the 16th century?',
            options: [
              { text: 'Chocolate liqueur', isCorrect: false },
              { text: 'Hot chocolate', isCorrect: true },
              { text: 'Chocolate milk', isCorrect: false },
            ],
          },
          {
            question: 'What ingredient is added to chocolate to make it milk chocolate?',
            options: [
              { text: 'Honey', isCorrect: false },
              { text: 'Vanilla', isCorrect: false },
              { text: 'Powdered milk', isCorrect: true },
            ],
          },
          {
            question: 'In what year did chocolate become available to the general public in Europe?',
            options: [
              { text: '1600', isCorrect: false },
              { text: '1700', isCorrect: true },
              { text: '1800', isCorrect: false },
            ],
          },
          {
            question: 'Who was the first to start producing chocolate bars?',
            options: [
              { text: 'John Cadbury', isCorrect: false },
              { text: 'Daniel Peter', isCorrect: true },
              { text: 'Rudolf Lindt', isCorrect: false },
            ],
          },
          {
            question: 'Which chocolate brand was founded in Switzerland in 1845?',
            options: [
              { text: 'Lindt', isCorrect: true },
              { text: 'Hershey\'s', isCorrect: false },
              { text: 'Cadbury', isCorrect: false },
            ],
          },
          {
            question: 'What product is typically used to coat chocolate candies?',
            options: [
              { text: 'Powdered sugar', isCorrect: false },
              { text: 'Cocoa powder', isCorrect: true },
              { text: 'Caramel', isCorrect: false },
            ],
          },
          {
            question: 'What chocolate product, produced in bar form, became popular in the 20th century?',
            options: [
              { text: 'Cocoa', isCorrect: false },
              { text: 'Chocolate cream', isCorrect: false },
              { text: 'Chocolate bars', isCorrect: true },
            ],
          },
          {
            question: 'What ingredient is used to create white chocolate?',
            options: [
              { text: 'Sugar', isCorrect: false },
              { text: 'Cocoa butter', isCorrect: true },
              { text: 'Cocoa powder', isCorrect: false },
            ],
          },
        ],
      },

      {
        id: '3',
        title: 'Sweet Traditions',
        image: require('../../assets/images/topicsImgs/traditions.jpeg'),
        unlocked: false,
        questions: [
          {
            question: 'What sweet product is traditionally made for Halloween in the USA?',
            options: [
              { text: 'Cupcakes', isCorrect: false },
              { text: 'Candy', isCorrect: true },
              { text: 'Pies', isCorrect: false },
            ],
          },
          {
            question: 'What dessert is commonly served in the UK for Christmas?',
            options: [
              { text: 'Pudding', isCorrect: true },
              { text: 'Cake', isCorrect: false },
              { text: 'Cookies', isCorrect: false },
            ],
          },
          {
            question: 'What traditional sweet treat is made in Japan for New Year?',
            options: [
              { text: 'Chocolate', isCorrect: false },
              { text: 'Mochi', isCorrect: true },
              { text: 'Pastries', isCorrect: false },
            ],
          },
          {
            question: 'What sweet product is traditionally given on Valentine\'s Day in Italy?',
            options: [
              { text: 'Chocolate candies', isCorrect: true },
              { text: 'Cake', isCorrect: false },
              { text: 'Lollipops', isCorrect: false },
            ],
          },
          {
            question: 'What type of sweets is traditionally used for Easter in Australia?',
            options: [
              { text: 'Chocolate eggs', isCorrect: true },
              { text: 'Cookies', isCorrect: false },
              { text: 'Cake', isCorrect: false },
            ],
          },
          {
            question: 'What sweet product is typically made in Russia for Maslenitsa?',
            options: [
              { text: 'Pancakes', isCorrect: true },
              { text: 'Pies', isCorrect: false },
              { text: 'Cupcakes', isCorrect: false },
            ],
          },
          {
            question: 'What treat is traditionally made in Spain for the Three Kings Day?',
            options: [
              { text: 'Roscón', isCorrect: true },
              { text: 'Cake', isCorrect: false },
              { text: 'Cookies', isCorrect: false },
            ],
          },
          {
            question: 'What sweet product is traditionally eaten on Thanksgiving in the USA?',
            options: [
              { text: 'Chocolate cake', isCorrect: false },
              { text: 'Pumpkin pie', isCorrect: true },
              { text: 'Shortbread cookies', isCorrect: false },
            ],
          },
          {
            question: 'What dessert is often served at weddings in France?',
            options: [
              { text: 'Caramel', isCorrect: false },
              { text: 'Macarons', isCorrect: true },
              { text: 'Mousse', isCorrect: false },
            ],
          },
          {
            question: 'What traditional treat is eaten in Germany during Advent?',
            options: [
              { text: 'Gingerbread cookies', isCorrect: true },
              { text: 'Chocolate cake', isCorrect: false },
              { text: 'Cupcakes', isCorrect: false },
            ],
          },
        ],
      },

      {
        id: '4',
        title: 'Sweet Omens',
        image: require('../../assets/images/topicsImgs/sweet-omens.jpg'),
        unlocked: false,
        questions: [
          {
            question: 'What sweet product is traditionally considered a symbol of luck in China?',
            options: [
              { text: 'A. Chocolate candies', isCorrect: false },
              { text: 'B. Mooncakes', isCorrect: true },
              { text: 'C. Lollipops', isCorrect: false },
            ],
          },
          {
            question: 'What sweet product can be found in shoes on Saint Nicholas Day in Germany?',
            options: [
              { text: 'A. Candy canes', isCorrect: true },
              { text: 'B. Chocolate candies', isCorrect: false },
              { text: 'C. Pastries', isCorrect: false },
            ],
          },
          {
            question: 'What treat in the shape of a star is considered a symbol of luck in Japan?',
            options: [
              { text: 'A. Pastries', isCorrect: false },
              { text: 'B. Mochi', isCorrect: true },
              { text: 'C. Chocolate', isCorrect: false },
            ],
          },
          {
            question: 'What dessert in the shape of an angel is considered lucky in some European countries?',
            options: [
              { text: 'A. Pie', isCorrect: false },
              { text: 'B. Cookies', isCorrect: true },
              { text: 'C. Cake', isCorrect: false },
            ],
          },
          {
            question: 'What sweet product is traditionally made for New Year in Greece?',
            options: [
              { text: 'A. Vasilopita', isCorrect: true },
              { text: 'B. Pastry', isCorrect: false },
              { text: 'C. Cupcakes', isCorrect: false },
            ],
          },
          {
            question: 'What traditional sweet product can be found in a traditional Japanese New Year meal?',
            options: [
              { text: 'A. Mochi', isCorrect: true },
              { text: 'B. Chocolate', isCorrect: false },
              { text: 'C. Caramel', isCorrect: false },
            ],
          },
          {
            question: 'What sweet product is commonly given in Scotland at Christmas to attract good luck?',
            options: [
              { text: 'A. Chocolate', isCorrect: false },
              { text: 'B. Sweet bread', isCorrect: true },
              { text: 'C. Lollipops', isCorrect: false },
            ],
          },
          {
            question: 'What dessert is traditionally made for Christmas in Spain to attract good fortune?',
            options: [
              { text: 'A. Roscón', isCorrect: true },
              { text: 'B. Cake', isCorrect: false },
              { text: 'C. Chocolate cake', isCorrect: false },
            ],
          },
          {
            question: 'What sweet product is a symbol of luck on Valentine\'s Day in the USA?',
            options: [
              { text: 'A. Pastries', isCorrect: false },
              { text: 'B. Chocolate', isCorrect: true },
              { text: 'C. Lollipops', isCorrect: false },
            ],
          },
          {
            question: 'What heart-shaped dessert is considered a symbol of luck in South Korea?',
            options: [
              { text: 'A. Pastries', isCorrect: false },
              { text: 'B. Cupcakes', isCorrect: true },
              { text: 'C. Chocolate', isCorrect: false },
            ],
          },
        ],
      },

      {
        id: '5',
        title: 'Lucky Ingredients',
        image: require('../../assets/images/topicsImgs/lucky-ingr.jpeg'),
        unlocked: false,
        questions: [
          {
            question: 'What ingredient is considered lucky in Indian sweets for attracting wealth?',
            options: [
              { text: 'A. Saffron', isCorrect: true },
              { text: 'B. Chocolate', isCorrect: false },
              { text: 'C. Vanilla', isCorrect: false },
            ],
          },
          {
            question: 'What fruit is traditionally added to Japanese sweets for good fortune?',
            options: [
              { text: 'A. Banana', isCorrect: false },
              { text: 'B. Lime', isCorrect: true },
              { text: 'C. Apple', isCorrect: false },
            ],
          },
          {
            question: 'What type of nut is considered a symbol of luck in traditional French cuisine?',
            options: [
              { text: 'A. Almond', isCorrect: false },
              { text: 'B. Hazelnut', isCorrect: true },
              { text: 'C. Cashew', isCorrect: false },
            ],
          },
          {
            question: 'What ingredient is often used in Chinese sweets to attract good fortune?',
            options: [
              { text: 'A. Chocolate', isCorrect: false },
              { text: 'B. Durian', isCorrect: true },
              { text: 'C. Berries', isCorrect: false },
            ],
          },
          {
            question: 'What ingredient is considered lucky in Italian sweets for attracting love?',
            options: [
              { text: 'A. Lemon', isCorrect: true },
              { text: 'B. Caramel', isCorrect: false },
              { text: 'C. Walnut', isCorrect: false },
            ],
          },
          {
            question: 'What type of honey is used in Greek sweets to attract luck?',
            options: [
              { text: 'A. Thyme', isCorrect: true },
              { text: 'B. Floral', isCorrect: false },
              { text: 'C. Laurel', isCorrect: false },
            ],
          },
          {
            question: 'What type of sweet is often associated with luck in Turkish culture?',
            options: [
              { text: 'A. Lollipops', isCorrect: false },
              { text: 'B. Lokum (Turkish Delight)', isCorrect: true },
              { text: 'C. Pastries', isCorrect: false },
            ],
          },
          {
            question: 'What ingredient is used in Arabic sweets to attract good fortune?',
            options: [
              { text: 'A. Chocolate', isCorrect: false },
              { text: 'B. Dates', isCorrect: true },
              { text: 'C. Apples', isCorrect: false },
            ],
          },
          {
            question: 'What type of nut is considered lucky in traditional Greek sweets?',
            options: [
              { text: 'A. Cashew', isCorrect: false },
              { text: 'B. Hazelnut', isCorrect: true },
              { text: 'C. Walnut', isCorrect: false },
            ],
          },
          {
            question: 'What ingredient is often added to Mexican sweets to attract good luck?',
            options: [
              { text: 'A. Cocoa', isCorrect: false },
              { text: 'B. Cinnamon', isCorrect: true },
              { text: 'C. Vanilla', isCorrect: false },
            ],
          },
        ],
      },

      {
        id: '6',
        title: 'Sweet Rituals',
        image: require('../../assets/images/topicsImgs/sweet-rituals.jpg'),
        unlocked: false,
        questions: [
          {
            question: 'What traditional dessert is commonly prepared on birthdays in the USA?',
            options: [
              { text: 'A. Cake', isCorrect: true },
              { text: 'B. Cupcake', isCorrect: false },
              { text: 'C. Muffins', isCorrect: false },
            ],
          },
          {
            question: 'What sweet treat is prepared in China for the Lunar New Year?',
            options: [
              { text: 'A. Muffins', isCorrect: false },
              { text: 'B. Mooncakes', isCorrect: true },
              { text: 'C. Chocolate candies', isCorrect: false },
            ],
          },
          {
            question: 'What sweet treat is traditionally prepared on St. Nicholas Day in Germany?',
            options: [
              { text: 'A. Candy canes', isCorrect: true },
              { text: 'B. Chocolate candies', isCorrect: false },
              { text: 'C. Pastries', isCorrect: false },
            ],
          },
          {
            question: 'What sweet treat is traditionally served at Christmas in the UK?',
            options: [
              { text: 'A. Pudding', isCorrect: true },
              { text: 'B. Cake', isCorrect: false },
              { text: 'C. Cookies', isCorrect: false },
            ],
          },
          {
            question: 'What sweet treat is commonly prepared for Maslenitsa in Russia?',
            options: [
              { text: 'A. Pancakes', isCorrect: true },
              { text: 'B. Pies', isCorrect: false },
              { text: 'C. Muffins', isCorrect: false },
            ],
          },
          {
            question: 'What dessert is served for New Year’s in Australia?',
            options: [
              { text: 'A. Chocolate eggs', isCorrect: true },
              { text: 'B. Cookies', isCorrect: false },
              { text: 'C. Cake', isCorrect: false },
            ],
          },
          {
            question: 'What traditional sweet treat is prepared for Easter in the UK?',
            options: [
              { text: 'A. Cake', isCorrect: false },
              { text: 'B. Pumpkin pie', isCorrect: true },
              { text: 'C. Pastry', isCorrect: false },
            ],
          },
          {
            question: 'What dessert is traditionally prepared for Christmas in Spain?',
            options: [
              { text: 'A. Roscón', isCorrect: true },
              { text: 'B. Cake', isCorrect: false },
              { text: 'C. Cookies', isCorrect: false },
            ],
          },
          {
            question: 'What sweet treat is traditionally prepared for Halloween in the USA?',
            options: [
              { text: 'A. Pies', isCorrect: false },
              { text: 'B. Candy', isCorrect: true },
              { text: 'C. Cookies', isCorrect: false },
            ],
          },
          {
            question: 'What dessert is commonly eaten in Italy on Valentine’s Day?',
            options: [
              { text: 'A. Chocolate candies', isCorrect: true },
              { text: 'B. Cake', isCorrect: false },
              { text: 'C. Candy', isCorrect: false },
            ],
          },
        ],
      },

      {
        id: '7',
        title: 'Stories of Hidden Sweets',
        image: require('../../assets/images/topicsImgs/hidden-sweet.jpg'),
        unlocked: false,
        questions: [
          {
            question: 'In which film are hidden sweet treasures featured in a chocolate factory?',
            options: [
              { text: 'A. "Charlie and the Chocolate Factory"', isCorrect: true },
              { text: 'B. "The Chocolate King"', isCorrect: false },
              { text: 'C. "In Search of Sweetness"', isCorrect: false },
            ],
          },
          {
            question: 'Which famous cooking competition often includes searching for hidden sweet treats?',
            options: [
              { text: 'A. MasterChef', isCorrect: false },
              { text: 'B. Cupcake Wars', isCorrect: true },
              { text: 'C. Bake Off', isCorrect: false },
            ],
          },
          {
            question: 'What sweet treat is associated with the legend of "Jackpot"?',
            options: [
              { text: 'A. Lollipops', isCorrect: true },
              { text: 'B. Pastries', isCorrect: false },
              { text: 'C. Chocolate candies', isCorrect: false },
            ],
          },
          {
            question: 'Which festival in Brazil involves searching for sweet treasures?',
            options: [
              { text: 'A. Carnival', isCorrect: true },
              { text: 'B. Christmas', isCorrect: false },
              { text: 'C. Valentine’s Day', isCorrect: false },
            ],
          },
          {
            question: 'Which children’s holiday involves searching for hidden sweet treats?',
            options: [
              { text: 'A. Easter', isCorrect: false },
              { text: 'B. Halloween', isCorrect: true },
              { text: 'C. Christmas', isCorrect: false },
            ],
          },
          {
            question: 'What chocolate product is often used in games involving hidden sweets?',
            options: [
              { text: 'A. Chocolate coins', isCorrect: true },
              { text: 'B. Lollipops', isCorrect: false },
              { text: 'C. Candy', isCorrect: false },
            ],
          },
          {
            question: 'Which famous chocolate brand uses the concept of hidden sweets in its advertising campaigns?',
            options: [
              { text: 'A. Cadbury', isCorrect: true },
              { text: 'B. Lindt', isCorrect: false },
              { text: 'C. Hershey\'s', isCorrect: false },
            ],
          },
          {
            question: 'What festive dessert in Mexico is associated with searching for hidden sweets?',
            options: [
              { text: 'A. Muffins', isCorrect: false },
              { text: 'B. Piñata', isCorrect: true },
              { text: 'C. Pastries', isCorrect: false },
            ],
          },
          {
            question: 'What traditional sweet treat is often hidden on Valentine’s Day?',
            options: [
              { text: 'A. Lollipops', isCorrect: false },
              { text: 'B. Chocolate candies', isCorrect: true },
              { text: 'C. Cookies', isCorrect: false },
            ],
          },
          {
            question: 'What festival in Japan involves searching for sweet treats to bring good luck?',
            options: [
              { text: 'A. Hinamatsuri', isCorrect: true },
              { text: 'B. New Year', isCorrect: false },
              { text: 'C. Tanabata', isCorrect: false },
            ],
          },
        ],
      },

      {
        id: '8',
        questions: [
          // 1
          {
            question: 'What sweet symbol is used on Valentine’s Day to represent love?',
            options: [
              { text: 'A. Lollipops', isCorrect: false },
              { text: 'B. Chocolate hearts', isCorrect: true },
              { text: 'C. Cookies', isCorrect: false },
            ],
          },
          // 2
          {
            question: 'What sweet treat is considered a symbol of good luck on St. Nicholas Day?',
            options: [
              { text: 'A. Candy canes', isCorrect: true },
              { text: 'B. Chocolate candies', isCorrect: false },
              { text: 'C. Pastries', isCorrect: false },
            ],
          },
          // 3
          {
            question: 'What sweet treat is considered a symbol of prosperity in China?',
            options: [
              { text: 'A. Mooncakes', isCorrect: true },
              { text: 'B. Muffins', isCorrect: false },
              { text: 'C. Cake', isCorrect: false },
            ],
          },
          // 4
          {
            question: 'What traditional sweet treat in the shape of a ring symbolizes good luck on New Year’s in Greece?',
            options: [
              { text: 'A. Chocolate', isCorrect: false },
              { text: 'B. Vasilopita', isCorrect: true },
              { text: 'C. Pastry', isCorrect: false },
            ],
          },
          // 5
          {
            question: 'What sweet product in the shape of a star is traditionally used in Japan to bring good luck?',
            options: [
              { text: 'A. Mochi', isCorrect: true },
              { text: 'B. Chocolate', isCorrect: false },
              { text: 'C. Caramel', isCorrect: false },
            ],
          },
          // 6
          {
            question: 'What traditional sweet treat is used in Brazil during Carnival?',
            options: [
              { text: 'A. Chocolate', isCorrect: false },
              { text: 'B. Piñata', isCorrect: true },
              { text: 'C. Pastry', isCorrect: false },
            ],
          },
          // 7
          {
            question: 'What sweet treat is considered a symbol of good luck in Texas?',
            options: [
              { text: 'A. Lollipops', isCorrect: false },
              { text: 'B. Chocolate candies', isCorrect: true },
              { text: 'C. Cookies', isCorrect: false },
            ],
          },
          // 8
          {
            question: 'What sweet product is traditionally given at Christmas in the UK?',
            options: [
              { text: 'A. Pudding', isCorrect: true },
              { text: 'B. Pastry', isCorrect: false },
              { text: 'C. Muffins', isCorrect: false },
            ],
          },
          // 9
          {
            question: 'What sweet treat is considered a symbol of good luck at Easter in Australia?',
            options: [
              { text: 'A. Chocolate eggs', isCorrect: true },
              { text: 'B. Pastry', isCorrect: false },
              { text: 'C. Lollipops', isCorrect: false },
            ],
          },
          // 10
          {
            question: 'What sweet treat is often used in wedding ceremonies to bring good luck?',
            options: [
              { text: 'A. Cupcakes', isCorrect: true },
              { text: 'B. Chocolate candies', isCorrect: false },
              { text: 'C. Pastries', isCorrect: false },
            ],
          },
        ],
        title: 'Sweet Symbols',
        image: require('../../assets/images/topicsImgs/sweet-symbols.jpeg'),
        unlocked: false,
      },
      
      {
        id: '9',
        questions: [
          // 1
          {
            question: 'What sweet treat is considered lucky in traditional Mexican cuisine?',
            options: [
              { text: 'A. Churros', isCorrect: true },
              { text: 'B. Pastry', isCorrect: false },
              { text: 'C. Chocolate candies', isCorrect: false },
            ],
          },
          // 2
          {
            question: 'What fruit is considered lucky in Japanese sweets?',
            options: [
              { text: 'A. Mandarins', isCorrect: true },
              { text: 'B. Apples', isCorrect: false },
              { text: 'C. Pears', isCorrect: false },
            ],
          },
          // 3
          {
            question: 'What sweet treat is considered lucky in Chinese culture for the Lunar New Year?',
            options: [
              { text: 'A. Lollipops', isCorrect: false },
              { text: 'B. Mooncakes', isCorrect: true },
              { text: 'C. Muffins', isCorrect: false },
            ],
          },
          // 4
          {
            question: 'What type of sweets are traditionally associated with good luck in Europe?',
            options: [
              { text: 'A. Caramel', isCorrect: false },
              { text: 'B. Chocolate candies', isCorrect: true },
              { text: 'C. Cookies', isCorrect: false },
            ],
          },
          // 5
          {
            question: 'What sweet product is traditionally used in Arabic cuisine to attract good luck?',
            options: [
              { text: 'A. Dates', isCorrect: true },
              { text: 'B. Chocolate', isCorrect: false },
              { text: 'C. Lollipops', isCorrect: false },
            ],
          },
          // 6
          {
            question: 'What sweet treat is considered lucky in India for the Diwali festival?',
            options: [
              { text: 'A. Pastry', isCorrect: false },
              { text: 'B. Laddu', isCorrect: true },
              { text: 'C. Chocolate', isCorrect: false },
            ],
          },
          // 7
          {
            question: 'What type of sweets is traditionally associated with good luck in South America?',
            options: [
              { text: 'A. Piñata', isCorrect: true },
              { text: 'B. Lollipops', isCorrect: false },
              { text: 'C. Caramel', isCorrect: false },
            ],
          },
          // 8
          {
            question: 'What sweet product is often used in Asian wedding ceremonies to bring good luck?',
            options: [
              { text: 'A. Chocolate', isCorrect: false },
              { text: 'B. Mochi', isCorrect: true },
              { text: 'C. Cupcakes', isCorrect: false },
            ],
          },
          // 9
          {
            question: 'What sweet treat is commonly eaten in Africa to attract good luck?',
            options: [
              { text: 'A. Honey', isCorrect: true },
              { text: 'B. Lollipops', isCorrect: false },
              { text: 'C. Pastry', isCorrect: false },
            ],
          },
          // 10
          {
            question: 'What sweet treat is considered lucky at Easter in the UK?',
            options: [
              { text: 'A. Chocolate cake', isCorrect: false },
              { text: 'B. Pumpkin pie', isCorrect: true },
              { text: 'C. Cupcakes', isCorrect: false },
            ],
          },
        ],
        title: 'Lucky Sweets',
        image: require('../../assets/images/topicsImgs/lucky-sweet.jpg'),
        unlocked: false,
      },
      
      {
        id: '10',
        questions: [
          // 1
          {
            question: 'What sweet treat is prepared in Japan to bring good luck for New Year’s?',
            options: [
              { text: 'A. Mochi', isCorrect: true },
              { text: 'B. Chocolate', isCorrect: false },
              { text: 'C. Pastry', isCorrect: false },
            ],
          },
          // 2
          {
            question: 'What dessert is traditionally prepared for Christmas in France?',
            options: [
              { text: 'A. Bûche de Noël', isCorrect: true },
              { text: 'B. Pastry', isCorrect: false },
              { text: 'C. Lollipops', isCorrect: false },
            ],
          },
          // 3
          {
            question: 'What sweet treat is considered a symbol of good luck at Thanksgiving in the USA?',
            options: [
              { text: 'A. Cake', isCorrect: false },
              { text: 'B. Pumpkin pie', isCorrect: true },
              { text: 'C. Cookies', isCorrect: false },
            ],
          },
          // 4
          {
            question: 'What sweet product is commonly prepared for Easter in Russia?',
            options: [
              { text: 'A. Paskha', isCorrect: true },
              { text: 'B. Pastry', isCorrect: false },
              { text: 'C. Muffins', isCorrect: false },
            ],
          },
          // 5
          {
            question: 'What sweet treat is often given for New Year’s in South Korea?',
            options: [
              { text: 'A. Pastry', isCorrect: false },
              { text: 'B. Tteokguk', isCorrect: true },
              { text: 'C. Chocolate', isCorrect: false },
            ],
          },
          // 6
          {
            question: 'What sweet treat is commonly eaten on Valentine’s Day in Italy?',
            options: [
              { text: 'A. Chocolate', isCorrect: true },
              { text: 'B. Lollipops', isCorrect: false },
              { text: 'C. Cookies', isCorrect: false },
            ],
          },
          // 7
          {
            question: 'What sweet treat is traditionally associated with Halloween in Mexico?',
            options: [
              { text: 'A. Chocolate skulls', isCorrect: true },
              { text: 'B. Pastry', isCorrect: false },
              { text: 'C. Cupcakes', isCorrect: false },
            ],
          },
          // 8
          {
            question: 'What dessert is commonly prepared for Easter in Greece?',
            options: [
              { text: 'A. Tsoureki', isCorrect: true },
              { text: 'B. Pastry', isCorrect: false },
              { text: 'C. Muffins', isCorrect: false },
            ],
          },
          // 9
          {
            question: 'What sweet treat is often eaten on New Year’s Day in Scotland?',
            options: [
              { text: 'A. Black bun', isCorrect: true },
              { text: 'B. Lollipops', isCorrect: false },
              { text: 'C. Cookies', isCorrect: false },
            ],
          },
          // 10
          {
            question: 'What sweet treat is commonly eaten during Ramadan in the Middle East?',
            options: [
              { text: 'A. Dates', isCorrect: true },
              { text: 'B. Pastry', isCorrect: false },
              { text: 'C. Chocolate', isCorrect: false },
            ],
          },
        ],
        title: 'Sweet Rituals and Traditions',
        image: require('../../assets/images/topicsImgs/sweet-rit-trad.jpeg'),
        unlocked: false,
      },
      
];

const { width } = Dimensions.get('window');

export default function TopicSelectionScreen({ onStartQuiz }) {
  const navigation = useNavigation();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const { winMode, topicId } = useContext(QuizContext);
  const [ topics, setTopics ] = useState(topicsID);

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const savedTopics = await AsyncStorage.getItem('topics');
        if (savedTopics) {
          setTopics(JSON.parse(savedTopics));
        } else {
          // If no saved topics are found, set to default topicsID
          setTopics(topicsID);
        }
      } catch (error) {
        console.error('Failed to load topics:', error);
        // If an error occurs, also set to default topicsID
        setTopics(topicsID);
      }
    };

    loadTopics();
  }, []);

  // Save topics to AsyncStorage whenever they change
  useEffect(() => {
    const saveTopics = async () => {
      try {
        await AsyncStorage.setItem('topics', JSON.stringify(topics));
      } catch (error) {
        console.error("Failed to save topics to storage", error);
      }
    };

    saveTopics();
  }, [topics]);

  useEffect(() => {
    if (winMode && topicId) {
      if (parseInt(topicId) < 10) {
        // Unlock the next topic
        setTopics(prevTopics => {
          const updatedTopics = prevTopics.map(topic => 
            topic.id === (parseInt(topicId) + 1).toString()
              ? { ...topic, unlocked: true }
              : topic
          );
          return updatedTopics;
        });
      } else if (parseInt(topicId) === 10) {
        Alert.alert("Congratulations, you completed all topics!");
      }
    }
  }, [winMode, topicId]);

  // useEffect(() => {
  //   loadTopics(); // Load topics when component mounts
  // }, []);

  // const resetProgressInTopics = async () => {
  //   const resetTopics = topics.map(topic => ({
  //     ...topic,
  //     unlocked: topic.id === '1' // Keep the first topic unlocked
  //   }));

  //   // Update the state and save to AsyncStorage
  //   setTopics(resetTopics);
  //   await AsyncStorage.setItem('topics', JSON.stringify(resetTopics));

  //   Alert.alert('Progress reset', 'All topics have been locked again except the first one.');
  // };

  const handlePlayPress = () => {
    if (selectedTopic && selectedTopic.unlocked) {
      onStartQuiz(selectedTopic);  // Trigger the quiz modal from here
    } else {
      Alert.alert('Please select an available topic!');
    }
  };

  const renderCarouselItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => {
        if (item.unlocked) {
          setSelectedTopic(item);
        } else {
          Alert.alert('This topic is locked. Please choose another topic.');
        }
      }}
    >
      <View style={[
      styles.topicCircle, 
      item.unlocked 
        ? (selectedTopic && selectedTopic.id === item.id ? styles.selected : styles.unlocked) 
        : styles.locked
      ]}>
        <Image source={item.image} style={styles.topicImage} />
        <Text style={styles.topicTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <ImageBackground 
      source={require('../../assets/images/bcgr.jpeg')}
      style={styles.background}
      blurRadius={3}
    >
      <SafeAreaView style={styles.container}>
      {/* <Button title="Reset Progress" onPress={resetProgressInTopics} color="#ff5c5c" /> */}
        <View style={styles.header}>
          <Text style={styles.title}>
            {selectedTopic ? `${selectedTopic.title}` : 'Choose Your Topic'}
          </Text>
        </View>
        <View style={styles.carouselContainer}>
          <Carousel 
            layout={'tinder'} 
            layoutCardOffset={`9`}
            width={width}
            height={300}
            data={topics}
            loop
            renderItem={renderCarouselItem}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handlePlayPress}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Play</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    backgroundColor: '#00000040',
    paddingVertical: 5,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    borderColor: '#FFD700',
    borderWidth: 2,
    marginTop: 50
  },
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 50
  },
  topicCircle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  unlocked: {
    borderColor: '#FFD700',
    borderWidth: 3,
  },
  locked: {
    backgroundColor: '#00000080',
    borderWidth: 3,
    borderColor: 'red'
  },
  topicImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10
  },
  topicTitle: {
    marginTop: 5,
    color: '#FFD700',
    textAlign: 'center',
    width: 100,
    fontSize: 16,
    fontWeight: '900'
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    width: '50%',
    paddingBottom: 100,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#00000040',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    borderColor: '#FFD700',
    borderWidth: 2,
    width: 150,
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: '900',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#6d6875',
    margin: 10,
    textAlign: 'center',
    color: '#FFD700',
  },
  selected: {
    borderColor: '#00ff00',
    borderWidth: 3,
  },
});