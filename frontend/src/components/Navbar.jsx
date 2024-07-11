import React, { useContext, useState } from "react";
import bidalogo from "../assets/bidalogo.png";
import menu from "../assets/menu.svg";
import close from "../assets/close.svg";

import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = ({ rightButton }) => {
  const [menuToggle, setMenuToggle] = useState(false);

  const handleMenuToggle = () => {
    setMenuToggle((previous) => !previous);
  };

  const { user, logoutUser } = useContext(AuthContext);

  return (
    <div className="main-container shadow bg-white">
      <div className="mx-auto px-[1rem] ss:px-[3rem] h-[83.33px] flex justify-between max-w-[1200px] items-center">
        <div className="logo w-[60%] max-h-[83.33px] flex items-center">
          <img src={bidalogo} alt="Bida Logo" className="" />
        </div>
        <div className="sm:hidden">
          <img
            src={menuToggle ? close : menu}
            alt="Menu Icon"
            onClick={handleMenuToggle}
            className={`cursor-pointer w-[20px]`}
          />
        </div>
        <div className="hidden sm:block text-sky-500 font-bold">
          <ul className="flex gap-[1rem] items-center">
            <li className="cursor-pointer hover:text-sky-600 transition-all ease-in-out duration-400">
              Transactions
            </li>
            <li
              className="cursor-pointer hover:text-sky-600 transition-all ease-in-out duration-400"
              onClick={logoutUser}
            >
              Logout
            </li>
            <li className="cursor-pointer bg-sky-500 text-white py-1 px-2 text-[.8rem] rounded-full font-normal hover:bg-sky-600 transition-all duration-400 ease-in-out">
              Get support
            </li>
          </ul>
        </div>
      </div>
      {/* Dropdown Menu */}
      <ul
        className={`sm:hidden transition-all duration-400 ease-in-out absolute top-full right-0 top-20 bg-white text-black shadow-md mt-2 ${
          menuToggle ? "block" : "hidden"
        }`}
      >
        {/* <li className="block py-2 px-4 text-gray-800 cursor-pointer hover:bg-gray-100 transition-all ease-in-out duration-300">
          Home
        </li> */}
        <li
          className={`${
            user ? "block" : "hidden"
          } py-2 px-4 text-gray-800 hover:text-sky-600 font-bold cursor-pointer hover:bg-gray-100 transition-all ease-in-out duration-300`}
        >
          History
        </li>
        <li
          className={`py-2 px-4 text-gray-800 hover:text-sky-600 font-bold cursor-pointer hover:bg-gray-100 transition-all ease-in-out duration-300`}
        >
          Get support
        </li>
        <li
          className={`${
            user ? "block" : "hidden"
          } py-2 px-4 text-gray-800 hover:text-sky-600 font-bold cursor-pointer hover:bg-gray-100 transition-all ease-in-out duration-300`}
          onClick={logoutUser}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
