import React from "react";
import Navbar from "../components/Navbar";
import HomeHero from "../components/HomeHero";
import Footer from "../components/Footer";
import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import FormDataContext from "../context/FormDataContext";

const HomePage = () => {
	return (
		<div className="main-container bg-background-image bg-opacity-[10%] absolute w-full bg-contain bg-no-repeat bg-center h-screen">
			<div>
				<div className="text-shadow h-screen bg-white bg-opacity-[90%]">
					<Navbar rightButton="Get support" />
					<HomeHero />
					<Footer />
				</div>
			</div>
		</div>
	);
};

export default HomePage;
