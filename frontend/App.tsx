import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Linking } from "react-native";
import { WebView } from "react-native-webview";

const App = () => {
  const [responseText, setResponseText] = useState("");
  const [showWebView, setShowWebView] = useState(false);

  const handlePress = () => {
    setShowWebView(true);
  };
  // const redirectUrl = "http://localhost:3000";
  // Linking.openURL(redirectUrl);

  const handleWebViewNavigationStateChange = (event: any) => {
    const { url } = event;
    if (url.includes("http://localhost:3000")) {
      // Replace with your redirect URL
      const token = url.split("=")[1];
      // setResponseText(token);
      setShowWebView(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My App</Text>
      {showWebView ? (
        <WebView
          source={{
            uri: "http://localhost:3000", // Replace with your Facebook app ID and redirect URL
          }}
          onNavigationStateChange={handleWebViewNavigationStateChange}
        />
      ) : (
        <Button title="Log in with Facebook" onPress={handlePress} />
      )}
      {responseText ? <Text>{responseText}</Text> : null}
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
