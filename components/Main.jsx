import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../router";

import { authStateCahngeUser } from "../redux/auth/authOperations";

const Main = () => {

  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authStateCahngeUser());
  }, []);

  const routing = useRoute(stateChange);
  useEffect(() => {}, []);
  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;