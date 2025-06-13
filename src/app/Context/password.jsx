"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [userPassword, setUserPassword] = useState("");

  function removePassword() {
    setUserPassword("");
    localStorage.removeItem("id");
  }

  function setPassword(value) {
    localStorage.setItem("id", value);
    setUserPassword(value);
  }

  // useEffect(() => {
  //   localStorage.setItem("id", "1559");
  // }, []);

  return (
    <UserContext.Provider
      value={{ userPassword, setUserPassword, removePassword, setPassword }}
    >
      {children}
    </UserContext.Provider>
  );
}

function usePassword() {
  const response = useContext(UserContext);
  if (!response) throw new error("usePassword is used outside of UserProvider");

  return response;
}

export { UserProvider, usePassword };
