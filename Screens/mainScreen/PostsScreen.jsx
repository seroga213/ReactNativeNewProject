import React from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';


const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>PostsScreen</Text>
      <TouchableOpacity
              style={styles.logout}
              title="Log out"
              >
                <MaterialIcons name="logout" size={24} color="black" />
            </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostsScreen;