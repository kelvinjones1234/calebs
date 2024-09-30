import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const HomeHero = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [matNo, setMatNo] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);

  const { registerUser, loginUser, register, setRegister } =
    useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/departments/")
      .then((response) => setDepartments(response.data))
      .catch((error) => {
        console.error("Error fetching department data:", error);
      });
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    registerUser(
      password,
      email,
      firstName,
      lastName,
      matNo,
      middleName,
      department
    );
    setRegister(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    loginUser(matNo, password);
  };

  return (
    <div className="main-container px-4 py-10 flex flex-col items-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          Welcome to
          <br />
          <span className="text-xl">
            The Federal Polytechnic Bida Payment Portal
          </span>
        </h1>
      </div>
      {register ? (
        <form className="mt-8 w-full max-w-xs" onSubmit={handleRegister}>
          <div className="text-center mb-4">
            <h1 className="font-bold text-[1.5rem] text-sky-700">
              Registration Page
            </h1>
            <p className="text-sm">Please register to make payment</p>
          </div>
          <div className="mb-4">
            <input
              value={firstName}
              type="text"
              placeholder="First Name"
              className="w-full p-2 border rounded outline-0 border-gray-500 focus:border-sky-500"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              value={middleName}
              type="text"
              placeholder="Middle Name"
              className="w-full p-2 border rounded outline-0 border-gray-500 focus:border-sky-500"
              onChange={(e) => setMiddleName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              value={lastName}
              type="text"
              placeholder="Last Name"
              className="w-full p-2 border rounded outline-0 border-gray-500 focus:border-sky-500"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              value={matNo}
              type="text"
              placeholder="Matriculation Number"
              className="w-full p-2 border rounded outline-0 border-gray-500 focus:border-sky-500"
              onChange={(e) => setMatNo(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              value={email}
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded outline-0 border-gray-500 focus:border-sky-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <select
            id="department"
            className="border border-gray-500 rounded w-full p-2 focus:outline-none focus:border-blue-500 bg-white mb-4"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="" disabled>
              Select Department
            </option>
            {departments.map((item) => (
              <option key={item.id} value={item.id}>
                {item.department}
              </option>
            ))}
          </select>
          <div className="mb-4">
            <input
              value={password}
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded outline-0 border-gray-500 focus:border-sky-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="mb-3 text-center">
            Already have an account?{" "}
            <span
              onClick={() => setRegister((prev) => !prev)}
              className="text-sky-700 hover:text-sky-800 font-bold cursor-pointer"
            >
              Login
            </span>
          </p>
          <div className="flex justify-center mb-[4rem]">
            <button className="bg-sky-500 text-white py-2 px-8 rounded-xl hover:bg-sky-600 transition-all duration-400 font-bold">
              Register
            </button>
          </div>
        </form>
      ) : (
        <form className="mt-8 w-full max-w-xs" onSubmit={handleLogin}>
          <div className="text-center mb-4">
            <h1 className="font-bold text-[1.5rem] text-sky-700">Login Page</h1>
            <p className="text-sm">Please login to make payment</p>
          </div>
          <div className="mb-4">
            <input
              value={matNo}
              type="text"
              placeholder="Matriculation Number"
              className="w-full p-2 border rounded outline-0 border-gray-500 focus:border-sky-500"
              onChange={(e) => setMatNo(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              value={password}
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded outline-0 border-gray-500 focus:border-sky-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="mb-3 text-center">
            Don't have an account?{" "}
            <span
              onClick={() => setRegister((prev) => !prev)}
              className="text-sky-700 hover:text-sky-800 font-bold cursor-pointer"
            >
              Register
            </span>
          </p>

          <div className="flex justify-center">
            <button className="bg-sky-500 text-white py-2 px-8 rounded-xl hover:bg-sky-600 transition-all duration-400 font-bold">
              Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default HomeHero;
