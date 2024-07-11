import React from "react";
import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

const HomeHero = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { registerUser, loginUser, register, setRegister } =
		useContext(AuthContext);

	const handleRegister = async (e) => {
		e.preventDefault();
		registerUser(email, password);
		setRegister(false);
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		loginUser(email, password);
	};

	return (
		<div className="main-container px-2 pt-[2rem]">
			<div className="heading text-center">
				<h1 className="main-heading text-[1.5rem] font-bold leading-[1.8rem]">
					Welcome to <br />{" "}
					<span className="text-[1.5rem]">
						The Federal Polytechnic Bida Payment Portal
					</span>
				</h1>
			</div>
			<p className="mt-[3rem] py-2 text-[.8rem] text-center">
				Please login or register to make payment
			</p>
			{register ? (
				<form className="register-container" onSubmit={handleRegister}>
					<div className="regitration-form text-center">
						<div className="email p-1">
							<input
								value={email}
								type="email"
								placeholder="Email"
								className="border px-2 w-[15rem] rounded"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="password p-1">
							<input
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type="password"
								placeholder="Password"
								className="border px-2 w-[15rem] rounded outline-0"
							/>
						</div>
					</div>
					<div className="buttons flex gap-4 justify-center text-white">
						<div className="login">
							<button className="border border-sky-500 bg-sky-500 text-[.8rem] py-[.2rem] my-3 px-[5.8rem] text-white rounded-xl">
								Register
							</button>
						</div>
					</div>
				</form>
			) : (
				<form className="login-container" onSubmit={handleLogin}>
					<div className="login-form text-center">
						<div className="email p-1">
							<input
								value={email}
								type="email"
								placeholder="Email"
								className="border px-2 w-[15rem] rounded outline-0 border-sky-500"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="password p-1">
							<input
								value={password}
								type="password"
								placeholder="Password"
								className="border px-2 w-[15rem] rounded outline-0 border-sky-500"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>
					<div className="buttons flex gap-4 justify-center text-white">
						<div className="login">
							<button className="border border-sky-500 bg-sky-500 text-[.8rem] py-[.2rem] my-3 px-[6.3rem] text-white rounded-xl">
								Login
							</button>
						</div>
					</div>
				</form>
			)}
		</div>
	);
};

export default HomeHero;
