import React from "react";
import { Button, View } from "react-native";
import { NavigationProp } from "@react-navigation/native";

type Props = {
  navigation: NavigationProp<any>;
};

const Login = ({ navigation }: Props) => {
  return (
    <View>
      <Button
        title="Login with Google"
        onPress={() => navigation.navigate("GoogleLogin")}
      />
    </View>
  );
};

export default Login;
