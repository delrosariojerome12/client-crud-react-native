import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import {useRouter} from "expo-router";

import {API_BASE_URL} from "../../src/constants";

interface AuthProps {
  authState?: {token: string | null; authenticated: boolean | null};
  onRegister?: (username: string, password: string) => Promise<any>;
  onLogin?: (username: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
  status?: "duplicate" | "not-found" | "idle";
  errorMessage?: string;
  clearError?: () => void;
}
interface AuthState {
  token: string | null;
  authenticated: boolean | null;
}

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}: any) => {
  const [authState, setAuthState] = useState<AuthState>({
    authenticated: null,
    token: null,
  });
  const [status, setStatus] = useState<"duplicate" | "not-found" | "idle">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useRouter();
  useEffect(() => {
    // const loadToken = async () => {
    //   const token = await SecureStore.getItemAsync(TOKEN_KEY);
    //   console.log("stored:", token);
    //   if (token) {
    //     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //     setAuthState({
    //       token: token,
    //       authenticated: true,
    //     });
    //   }
    //   loadToken();
    // };
  }, []);

  const register = async (username: string, password: string) => {
    try {
      const result = await axios.post(`${API_BASE_URL}/auth/register`, {
        username,
        password,
      });

      setAuthState({
        token: result.data.token,
        authenticated: true,
      });

      // axios.defaults.headers.common[
      //   "Authorization"
      // ] = `Bearer ${result.data.token}`;

      // await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

      router.replace("screens/home");
      return;
    } catch (e: any) {
      setStatus("duplicate");
      setErrorMessage(e.response.data.msg);
      return {error: true, msg: e.response.data.msg};
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const result = await axios.post(`${API_BASE_URL}/auth/login`, {
        username,
        password,
      });

      setAuthState({
        token: result.data.token,
        authenticated: true,
      });

      // axios.defaults.headers.common[
      //   "Authorization"
      // ] = `Bearer ${result.data.token}`;

      // await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
      router.replace("screens/home");
    } catch (e: any) {
      setStatus("not-found");
      setErrorMessage(e.response.data.msg);

      console.log(e.response.data);
      return {error: true, msg: e.response.data.msg};
    }
  };

  const logout = async () => {
    console.log("shesh");

    // await SecureStore.deleteItemAsync(TOKEN_KEY);

    axios.defaults.headers.common["Authorization"] = "";
    setAuthState({
      token: "",
      authenticated: false,
    });
  };
  const clearError = () => {
    setStatus("idle");
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
    status: status,
    errorMessage,
    clearError,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
