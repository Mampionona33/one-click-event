import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const App = () => {
  const [responseText, setResponseText] = useState("");

  const handlePress = async () => {
    try {
      const response = await fetch(
        "http://your-backend-api.com/api/v1/auth/facebook",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setResponseText(JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My App</Text>
      <Button title="Log in with Facebook" onPress={handlePress} />
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
