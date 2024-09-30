import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [matNo, setMatNo] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(matNo, password);
    } catch (error) {
      // Handle login error if necessary
    } finally {
      setLoading(false);
    }
  };

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
                  Login Page
                </h1>
                <p className="text-sm font-normal pt-5">
                  Please login to make payment
                </p>
              </div>
            </h1>
          </div>

          <form className="mt-2 w-full" onSubmit={handleLogin}>
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
            <div className="grid justify-center mb-[1rem]">
              <button
                type="submit"
                className="bg-sky-500 text-white py-2 px-[4rem] rounded-xl hover:bg-sky-600 transition-all duration-400 font-bold flex justify-center items-center"
                disabled={loading}
              >
                {loading ? (
                  <div className="px-1">
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 text-white animate-spin mr-2"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
          <div className="grid justify-center">
            <p className="mb-3 text-center lg:text-left">
              Don't have an account?{" "}
              <span className="text-sky-700 hover:text-sky-800 font-bold cursor-pointer">
                <Link to={"/register"}>Register</Link>
              </span>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LoginPage;
