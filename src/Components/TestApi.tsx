// import Image from "next/image";
// import React, { useState } from "react";
// import "reactjs-popup/dist/index.css";
// import Popupp from "./Popupp";
// import { usePassword } from "@/app/Context/password";

// interface User {
//   id: number;
//   email: string;
//   username: string;
//   firstName: string;
//   lastName: string;
//   image: string;
//   phone: string;
//   role: string;
//   address: {
//     address: string;
//     city: string;
//     state: string;
//     postalCode: string;
//   };
// }

// interface view {
//   image: string;
//   username: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   userAgent: string;
//   role: string;
//   address: {
//     address: string;
//     city: string;
//     state: string;
//     postalCode: string;
//   };
// }

// const TestApi = () => {
//   const [userData, SetUserData] = useState<User[]>([]);
//   const [view, setView] = useState<view | undefined>(undefined);
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [localSetByUser, setLocalSetByUser] = useState("");
//   const [inputValue, setInputValue] = useState("");

//   const {
//     removePassword,
//     setPassword: setLocalStoragePassword,
//   } = usePassword();

//   function getLocalid() {
//     setLocalStoragePassword(localSetByUser);
//   }

//   async function getFetching() {
//     const localId = localStorage.getItem("id");

//     if (localId === "1559") {
//       setLoading(true);
//       try {
//         const res = await fetch("https://dummyjson.com/users");
//         const data = await res.json();
//         SetUserData(data.users);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         console.log("Fetch attempt completed.");
//         setLoading(false);
//         removePassword();
//       }
//     } else {
//       console.log("Invalid ID: Access denied.");
//     }
//   }

//   function getViewprofile(id: number) {
//     const pageview = userData.find((user) => user.id === id);

//     if (pageview) {
//       setView({
//         image: pageview.image,
//         username: pageview.username,
//         firstName: pageview.firstName,
//         lastName: pageview.lastName,
//         email: pageview.email,
//         phone: pageview.phone,
//         userAgent: navigator.userAgent,
//         role: pageview.role,
//         address: pageview.address,
//       });
//     }
//   }

//   return (
//     <div className="relative p-6 md:p-10 bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
//       <div className="sm:flex justify-between items-center">
//         <div className="text-2xl md:text-4xl text-center font-bold text-green-800 mb-6 animate-fade-in">
//           🌿 Login To Data Show
//         </div>
//         <div className="flex gap-2 justify-center items-center">
//           <div>
//             {localSetByUser !== "1559" ? (
//               <p className="text-black text-center">
//                 Please Enter Corrrect Id to Show a Button
//               </p>
//             ) : (
//               ""
//             )}
//             <div className="flex flex-col sm:flex-row gap-2 text-black justify-center">
//               <div>
//                 <input
//                   value={inputValue}
//                   onChange={(e) => {
//                     setInputValue(e.target.value);
//                     setLocalSetByUser(e.target.value);
//                   }}
//                   className={
//                     localSetByUser === "1559"
//                       ? "border"
//                       : "border-2  border-red-500"
//                   }
//                 />
//                 {localSetByUser === "1559" ? (
//                   <p>Click Login and Click Get Data</p>
//                 ) : (
//                   ""
//                 )}
//               </div>
//               <button
//                 type="submit"
//                 className="bg-green-600 cursor-pointer disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all shadow-md"
//                 hidden={localSetByUser.trim() !== "1559"}
//                 onClick={() => {
//                   getLocalid();
//                 }}
//               >
//                 Login
//               </button>
//             </div>
//           </div>
//           {userData && userData.length > 0 && (
//             <div>
//               <button
//                 onClick={() => {
//                   SetUserData([]);
//                   removePassword();
//                   setInputValue("");
//                 }}
//                 className="cursor-pointer bg-green-600 p-3.5 text-white rounded-lg hover:bg-green-700 transition-all shadow-md"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* {localSetByUser !== "1559" ? <p>Please Correct Id Enter</p> : ""} */}

//       {userData && userData.length > 0 ? (
//         <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
//           <table className="w-full border-collapse">
//             <thead className="bg-green-600 text-white">
//               <tr>
//                 <th className="p-3 text-left">Avatar</th>
//                 <th className="p-3 text-left">Role</th>
//                 <th className="p-3 text-left">Email</th>
//                 <th className="p-3 text-left">Phone</th>
//                 <th className="p-3 text-left">Address</th>
//                 <th className="p-3 text-left">Op</th>
//               </tr>
//             </thead>
//             <tbody>
//               {userData &&
//                 userData.length > 0 &&
//                 userData.map(
//                   ({ id, image, username, email, phone, address, role }) => {
//                     return (
//                       <tr
//                         key={id}
//                         className="hover:bg-green-50 transition-all border-b"
//                       >
//                         <td>
//                           <Image
//                             src={image}
//                             height={40}
//                             width={40}
//                             className="rounded-full"
//                             alt={username}
//                           />
//                         </td>
//                         <td>{role}</td>
//                         <td>{email}</td>
//                         <td>{phone}</td>
//                         <td>{`${address.address} ${address.address} ${address.city} ${address.state} ${address.postalCode}`}</td>
//                         <td>
//                           <button
//                             className="cursor-pointer"
//                             onClick={() => {
//                               setIsOpen(true);
//                               getViewprofile(id);
//                             }}
//                           >
//                             View
//                           </button>
//                         </td>
//                       </tr>
//                     );
//                   }
//                 )}
//             </tbody>
//           </table>
//           {isOpen && view && <Popupp setIsOpen={setIsOpen} view={view} />}
//         </div>
//       ) : (
//         <div className="flex flex-col text-center">
//           <p className="text-xl text-black">
//             No data Avialble? Ok two step Follow
//           </p>
//           {/* <p>first is GetData</p> */}
//           <p className="text-black">Set Your Id and Get Data</p>
//         </div>
//       )}

//       {userData.length === 0 && localSetByUser === "1559" ? (
//         <div className="mt-6 flex justify-center">
//           <button
//             onClick={getFetching}
//             hidden={localSetByUser !== "1559"}
//             className="bg-green-600 disabled:cursor-not-allowed cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all shadow-md"
//           >
//             {loading === true ? "Loading.." : "GetData"}
//           </button>
//         </div>
//       ) : (
//         ""
//       )}
//     </div>
//   );
// };

// export default TestApi;

"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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

const UserTable = ({
  userData,
  onView,
}: {
  userData: User[];
  onView: (id: number) => void;
}) => (
  <div className="overflow-x-auto mt-3 sm:mt-0 rounded-xl shadow-lg bg-white">
    <table className="w-full border-collapse">
      <thead className="bg-green-600 text-white">
        <tr>
          <th className="p-3 text-left">Avatar</th>
          <th className="p-3 text-left">Role</th>
          <th className="p-3 text-left">Email</th>
          <th className="p-3 text-left">Phone</th>
          <th className="hidden sm:flex p-3 text-left">Address</th>
          <th className="p-3 text-left">Op</th>
        </tr>
      </thead>
      <tbody>
        {userData.map(
          ({ id, image, username, email, phone, address, role }) => (
            <tr key={id} className="hover:bg-green-50 transition-all border-b">
              <td>
                <Image
                  src={image}
                  height={40}
                  width={40}
                  className="rounded-full"
                  alt={username}
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.src = "/default-avatar.png";
                  }}
                />
              </td>
              <td>{role}</td>
              <td>{email}</td>
              <td className="text-nowrap">{phone}</td>
              <td className="hidden text-center sm:flex sm:justify-center sm:items-center">{`${address.address}, ${address.city}, ${address.state} - ${address.postalCode}`}</td>
              <td className="px-5 sm:p-0">
                <button
                  className="cursor-pointer text-green-700 underline"
                  onClick={() => onView(id)}
                  aria-label="View user details"
                >
                  View
                </button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  </div>
);

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

  // Persist login from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("id");
    if (stored === "1559") {
      setLocalSetByUser(stored);
      getFetching();
    }
  }, []);

  function getLocalid() {
    localStorage.setItem("id", localSetByUser);
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
        setLoading(false);
        removePassword();
      }
    } else {
      console.log("Invalid ID: Access denied.");
    }
  }

  function getViewprofile(id: number) {
    const user = userData.find((u) => u.id === id);
    if (user) {
      setView({
        image: user.image,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        userAgent: navigator.userAgent,
        role: user.role,
        address: user.address,
      });
      setIsOpen(true);
    }
  }

  const handleLogout = () => {
    SetUserData([]);
    removePassword();
    localStorage.removeItem("id");
    setInputValue("");
    setLocalSetByUser("");
  };

  return (
    <div className="relative text-black p-6 md:p-10 bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
      <div className="sm:flex justify-between items-center">
        <div className="text-2xl md:text-4xl text-center font-bold text-green-800 mb-6 animate-fade-in">
          🌿 Login To Data Show
        </div>

        <div className="flex gap-2 items-center flex-col sm:flex-row">
          <div>
            <input
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setLocalSetByUser(e.target.value);
              }}
              className={`px-2 py-1 rounded ${
                localSetByUser === "1559" ? "border" : "border-2 border-red-500"
              }`}
              placeholder="Enter ID"
            />
            {localSetByUser === "1559" && (
              <p className="text-green-700">Click Login and then Get Data</p>
            )}
            {localSetByUser !== "1559" && (
              <p className="text-red-500">Please enter correct ID</p>
            )}
          </div>
          {/* <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all shadow-md disabled:cursor-not-allowed"
            hidden={localSetByUser.trim() !== "1559"}
            onClick={getLocalid}
          >
            Login
          </button> */}
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all shadow-md disabled:cursor-not-allowed"
            hidden={localStorage.getItem("id") === "1559"}
            onClick={getLocalid}
          >
            Login
          </button>
          [
          {userData.length > 0 && (
            <button
              onClick={handleLogout}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all shadow-md"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {userData.length > 0 ? (
        <>
          <UserTable userData={userData} onView={getViewprofile} />
          {isOpen && view && (
            <div className="transition-opacity animate-fade-in">
              <Popupp setIsOpen={setIsOpen} view={view} />
            </div>
          )}
        </>
      ) : (
        <div className="text-center mt-10 text-black">
          <p className="text-xl">No data available. Follow these steps:</p>
          <p>1. Enter ID</p>
          <p>2. Click Login → Get Data</p>
        </div>
      )}

      {userData.length === 0 && localSetByUser === "1559" && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={getFetching}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all shadow-md"
          >
            {loading ? "Loading..." : "Get Data"}
          </button>
        </div>
      )}
    </div>
  );
};

export default TestApi;
