import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../src/store/store";
import {Link} from "expo-router";
import {useAuth} from "../../context/AuthContext";

const Login = () => {
  const {onLogin, status, errorMessage, clearError} = useAuth();
  const [username, setUsername] = useState<any>("");
  const [password, setPassword] = useState<any>("");

  const handleLogin = () => {
    if (onLogin) {
      onLogin(username, password);
    } else {
      console.error("onLogin is undefined");
    }
  };

  useEffect(() => {
    clearError && clearError();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {status === "not-found" && (
        <Text style={styles.error}>{errorMessage}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Link href={"screens/auth/register"} style={styles.link} asChild replace>
        <Text>No Account? Register Now</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 15,
    borderRadius: 100 / 30,
  },
  loginButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "blue",
    fontSize: 14,
    padding: 10,
  },
  error: {
    fontSize: 14,
    fontWeight: "bold",
    color: "red",
    padding: 10,
    backgroundColor: "#eee",
    width: "100%",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default Login;
