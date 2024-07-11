import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const ReceiptPage = () => {
  const { user } = useContext(AuthContext);
  const [transactionData, setTransactionData] = useState(null);
  const [error, setError] = useState(null);
  const [postSubmitted, setPostSubmitted] = useState(false); // New state variable
  const PAYSTACK_SECRET_KEY =
    "sk_test_d77866a8e1822e78b4b62e5742e645de0fbf721e";

  const location = useLocation();
  const navigate = useNavigate();

  const getTransactionReference = () => {
    const query = new URLSearchParams(location.search);
    return query.get("reference");
  };

  useEffect(() => {
    const fetchTransactionData = async () => {
      const reference = getTransactionReference();
      if (reference) {
        try {
          const paystackResponse = await axios.get(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
              },
            }
          );
          const data = paystackResponse.data.data;
          // console.log(data.metadata);
          setTransactionData(data);
        } catch (error) {
          console.error("Error fetching transaction data:", error);
          setError("Failed to fetch transaction data. Please try again later.");
        }
      } else {
        setError("No transaction reference found in URL.");
      }
    };

    fetchTransactionData();
  }, [location.search, user.email]);
  if (transactionData) {
  }
  useEffect(() => {
    const postTransactionData = async () => {
      if (transactionData && !postSubmitted) {
        try {
          await axios.post(
            `http://localhost:8000/api/transaction/`,
            {
              matriculation_number:
                transactionData.metadata.matriculation_number,
              first_name: transactionData.metadata.first_name,
              middle_name: transactionData.metadata.middle_name,
              last_name: transactionData.metadata.last_name,
              email: user.email,
              department: transactionData.metadata.department_id,
              fee: transactionData.metadata.fee_id,
              amount: transactionData.metadata.amount,
              // date: transactionData.paid_at,
              paid: transactionData.status === "success",
              reference_number: transactionData.reference,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setPostSubmitted(true); // Set the flag to true after successful POST
        } catch (error) {
          console.error("Error posting transaction data:", error);
          setError("Failed to post transaction data. Please try again later.");
        }
      }
    };

    postTransactionData();
  }, [transactionData, postSubmitted]);

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {transactionData ? (
        <div>
          <h2>Receipt Page</h2>
          <p>Transaction ID: {transactionData.id}</p>
          <p>Amount: {transactionData.amount / 100} NGN</p>
          <p>Status: {transactionData.status}</p>
          <p>Reference: {transactionData.reference}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ReceiptPage;
