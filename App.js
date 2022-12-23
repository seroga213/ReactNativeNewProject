import React, { useState ,useEffect } from "react";

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from "./Screens/auth/LoginScreen";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import PostsScreen from "./Screens/mainScreen/PostsScreen";
import ProfileScreen from "./Screens/mainScreen/ProfileScreen";
import CreatePostsScreen from "./Screens/mainScreen/CreatePostsScreen";



const [fontsLoaded] = Font.useFonts({
    "Roboto-Regular":require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium":require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold":require("./assets/fonts/Roboto-Bold.ttf")
  })

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator ();

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
      <AuthStack.Screen options= {{headerShown: false}} name="Login" component={LoginScreen} />
      <AuthStack.Screen options= {{headerShown: false}} name="Registration" component={RegistrationScreen} />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator>
      <MainTab.Screen name="Posts" component={PostsScreen} />
      <MainTab.Screen name="Create" component={CreatePostsScreen} />
      <MainTab.Screen name="Profile" component={ProfileScreen} />
    </MainTab.Navigator>
  );
};

export default function App() {
  const routing = useRoute({});
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
      prepare();
  }, [])

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }
  return (
    <NavigationContainer>  
      {routing}
    </NavigationContainer>

    );
}