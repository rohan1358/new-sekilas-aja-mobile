import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useSelector } from "react-redux";
import { checkData } from "../utils";
import { ReduxState } from "../redux/reducers";
import { AuthRoute, MainRoute } from "../routes";

const Root = () => {
  const {
    sessionReducer: { isLogin },
    editProfile: { profile }
  } = useSelector((state: ReduxState) => state);
  return (
    <NavigationContainer>
      {checkData(isLogin && profile.id) ? <MainRoute /> : <AuthRoute />}
    </NavigationContainer>
  );
};

export default Root;
