import {View, Text, Dimensions, SafeAreaView} from "react-native";
import React from "react";
import {Drawer} from "expo-router/drawer";
import {FontAwesome} from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import {useRouter} from "expo-router";
import {useAuth} from "../../context/AuthContext";
import {TextInput} from "react-native-gesture-handler";

const CustomDrawerLogout = (props: any) => {
  const {onLogout} = useAuth();
  const router = useRouter();

  return (
    <SafeAreaView style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View>
        <DrawerItem
          label={"Logout"}
          labelStyle={{fontSize: 18}} // Adjust the fontSize as needed
          onPress={() => {
            router.replace("screens/auth/login");
            onLogout && onLogout();
          }}
          icon={({size, color}) => (
            <FontAwesome name="sign-out" size={size} color={color} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const HomeLayout = () => {
  return (
    <Drawer
      screenOptions={{drawerStyle: {gap: 10}}}
      drawerContent={(props) => <CustomDrawerLogout {...props} />}
    >
      <Drawer.Screen
        name="index"
        options={{
          headerTitle: "Home",
          drawerLabel: "Home",
          drawerIcon: ({size, color}) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
          drawerLabelStyle: {fontSize: 18},
        }}
      />
    </Drawer>
  );
};

export default HomeLayout;
