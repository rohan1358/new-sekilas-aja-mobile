import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useSelector } from "react-redux";
import { ReduxState } from "../redux/reducers";
import { AuthRoute, MainRoute } from "../routes";

const Root = () => {
  const {
    sessionReducer: { isLogin },
  } = useSelector((state: ReduxState) => state);
  return (
    <NavigationContainer>
      {isLogin ? <MainRoute /> : <AuthRoute />}
    </NavigationContainer>
  );
};

export default Root;
