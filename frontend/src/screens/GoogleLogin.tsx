import React from "react";
import { Button, Text, View } from "react-native";
import { NavigationProp } from "@react-navigation/native";

type Props = {
  navigation: NavigationProp<any>;
};

const GoogleLogin = ({ navigation }: Props) => {
  return (
    <View>
      <Text>Welcome to google login page</Text>
    </View>
  );
};

export default GoogleLogin;
