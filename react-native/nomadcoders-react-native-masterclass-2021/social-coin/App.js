import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import InNav from "./navigators/InNav";
import OutNav from "./navigators/OutNav";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {isLoggedIn ? <InNav /> : <OutNav />}
      </NavigationContainer>
    </QueryClientProvider>
  );
}