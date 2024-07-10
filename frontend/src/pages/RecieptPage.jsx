import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ReceiptPage = () => {
  const [transactionData, setTransactionData] = useState(null);
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
          const response = await axios.get(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
              },
            }
          );
          const data = response.data;
          setTransactionData(data.data);

          // Check if the transaction exists in your database
          const dbResponse = await axios.get(
            `http://localhost:8000/api/transaction/${reference}/`
          );

          if (!dbResponse.data.exists) {
            await axios.post(
              "http://localhost:8000/api/initiate-payment/",
              {
                matriculation_number: data.metadata.matriculation_number,
                first_name: data.metadata.first_name,
                middle_name: data.metadata.middle_name,
                last_name: data.metadata.last_name,
                email: data.metadata.email,
                department: data.metadata.department,
                fee: data.metadata.fee,
                amount: data.metadata.amount,
                paid: True,
                reference_number: data.reference,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
          }
        } catch (error) {
          console.error("Error fetching transaction data:", error);
          navigate("/error-page"); // Redirect to an error page if needed
        }
      } else {
        navigate("/error-page"); // Redirect to an error page if needed
      }
    };

    fetchTransactionData();
  }, [location.search, navigate]);

  return (
    <div>
      {transactionData ? (
        <div>
          <h2>Receipt Page</h2>
          {/* Render transaction data here */}
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
