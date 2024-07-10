import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const loginUser = async (email, password) => {
    try {
      if (!email || !password) {
        alert("Email abd password are required for logging in");
        return;
      }

      const response = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        navigate("/payment/");
      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };
  const registerUser = async (email, password) => {
    try {
      if (!email || !password) {
        alert("Email and password are required to create and account");
        return;
      }
      const respones = await fetch("http://localhost:8000/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await respones.json();
      if (respones.status === 200) {
        navigate("/payment/");
        console.error("Login successful", respones.statusText);
      } else {
        console.error("Login failed:", error.message);
        setShowError(true);
      }
    } catch (error) {
      console.error("Registeration failed:", error.message);
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/home-page/");
  };
  const AuthContextData = {
    register: register,
    user: user,
    registerUser: registerUser,
    loginUser: loginUser,
    setRegister: setRegister,
    logoutUser: logoutUser,
  };
  return (
    <AuthContext.Provider value={AuthContextData}>
      {children}
    </AuthContext.Provider>
  );
};
