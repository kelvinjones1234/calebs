import React, { useState, useEffect } from "react";

const RecieptPage = () => {
	const [transactionData, setTransactionData] = useState(null);
	const PAYSTACK_SECRET_KEY =
		"sk_test_d77866a8e1822e78b4b62e5742e645de0fbf721e";

	useEffect(() => {
		const fetchTransactionData = async () => {
			try {
				const response = await fetch(
					"https://api.paystack.co/transaction/verify/d63jmc6jxt",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
						},
					}
				);
				const data = await response.json();
				console.log(data);
				setTransactionData(data);
			} catch (error) {
				console.error("Error fetching transaction data:", error);
			}
		};

		fetchTransactionData();
	}, []); 

	return (
		<div>
			{transactionData ? (
				<div>
					<h2>Receipt Page</h2>
					{/* Render transaction data here */}
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default RecieptPage;
