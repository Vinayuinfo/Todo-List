// import { Children, useContext, useState } from "react";
// import { usePassword } from "./password";

// const ApiContext = useContext<UserContextType | undefined>(undefined);

// const [getcontextUserData, setGetcontextUserData] = useState();
// const [LoadingContext, setLoadingContext] = useState(false);

// async function userDataApi() {
//   try {
//     const res = await fetch("https://dummyjson.com/users");
//     const data = await res.json();
//     setGetcontextUserData(data.users);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//   } finally {
//     console.log("Fetch attempt completed.");
//     setLoadingContext(false);
//   }
// }

// return (
//   <ApiContext.Provider
//     value={{ userDataApi, getcontextUserData, LoadingContext }}
//   >
//     {Children}
//   </ApiContext.Provider>
// );

"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface ContextApiData {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  image: string;
  phone: string;
  role: string;
  address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

interface ApiContextType {
  userDataApi: () => Promise<void>;
  getContextUserData: ContextApiData[];
  loadingContext: boolean;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

interface ApiProviderProps {
  children: ReactNode;
}

function ApiProvider({ children }: ApiProviderProps) {
  const [getContextUserData, setGetContextUserData] = useState<
    ContextApiData[]
  >([]);
  const [loadingContext, setLoadingContext] = useState<boolean>(false);

  async function userDataApi() {
    setLoadingContext(true);
    try {
      const res = await fetch("https://dummyjson.com/users");
      const data = await res.json();
      setGetContextUserData(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoadingContext(false);
    }
  }

  useEffect(() => {
    userDataApi();
  }, []);

  return (
    <ApiContext.Provider
      value={{ userDataApi, getContextUserData, loadingContext }}
    >
      {children}
    </ApiContext.Provider>
  );
}

function useApiContext(): ApiContextType {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApiContext must be used within an ApiProvider");
  }
  return context;
}

export { ApiProvider, useApiContext };
