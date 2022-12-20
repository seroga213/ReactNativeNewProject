import React, { useEffect } from "react";
import RegistrationScreen from "./assets/Screens/RegistrationScreen"
import LoginScreen from "./assets/Screens/LoginScreen"

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

export default function App() {

  const [fontsLoaded] = Font.useFonts({
    "Roboto-Regular":require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium":require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold":require("./assets/fonts/Roboto-Bold.ttf")
  })

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
    <LoginScreen/>

    );
}