// "use client";

// import React, { createContext, useContext, useEffect, useState } from "react";

// const UserContext = createContext("");

// function UserProvider({ children }) {
//   const [userPassword, setUserPassword] = useState("");

//   function removePassword() {
//     setUserPassword("");
//     localStorage.removeItem("id");
//   }

//   function setPassword(value) {
//     localStorage.setItem("id", value);
//     setUserPassword(value);
//   }

//   // useEffect(() => {
//   //   localStorage.setItem("id", "1559");
//   // }, []);

//   return (
//     <UserContext.Provider
//       value={{ userPassword, setUserPassword, removePassword, setPassword }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// }

// function usePassword() {
//   const response = useContext(UserContext);
//   if (!response) throw new Error("usePassword is used outside of UserProvider");

//   return response;
// }

// export { UserProvider, usePassword };

"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// 1. Define the shape of the context
interface UserContextType {
  userPassword: string;
  setUserPassword: (value: string) => void;
  setPassword: (value: string) => void;
  removePassword: () => void;
}

// 2. Create context with undefined initial value
const UserContext = createContext<UserContextType | undefined>(undefined);

// 3. Define props for the provider
interface UserProviderProps {
  children: ReactNode;
}

function UserProvider({ children }: UserProviderProps) {
  const [userPassword, setUserPassword] = useState<string>("");

  function removePassword() {
    setUserPassword("");
    localStorage.removeItem("id");
  }

  function setPassword(value: string) {
    localStorage.setItem("id", value);
    setUserPassword(value);
  }

  return (
    <UserContext.Provider
      value={{ userPassword, setUserPassword, removePassword, setPassword }}
    >
      {children}
    </UserContext.Provider>
  );
}

// 4. Custom hook with type-safe error handling
function usePassword(): UserContextType {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("usePassword must be used within a UserProvider");

  return context;
}

export { UserProvider, usePassword };
