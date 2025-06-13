"use client";

import React, { useState } from "react";
import { useApiContext } from "../Context/api";

const Page = () => {
  const { getContextUserData } = useApiContext();
  const [selectedRole, setSelectedRole] = useState("admin");

  const roles = ["admin", "moderator", "user"];

  const filteredUsers = getContextUserData.filter(
    (user) => user.role.toLowerCase() === selectedRole
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl text-center mb-4">Role-based User Filter</h2>

      <div className="flex justify-center gap-4 mb-6">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`px-4 py-2 rounded-full border ${
              selectedRole === role
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-3 max-w-md mx-auto">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="border p-4 rounded-md shadow-sm bg-white"
            >
              <p>
                <strong>Name:</strong> {user.firstName} {user.lastName}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No users in this role.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
