import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

import { AppRoutes } from "./app.routes";
import { SignIn } from "../screens/SignIn";
import { useAuth } from "../hooks/useAuth";

export function Routes() {
  const { user, changeUser } = useAuth();

  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user: any) {
    changeUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  );
}
