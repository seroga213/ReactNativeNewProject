import React, { useState, useEffect } from "react";
import { 
  StyleSheet,
  View,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions, } from 'react-native';

  import { useDispatch } from "react-redux";

  import { authSignUpUser } from "../../redux/auth/authOperations";

  const initialState = {
    email: "",
    password: "",
    nickname: "",
  };

export default function RegistrationScreen ({navigation}){
  // console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);

  const dispatch = useDispatch();

  const [dimensions, setdimensions] = useState(
    Dimensions.get("window").width - 20 * 2
  );

  
  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 20 * 2;

      setdimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);


  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    dispatch(authSignUpUser(state));
    setstate(initialState);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/photo-bg.jpeg")}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
        <View
          style={{ ...styles.form, marginBottom: isShowKeyboard ? 20 : 100, width: dimensions,}}
        >
            <View>
              <Text style={styles.headerTitle}>Registration</Text>
              <Text style={styles.inputTitle}>Nickname</Text>
            <TextInput
                  value={state.nickname}
                  placeholder="Nickname"
                  style={styles.input}
                  onFocus = {() => setIsShowKeyboard(true)}
                  onChangeText={(value) => setstate((prevState) => ({ ...prevState, nickname: value }))}
                />
              <Text style={styles.inputTitle}>EMAIL ADDRES</Text>
              <TextInput
                style={styles.input}
                placeholder="email"
                textAlign={"center"}
                value={state.email}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) => setstate((prevState) => ({ ...prevState, email: value }))
                }
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.inputTitle}>PASSWORD</Text>
              <TextInput
                style={styles.input}
                textAlign={"center"}
                secureTextEntry={true}
                value={state.password}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) => setstate((prevState) => ({ ...prevState, password: value }))
                }
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btn}
              onPress={handleSubmit}
            >
              <Text style={styles.btnTitle}>SIGN IN</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")} style = {styles.log_in_page_link}>
                  <Text style = {styles.log_in_page_link__text}>Already have an account? Log In!</Text>
                </TouchableOpacity> 
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000000",
    height: 40,
    borderRadius: 6,

    color: "#000000",
  },
  form: {
    marginHorizontal: 40,
  },
  inputTitle: {
    color: "#FF00FF",
    marginBottom: 10,
    fontSize: 18,
    fontFamily: "Roboto-Regular",
  },
  btn: {
    borderRadius: 6,
    borderWidth: 1,
    height: 40,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#000000",
      },
      android: {
        backgroundColor: "#4169e1",
        borderColor: "transparent",
      },
    }),
  },
  btnTitle: {
    color: Platform.OS === "ios" ? "#4169e1" : "#000000",
    fontSize: 18,
  },
  headerTitle: {
    fontSize: 40,
    fontFamily: "Roboto-Bold",
  },
  registration_page_link__text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    letterSpacing: 0,

    textAlign: "center",
    color: "#1B4371",
  },
}); 