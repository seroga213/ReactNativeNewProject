import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator ();

import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import PostsScreen from "./Screens/mainScreen/PostsScreen";
import ProfileScreen from "./Screens/mainScreen/ProfileScreen";
import CreatePostsScreen from "./Screens/mainScreen/CreatePostsScreen";

import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';



 export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
      <AuthStack.Screen options= {{headerShown: false}} name="Registration" component={RegistrationScreen} />
      <AuthStack.Screen options= {{headerShown: false}} name="Login" component={LoginScreen} />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator screenOptions={{ tabBarShowLabel: false}}>
      <MainTab.Screen 
        options={{
          headerShown: false,
            tabBarIcon: ({ focused, size, color }) => (
                <AntDesign name="appstore-o" size={size} color={color} />
            ),
          }}
        name="Posts" 
        component={PostsScreen} />
      <MainTab.Screen
        options={{
          headerShown: false,
            tabBarIcon: ({ focused, size, color }) => (
                <AntDesign name="pluscircleo" size={35} color={color} />
            ),
          }} 
        name="Create" 
        component={CreatePostsScreen} />
      <MainTab.Screen
        options={{
          headerShown: false,
            tabBarIcon: ({ focused, size, color }) => (
                <MaterialCommunityIcons name="snowman" size={size} color={color} />
            ),
          }}  
        name="Profile" 
        component={ProfileScreen} />
    </MainTab.Navigator>
  );
};
