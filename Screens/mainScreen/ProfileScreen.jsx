import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import db from "../../firebase/config";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);
  const { userId } = useSelector((state) => state.auth);

  
  const getUserPosts = async () => {
    await db
    .firestore()
    .collection("posts")
    .where("userId", "==", userId)
    .onSnapshot((data) =>
    setUserPosts(data.docs.map((doc) => ({ ...doc.data() })))
    );
  };
  
  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={userPosts}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                marginBottom: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image 
                source={{ uri: item.photo }}
                style={{ width: 350, height: 200 }}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 50,
  },
});

export default ProfileScreen;