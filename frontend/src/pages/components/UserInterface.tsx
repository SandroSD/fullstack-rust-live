import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import Image from "next/image";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserInterfaceProps {
  backendName: string;
}

const UserInterface: React.FC<UserInterfaceProps> = ({ backendName }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [updateUser, setUpdateUser] = useState({ id: "", name: "", email: "" });

  const backgroundColors: { [key: string]: string } = {
    rust: "bg-orange-500",
  };

  const buttonColors: { [key: string]: string } = {
    rust: "bg-orange-500 hover:bg-orange-600",
  };

  const bgColor =
    backgroundColors[backendName as keyof typeof backgroundColors] ||
    "bg-gray-200";
  const btnColor =
    buttonColors[backendName as keyof typeof buttonColors] ||
    "bg-gray-500 hover:bg-gray-600";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/${backendName}/users`);
        setUsers(response.data.reverse());
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [backendName, apiUrl]);

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/api/${backendName}/users`,
        newUser,
      );
      setUsers([response.data, ...users]);
      setNewUser({ name: "", email: "" });
    } catch (error) {
      console.log("Error creating user: ", error);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.put(`${apiUrl}/api/${backendName}/users/${updateUser.id}`, {
        name: updateUser.name,
        email: updateUser.email,
      });
      setUpdateUser({ id: "", name: "", email: "" });
      setUsers(
        users.map((user) => {
          if (user.id === parseInt(updateUser.id)) {
            return { ...user, name: updateUser.name, email: updateUser.email };
          }
          return user;
        }),
      );
    } catch (error) {
      console.log("Error updating user: ", error);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await axios.delete(`${apiUrl}/api/${backendName}/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.log("Error deleting user: ", error);
    }
  };

  return (
    <div
      className={`user-interface ${bgColor} ${backendName} w-full max-w-md p-4 my-4 rounded shadow`}
    >
      <Image
        src={`/${backendName}logo.svg`}
        alt={`${backendName} Logo`}
        className="w-20 h-20 mb-6 mx-auto"
        width={80}
        height={80}
      />

      {/* Add user form */}
      <form
        onSubmit={handleCreateUser}
        className="mb-6 p-4 bg-blue-100 rounded shadow"
      >
        <input
          placeholder="Name"
          type="text"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="mb-2 w-full p-2 border border-gray-300 rounded"
        />

        <input
          placeholder="Email"
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="mb-2 w-full p-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Add User
        </button>
      </form>

      {/* Update user form */}
      <form
        onSubmit={handleUpdateUser}
        className="mb-6 p-4 bg-blue-100 rounded shadow"
      >
        <input
          placeholder="User ID"
          value={updateUser.id}
          onChange={(e) => setUpdateUser({ ...updateUser, id: e.target.value })}
          className="mb-2 w-full p-2 border border-gray-300 rounded"
        />

        <input
          placeholder="Name"
          type="text"
          value={updateUser.name}
          onChange={(e) =>
            setUpdateUser({ ...updateUser, name: e.target.value })
          }
          className="mb-2 w-full p-2 border border-gray-300 rounded"
        />

        <input
          placeholder="Email"
          type="email"
          value={updateUser.email}
          onChange={(e) =>
            setUpdateUser({ ...updateUser, email: e.target.value })
          }
          className="mb-2 w-full p-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="w-full p-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Update User
        </button>
      </form>

      {/* Display users */}
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
          >
            <Card card={user} />
            <button
              onClick={() => handleDeleteUser(user.id)}
              className={`${btnColor} text-white py-2 px-4 rounded`}
            >
              Delete User
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInterface;
