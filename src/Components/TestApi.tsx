import Image from "next/image";
import React, { useState } from "react";
import "reactjs-popup/dist/index.css";
import Popupp from "./Popupp";
import { usePassword } from "@/app/Context/password";

interface User {
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

interface view {
  image: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userAgent: string;
  role: string;
  address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

const TestApi = () => {
  const [userData, SetUserData] = useState<User[]>([]);
  const [view, setView] = useState<view | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localSetByUser, setLocalSetByUser] = useState("");
  const [inputValue, setInputValue] = useState("");

  const {
    removePassword,
    setPassword: setLocalStoragePassword,
  } = usePassword();

  function getLocalid() {
    setLocalStoragePassword(localSetByUser);
  }

  async function getFetching() {
    const localId = localStorage.getItem("id");

    if (localId === "1559") {
      setLoading(true);
      try {
        const res = await fetch("https://dummyjson.com/users");
        const data = await res.json();
        SetUserData(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        console.log("Fetch attempt completed.");
        setLoading(false);
      }
    } else {
      console.log("Invalid ID: Access denied or missing 'id' in localStorage.");
    }
  }

  function getViewprofile(id: number) {
    const pageview = userData.find((user) => user.id === id);

    if (pageview) {
      setView({
        image: pageview.image,
        username: pageview.username,
        firstName: pageview.firstName,
        lastName: pageview.lastName,
        email: pageview.email,
        phone: pageview.phone,
        userAgent: navigator.userAgent,
        role: pageview.role,
        address: pageview.address,
      });
    }
  }

  console.log("SetLocalByUser>>", localSetByUser);

  return (
    <div className="relative p-6 md:p-10 bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
      <div className="flex justify-between items-center">
        <div className="text-2xl md:text-4xl font-bold text-green-800 mb-6 animate-fade-in">
          🌿 Registration Form
        </div>
        <div className="flex gap-2 items-center">
          <div>
            {localSetByUser !== "1559" ? (
              <p>Please Enter Corrrect Id to Show a Button</p>
            ) : (
              ""
            )}
            <input
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setLocalSetByUser(e.target.value);
              }}
              className={
                localSetByUser === "1559"
                  ? "border"
                  : "border-2  border-red-500"
              }
            />
            <button
              type="submit"
              className={
                setLocalStoragePassword
                  ? "bg-green-600 cursor-pointer disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all shadow-md"
                  : "hidden"
              }
              hidden={localSetByUser.trim() !== "1559"}
              onClick={() => {
                getLocalid();
              }}
            >
              setlocal
            </button>
          </div>
          {userData && userData.length > 0 && (
            <div>
              <button
                onClick={() => {
                  SetUserData([]);
                  removePassword();
                  setInputValue("");
                }}
                className="cursor-pointer bg-green-600 p-2 text-white rounded-lg hover:bg-green-700 transition-all shadow-md"
              >
                Clear Data
              </button>
            </div>
          )}
        </div>
      </div>

      {/* {localSetByUser !== "1559" ? <p>Please Correct Id Enter</p> : ""} */}

      {userData && userData.length > 0 ? (
        <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
          <table className="w-full border-collapse">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-3 text-left">Avatar</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Address</th>
                <th className="p-3 text-left">Op</th>
              </tr>
            </thead>
            <tbody>
              {userData &&
                userData.length > 0 &&
                userData.map(
                  ({ id, image, username, email, phone, address, role }) => {
                    return (
                      <tr
                        key={id}
                        className="hover:bg-green-50 transition-all border-b"
                      >
                        <td>
                          <Image
                            src={image}
                            height={40}
                            width={40}
                            className="rounded-full"
                            alt={username}
                          />
                        </td>
                        <td>{role}</td>
                        <td>{email}</td>
                        <td>{phone}</td>
                        <td>{`${address.address} ${address.address} ${address.city} ${address.state} ${address.postalCode}`}</td>
                        <td>
                          <button
                            className="cursor-pointer"
                            onClick={() => {
                              setIsOpen(true);
                              getViewprofile(id);
                            }}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  }
                )}
            </tbody>
          </table>
          {isOpen && view && <Popupp setIsOpen={setIsOpen} view={view} />}
        </div>
      ) : (
        <div className="flex flex-col text-center">
          <p className="text-xl">No data Avialble? Ok two step Follow</p>
          {/* <p>first is GetData</p> */}
          <p>Set Your Id and Get Data</p>
        </div>
      )}

      {userData.length === 0 ? (
        <div className="mt-6 flex justify-center">
          <button
            onClick={getFetching}
            className="bg-green-600 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all shadow-md"
          >
            {loading === true ? "Loading.." : "GetData"}
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TestApi;
