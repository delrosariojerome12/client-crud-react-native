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

const Register = () => {
  const {onRegister, status, errorMessage, clearError} = useAuth();
  const [username, setUsername] = useState<any>("");
  const [password, setPassword] = useState<any>("");

  useEffect(() => {
    clearError && clearError();
  }, []);

  const handleRegister = () => {
    if (onRegister) {
      onRegister(username, password);
    } else {
      console.error("onLogin is undefined");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      {status === "duplicate" && (
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

      <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Link href={"screens/auth/login"} style={styles.link} asChild replace>
        <Text>Have Account? Login</Text>
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

export default Register;
