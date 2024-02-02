import React from "react";
import {Stack} from "expo-router";
import {Provider} from "react-redux";
import store from "../src/store/store";
import {AuthProvider, useAuth} from "./context/AuthContext";

export const App = () => {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
};

export const RootLayout = () => {
  const {authState} = useAuth();
  if (authState?.authenticated) {
    return (
      <Provider store={store}>
        <Stack initialRouteName={"screens/home"}>
          <Stack.Screen name="screens/home" options={{headerShown: false}} />
        </Stack>
      </Provider>
    );
  }
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{title: "Getting Started"}} />
        <Stack.Screen
          name="screens/auth/login"
          options={{title: "", headerShown: false}}
        />
        <Stack.Screen
          name="screens/auth/register"
          options={{title: "", headerShown: false}}
        />
      </Stack>
    </Provider>
  );
};

export default App;
