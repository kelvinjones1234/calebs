import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const RegistrationPage = ({ setRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");

  const [lastName, setLastName] = useState("");
  const [matNo, setMatNo] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);

  const { registerUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/departments/"
        );
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    };
    fetchDepartments();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !matNo ||
      !department ||
      !phone ||
      !middleName
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      await registerUser(
        password,
        email,
        firstName,
        lastName,
        matNo,
        middleName,
        department,
        phone
      );
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Registration failed. Please try again.");
    }
  };
  console.log(
    firstName,
    department,
    matNo,
    lastName,
    middleName,
    email,
    phone,
    password
  );
  return (
    <div className="main-container bg-background-image bg-opacity-[10%] absolute w-full bg-contain bg-no-repeat bg-center h-screen">
      <div className="text-shadow h-screen bg-white bg-opacity-[90%]">
        <Navbar />

        <div className="grid justify-center items-center px-4 lg:px-0">
          <div className="text-center mt-10">
            <h1 className="text-2xl font-bold">
              Welcome to
              <br />
              <span className="text-xl">
                The Federal Polytechnic Bida Payment Portal
              </span>
              <div className="grid justify-center mb-4">
                <h1 className="font-bold text-center text-[1.5rem] text-sky-700">
                  Registration Page
                </h1>
                <p className="text-sm font-normal pt-5">
                  Please register to make payment
                </p>
              </div>
            </h1>
          </div>

          <form className="w-full max-w-lg lg:max-w-4xl ss:grid ss:grid-cols-2 ss:gap-4">
            <div>
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
            </div>
            <div>
              <div className="mb-4">
                <input
                  value={email}
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border rounded outline-0 border-gray-500 focus:border-sky-500"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  value={phone}
                  type="text"
                  placeholder="Phone Number"
                  className="w-full p-2 border rounded outline-0 border-gray-500 focus:border-sky-500"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <select
                  id="department"
                  className="border border-gray-500 rounded w-full px-2 py-2.5  focus:outline-none focus:border-blue-500 bg-white"
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
            </div>
          </form>
          <div className="grid justify-center">
            <p className="mb-3 text-center lg:text-left">
              Already have an account?{" "}
              <span className="text-sky-700 hover:text-sky-800 font-bold cursor-pointer">
                <Link to={"/login"}>Login</Link>
              </span>
            </p>
            <div className="flex justify-center lg:justify-start mb-[5rem]">
              <button
                onClick={handleRegister}
                type="submit"
                className="bg-sky-500 text-white py-2 px-[4rem] rounded-xl hover:bg-sky-600 transition-all duration-400 font-bold"
              >
                Register
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default RegistrationPage;
