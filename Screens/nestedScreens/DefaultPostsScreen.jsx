import React, {useState ,useEffect } from "react";
import { View, Text, StyleSheet,TouchableOpacity, FlatList, Image } from "react-native";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";

import db from "../../firebase/config";

import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';



const DefaultPostsScreen = ({ navigation ,route }) => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  console.log("route.params", route.params);

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  console.log("posts", posts);
  return (
    <View style={styles.container}>
      
     <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
          style={{
            marginTop: 15,
            marginBottom:15,
            marginHorizontal:30,  
          }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ width: 350, height: 200 }}
              />
            <Text>{route.params.title}</Text>

            <View>
              <TouchableOpacity>
                <FontAwesome name="comment-o" onPress={() => navigation.navigate("Comments")} size={24} color="black" />
              </TouchableOpacity>

              <TouchableOpacity>
                <Text>
                  <AntDesign name="enviromento"  onPress={() => navigation.navigate("Map")} size={24} color="black" />
                  {route.params.location}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        />
      <TouchableOpacity
              style={styles.logout}
              title="Log out"
              onPress={signOut}
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

export default DefaultPostsScreen;