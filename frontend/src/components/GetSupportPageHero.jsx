import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
 
const GetSupportPageHero = () => {
	const { user } = useContext(AuthContext);
	const [complain, setComplain] = useState("");

	const submitComplain = async () => {
		const respones = await fetch("http://127.0.0.1:8000/api/complain/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: user.user_id, complain: complain }),
		});
		console.log(user);
		// const data = await respones.json();
		// if (respones.status === 200) {
		// 	console.log("Submitted successfully", respones.statusText);
		// } else {
		// 	console.error("Submission failed:", error.message);
		// }
	};
	return (
		<div className="main-container px-2 pt-[2rem]">
			<div className="heading text-center max-w-[500px] mx-auto">
				<h1 className="main-heading text-[1.5rem] font-bold leading-[1.5rem]">
					We're here to help! <br />{" "}
					<span className="text-[1rem] font-normal leading-[.1rem]">
						Whether you have a question about using this platform or need
						assistance with a transaction.
					</span>
				</h1>
			</div>
			<div className="form-container text-center mt-[3rem]">
				<form onSubmit={submitComplain}>
					<textarea
						value={complain}
						onChange={(e) => setComplain(e.target.value)}
						name=""
						id=""
						cols="30"
						rows="5"
						placeholder="write us"
						className="p-1 border border-9-black rounded"
					></textarea>
					<div className="button">
						<button className="py-1 bg-sky-500 px-[8.9rem] text-white rounded-xl">
							Send
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default GetSupportPageHero;
