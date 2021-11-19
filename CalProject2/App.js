/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import { evaluate, falseDependencies } from 'mathjs'
 import _ from 'lodash';
 import React from 'react';
 import { useState, useEffect } from 'react';
 import type {Node} from 'react';
 
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   TouchableOpacity,
   ToastAndroid,
   Dimensions,
 } from 'react-native';
 
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 
const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
 
  const [result, setResult] = useState("")
  const opr = ['/','*','+','-','.']
  const [OrientationState, setOriState] = useState("portrait")

  /**
 * Returns true if the screen is in portrait mode
 */

  const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };

  // Event Listener for orientation changes
  Dimensions.addEventListener('change', () => {
    if( isPortrait() )
      setOriState('portrait');
    else
      setOriState('landscape');
    console.log(OrientationState)
  });

  const clear_output = () => {
    setResult("")
  }

  const updateResult = (string) => {
     if (
       opr.includes(string) && result === "" || 
       opr.includes(string) && opr.includes(_.slice(result, -1))
     )
     return;
     setResult(result + string)
   }
 
   const calculate = () => {
     try {
       setResult(evaluate(result))
     } catch (error) {
       showToastWithGravity()
     }
   }
 
   const showToastWithGravity = () => {
     ToastAndroid.showWithGravity(
       "The Sentance is not Correct",
       ToastAndroid.SHORT,
       ToastAndroid.CENTER
     );
   }
 
   const change_sign = () => {
     if (
       result === ""
     )
       return;
     if ( _.slice(result, 0, 1) == "-" )
       setResult(result.slice(1,result.length));
     else
       setResult("-" + result)
   }
 
   const change_brackets = () => {
     if ( _.slice(result, -1) == ")" )
       setResult(result.slice(0,result.length-1) + "(");
     else if ( _.slice(result, -1) == "(" )
       setResult(result.slice(0,result.length-1) + ")");
     else
       setResult(result + "(");
   }

  const portraitLayout = [[{title: "AC", fun: clear_output, UItext: "AC"}, {title: "empty", fun: null, UItext: ""},
         {title: "/", fun: updateResult, UItext: "/"}],
        [{title: "1", fun: updateResult, UItext: "1"},{title: "2", fun: updateResult, UItext: "2"},
        {title: "3", fun: updateResult, UItext: "3"},{title: "*", fun: updateResult, UItext: "*"}],
        [{title: "4", fun: updateResult, UItext: "4"},{title: "5", fun: updateResult, UItext: "5"},
        {title: "6", fun: updateResult, UItext: "6"},{title: "+", fun: updateResult, UItext: "+"}],
        [{title: "7", fun: updateResult, UItext: "7"},{title: "8", fun: updateResult, UItext: "8"},
        {title: "9", fun: updateResult, UItext: "9"},{title: "-", fun: updateResult, UItext: "-"}],
        [{title: "0", fun: updateResult, UItext: "0"}, {title: ".", fun: updateResult, UItext: ","},
         {title: "=", fun: calculate, UItext: "="}]];

  const landscapeLayout = [[{title: "^(1/", fun: updateResult, UItext: "y√x"}, {title: "!", fun: updateResult, UItext: "x!"},
          {title: "AC", fun: clear_output, UItext: "AC"}, {title: "+/-", fun: change_sign, UItext: "+/-"},
          {title: "%", fun: updateResult, UItext: "%"}, {title: "/", fun: updateResult, UItext: "/"}],
        [{title: "e^", fun: updateResult, UItext: "ex"}, {title: "10^", fun: updateResult, UItext: "10x"},
          {title: "7", fun: updateResult, UItext: "7"},{title: "8", fun: updateResult, UItext: "8"},
          {title: "9", fun: updateResult, UItext: "9"},{title: "*", fun: updateResult, UItext: "*"}],
        [{title: "log(", fun: updateResult, UItext: "Ln"}, {title: "log10(", fun: updateResult, UItext: "Log10"},
          {title: "4", fun: updateResult, UItext: "4"},{title: "5", fun: updateResult, UItext: "5"},
          {title: "6", fun: updateResult, UItext: "6"},{title: "+", fun: updateResult, UItext: "+"}],
        [{title: "e", fun: updateResult, UItext: "e"}, {title: "^2", fun: updateResult, UItext: "x2"},
          {title: "1", fun: updateResult, UItext: "1"},{title: "2", fun: updateResult, UItext: "2"},
          {title: "3", fun: updateResult, UItext: "3"},{title: "-", fun: updateResult, UItext: "-"}],
        [{title: "PI", fun: updateResult, UItext: "π"}, {title: "^3", fun: updateResult, UItext: "x3"},
          {title: "( / )", fun: change_brackets, UItext: "( / )"}, {title: "0", fun: updateResult, UItext: "0"},
          {title: ".", fun: updateResult, UItext: ","},{title: "=", fun: calculate, UItext: "="}]];
 

 
   const renderLayout = (arr, orien) => {
    let stylesTable;

    let layout = arr.map( function( row ) {
      let rowElement = row.map( function( cell ) {
        if( orien == 'portrait' ){
          switch(cell.title){
            case '=':
              stylesTable = [styles.numbers_port, styles.button];
              break;

            case 'AC':
              stylesTable = [styles.ac_port, styles.button];
              break;

            case '0':
              stylesTable = [styles.ac_port, styles.button];
              break;

            case 'empty':
              stylesTable = [styles.numbers_port, styles.button];
              break;

            default:
              stylesTable = [styles.numbers_port, styles.button];
              break;
          }
        } else if ( orien == 'landscape') {
           stylesTable = [styles.numbers_land, styles.button];
        }
        
        if( cell.title == '=' || cell.title == 'AC' ){
          return (
            <TouchableOpacity
              key={cell.title}
              style={stylesTable}
              onPress={() => cell.fun()}
                >
              <Text style={styles.button_text}>{cell.UItext}</Text>
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity
              key={cell.title}
              style={stylesTable}
              onPress={() => cell.fun(cell.title)}
                >
              <Text style={styles.button_text}>{cell.UItext}</Text>
            </TouchableOpacity>
          );
        }
      } );
      return rowElement;
    } )
    return ( 
      <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.result}>
          <Text 
            style={styles.result_text}
            numberOfLines={1}>
          {result}
          </Text>
        </View>
        {layout}
      </View>
      </SafeAreaView>
    );
   }
 
  
   
  if (OrientationState === 'portrait') {
    return renderLayout(portraitLayout, 'portrait');
  }
  else {
    return renderLayout(landscapeLayout, 'landscape')
       /*
         <TouchableOpacity
             style={[styles.numbers_land, styles.button]}
             onPress={() => updateResult("10^")}
           >
             <View style={[{flexDirection: 'row', alignItems: 'flex-start'}, styles.button_text]}>
               <Text style={{fontSize: 20, lineHeight: 30}}>10</Text>
               <Text style={{fontSize: 11, lineHeight: 18}}>x</Text>
             </View>
         </TouchableOpacity>
 
         <TouchableOpacity
             style={[styles.numbers_land, styles.button]}
             onPress={() => updateResult("log10(")}
           >
             <View style={[{flexDirection: 'row', alignItems: 'flex-end'}, styles.button_text]}>
               <Text style={{fontSize: 20, lineHeight: 30}}>Log</Text>
               <Text style={{fontSize: 11, lineHeight: 18}}>10</Text>
             </View>
         </TouchableOpacity>
      */
     }
 };
 
 const styles = StyleSheet.create({
   container: {
     display: 'flex',
     flexDirection: "row",
     justifyContent: 'space-evenly',
     paddingTop: 10,
     backgroundColor: '#ecf0f1',
     padding: 8,
     flexWrap: 'wrap',
     height: "100%",
     backgroundColor: "#845EC2",
   },
   button: {
     alignItems: "center",
     backgroundColor: "#FFFFFF",
     margin: 0.5,
     padding: 10,
     justifyContent: 'center',
     flexGrow: 1,
   },
   operationButtons: {
     alignItems: "center",
     backgroundColor: "#FFFFFF",
     margin: 0.5,
     padding: 10,
     justifyContent: 'center',
     flexGrow: 1,
     selfFlex: "flex-end",
   },
   paragraph: {
     margin: 24,
     fontSize: 18,
     fontWeight: 'bold',
     textAlign: 'center',
   },
   result: {
     backgroundColor: "#5C5C5C",
     width: "100%",
     alignItems: 'flex-end',
     justifyContent: 'center',
     padding: 10,
     paddingBottom: 0,
     paddingTop: 0,
     height: "15%"
   },
   result_land: {
     backgroundColor: "#5C5C5C",
     width: "100%",
     alignItems: 'flex-end',
     justifyContent: 'center',
     padding: 10,
     paddingBottom: 0,
     paddingTop: 0,
     height: "17%"
   },
   result_text: {
     fontSize: 50,
     fontWeight: '400',
     color: "#FFFFFF",
     overflow: "hidden",
   },
   button_text: {
     fontSize: 18,
     fontWeight: '400',
   },
   numbers_port: {
     width: "23%",
     height: "16.5%"
   },
   ac_port: {
     width: "48%",
   },
   numbers_land: {
     width: "15%",
     height: "16.5%"
   },
   ac_land: {
     width: "31.5%",
   },
 });
 
 export default App;
 