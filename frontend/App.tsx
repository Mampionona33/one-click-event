import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Linking } from "react-native";
import { WebView } from "react-native-webview";

const App = () => {
  const [responseText, setResponseText] = useState("");
  const [showWebView, setShowWebView] = useState(false);
  const [data, setData] = useState("");
  const basedUrl =
    process.env.API_BASED_URL || "https://one-click-event-api.vercel.app/";
  const apiUrl =
    process.env.AUTH_URL_API ||
    "https://one-click-event-api.vercel.app/auth/facebook/callback";

  const getData = async () => {
    const response = await fetch(`${basedUrl}/users`, {
      method: "GET",
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    const data = await response.text();
    console.log(data);
    setData(data);
  };

  const handleWebViewNavigationStateChange = (event: any) => {
    const { url } = event;
    if (url.includes(`${basedUrl}/auth/facebook/callback`)) {
      // Replace with your redirect URL
      const token = url.split("=")[1];
      getData();
      setShowWebView(false);
    }
  };

  const handleLoginPress = () => {
    Linking.openURL(`${basedUrl}/auth/facebook`);
  };

  return (
    <View style={styles.container}>
      {showWebView ? (
        <WebView
          source={{
            uri: `${basedUrl}/auth/facebook`,
          }}
          onNavigationStateChange={handleWebViewNavigationStateChange}
        />
      ) : (
        <Button title="Log in with Facebook" onPress={handleLoginPress} />
      )}

      {data ? <Text>{JSON.stringify(data)}</Text> : <Text>"no data"</Text>}
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
