import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Linking } from "react-native";
import { WebView } from "react-native-webview";

const App = () => {
  const handleClickGoogleLogin = () => {
    alert("button clicked");
  };

  return (
    <View style={styles.container}>
      <Button title="Login whith Google" onPress={handleClickGoogleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default App;
