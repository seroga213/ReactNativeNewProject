import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { Camera } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Location from "expo-location";
import db from "../../firebase/config";

const CreateScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState(null);

  const { userId, nickName } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let locationRes = await Location.getCurrentPositionAsync({});
      setLocation(locationRes);
    })();
  }, []);

  const takePhoto = async () => {
    console.log("location", location);
    console.log("comment", comment);

    const { uri } = await camera.takePictureAsync();

    setPhoto(uri);
    console.log("photo uri ", uri);
  };

  const sendPhoto = () => {
    uploadPostToServer();
    navigation.navigate("DefaultScreen", { photo });
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    const createPost = await db
      .firestore()
      .collection("posts")
      .add({ photo, comment, location: location.coords, userId, nickName });
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();

    const uniquePostId = Date.now().toString();

    await db.storage().ref(`postImage/${uniquePostId}`).put(file);

    const processedPhoto = await db
      .storage()
      .ref("postImage")
      .child(uniquePostId)
      .getDownloadURL();

    return processedPhoto;
  };
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
      {photo && (
        <View style={styles.takePhotoContainer}>
          <Image  source={{ uri: photo }}
              style={{ height: 100, width: 100 }} />
        </View>
      )}
      <TouchableOpacity onPress={takePhoto} style={styles.photoContainer}>
          <Text style={styles.photoText}>photo</Text>
        </TouchableOpacity>
      </Camera>

      <View style={styles.input_container}>
            
          <TextInput
              placeholder="Title..."
              style={styles.input}
              onFocus={() => setIsShowKeyboard(true)}
              onChangeText={(value) => setTitle(value)}
          />

          <TextInput
            placeholder="Location..."
            style={styles.input}
            onFocus = {() => setIsShowKeyboard(true)}
            onChangeText={(value) => setLocation(value)}
          />
        </View>

          <View>
            <TouchableOpacity onPress={sendPhoto} style={styles.publicate_post_btn}>
              <Text style={styles.publicate_post_btn_text}>Publicate</Text>
            </TouchableOpacity>
          </View>
    </View>

    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    height: 300,
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  photoText: {
    color: "#fff",

  },
  photoContainer: {
    marginTop: 200,
    borderWidth: 1,
    borderColor: "#808080",
    width: 70,
    height: 70, 
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 50,
    left: 10,
    borderColor: "#fff",
    borderWidth: 1,
  },
  input_container: {
    marginTop:50,
  },

  input: {
    marginTop:20,
    borderBottomWidth: 1,
  },

  publicate_post_btn: {
    marginHorizontal:20,
    
    marginTop:43,
    marginBottom: 16,
    paddingTop: 16, 
    paddingBottom: 16,
    

    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },

  publicate_post_btn_text: {

    textAlign: "center",
  },

});

export default CreateScreen;