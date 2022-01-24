import React, { createContext, useCallback, useContext, useState } from "react";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

type User = FirebaseAuthTypes.User;

export type AuthContextData = {
  changeUser: (userChanged: FirebaseAuthTypes.User | null) => void;
  user: User | null;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const changeUser = useCallback(
    (userChanged: FirebaseAuthTypes.User | null) => {
      if (userChanged) {
        setUser(userChanged);
      } else {
        setUser(null);
      }
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        changeUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, AuthContext };
