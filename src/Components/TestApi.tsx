import Image from "next/image";
import React, { useState } from "react";
import "reactjs-popup/dist/index.css";
import Popupp from "./Popupp";
import { usePassword } from "@/app/Context/password";

interface User {
  id: number;
  email: string;
  username: string;
  last_name: string;
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

  const {
    removePassword,
    setPassword: setLocalStoragePassword,
  } = usePassword();

  console.log("userPassword>>>>", usePassword);

  function getLocalid() {
    setLocalStoragePassword("1559");
  }

  async function getFetching() {
    if (localStorage.getItem("id")) {
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
    }
    {
      console.log("Something Went Wrong!");
    }
  }

  function getViewprofile(id: number) {
    const pageview = userData.find((user) => user.id === id);
    if (pageview) {
      setView({
        image: pageview.image,
        username: pageview.username,
        firstName: "", // or get from somewhere if available
        lastName: pageview.last_name,
        email: pageview.email,
        phone: pageview.phone,
        userAgent: navigator.userAgent, // if needed
        role: pageview.role,
        address: pageview.address,
      });
    }
  }

  return (
    <div className="relative p-6 md:p-10 bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
      <div className="flex justify-between items-center">
        <div className="text-2xl md:text-4xl font-bold text-green-800 mb-6 animate-fade-in">
          🌿 Registration Form
        </div>
        <button
          onClick={() => {
            getLocalid();
          }}
        >
          setlocal
        </button>
        {userData && userData.length > 0 && (
          <div>
            <button
              onClick={() => {
                SetUserData([]);
                removePassword();
              }}
              className="cursor-pointer bg-green-600 p-2 text-white rounded-lg hover:bg-green-700 transition-all shadow-md"
            >
              Clear Data
            </button>
          </div>
        )}
      </div>

      <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
        <table className="w-full border-collapse">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3 text-left">Avatar</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left"></th>
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

      {userData.length === 0 ? (
        <div className="mt-6">
          <button
            onClick={getFetching}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all shadow-md"
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
