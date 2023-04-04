import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { WebView } from "react-native-webview";

const App = () => {
  const [responseText, setResponseText] = useState("");
  const [showWebView, setShowWebView] = useState(false);
  const apiUrl =
    process.env.AUTH_URL_API ||
    "https://one-click-event-api.vercel.app/auth/facebook/callback";

  const handlePress = () => {
    setShowWebView(true);
  };

  const handleWebViewNavigationStateChange = (event: any) => {
    const { url } = event;
    if (url.includes(apiUrl)) {
      // Replace with your redirect URL
      const token = url.split("=")[1];
      // setResponseText(token);
      setShowWebView(false);
    }
  };

  return (
    <View style={styles.container}>
      {showWebView ? (
        <WebView
          source={{
            uri: apiUrl, // Replace with your Facebook app ID and redirect URL
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
