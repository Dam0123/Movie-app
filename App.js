import React from "react";
import {useState} from "react";
import { Image, Text, View, StatusBar } from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import AppLoading  from "expo-app-loading";
import { Asset } from "expo-asset";
import {Ionicons} from "@expo/vector-icons";
import * as Font from "expo-font";
import Stack from "./navigation/Stack";


const cacheImages = (images) => images.map(image => {
  if(typeof image === "string"){
    return Image.prefetch(image)
  } else {
    return Asset.fromModule(image).downloadAsync();
  }
});

const cacheFonts = fonts => fonts.map(font => Font.loadAsync(font));

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const loadAssets = async () => {
    const images = cacheImages(["https://images.unsplash.com/photo-1632215031728-c7ec71e9a69b?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  require("./assets/splash.png")])
  
  const fonts = cacheFonts([Ionicons.font]);
  return await Promise.all([...images, ...fonts]);
  };
  

  const onFinish = () => setIsReady(true);
  
  return isReady ? (
    <> 
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
    <StatusBar barStyle="light-content" />
    </>
  ) : (  
    <AppLoading
      startAsync={loadAssets} 
      onFinish={onFinish} 
      onError={console.error} 
    />
  );
  
}
