import React from "react";
import { AuthRoute } from "../routes";
import { NavigationContainer } from "@react-navigation/native";

const Root = () => {
  return (
    <NavigationContainer>
      <AuthRoute />
    </NavigationContainer>
  );
};

export default Root;
