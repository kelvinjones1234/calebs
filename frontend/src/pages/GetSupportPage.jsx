import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthContext from "../context/AuthContext";
import GetSupportPageHero from "../components/GetSupportPageHero";

const GetSupportPage = () => {
	const { register } = useContext(AuthContext);
	return (
		<div className="main-container bg-background-image bg-opacity-[10%] absolute w-full bg-contain bg-no-repeat bg-center h-screen">
			<div>
				<div className="text-shadow h-screen bg-white bg-opacity-[90%]">
					<Navbar rightButton="Home" />
					<GetSupportPageHero />
					<Footer />
				</div>
			</div>
		</div>
	);
};

export default GetSupportPage;
