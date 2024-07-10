import React, { useContext } from "react";
import bidalogo from "../assets/bidalogo.png";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = ({ rightButton }) => {
	const { register, setRegister, user, logoutUser } = useContext(AuthContext);
	return (
		<div className="main-container shadow bg-white">
			<div className="mx-auto px-[1rem] ss:px-[3rem] flex justify-between max-w-[1200px]">
				<div className="logo w-[50%] max-w-[300px] ss:w-[40%]">
					<img src={bidalogo} alt="" className="" />
				</div>
				<div className="complaint pt-1 text-[.8rem] flex gap-3 items-center">
					{user ? (
						<button
							className="border border-sky-500 py-[.3rem] px-4 rounded-2xl text-black"
							onClick={logoutUser}
						>
							Logout
						</button>
					) : (
						<button
							className="border border-sky-500 py-[.3rem] px-4 rounded-2xl text-black"
							onClick={() => setRegister((prev) => !prev)}
						>
							{register ? "Login" : "Register"}
						</button>
					)}
					<div className="get-support-button cursor-pointer hidden ss:block bg-sky-500 py-[.3rem] px-4 rounded-2xl text-black">
						<Link to="/get-support/">{rightButton}</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
