import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import bidalogo from "../assets/bida_logo.jpeg";
import Navbar from "../components/Navbar";

const ReceiptPage = () => {
  const { user } = useContext(AuthContext);
  const [transactionData, setTransactionData] = useState(null);
  const [error, setError] = useState(null);
  const [postSubmitted, setPostSubmitted] = useState(false);
  const PAYSTACK_SECRET_KEY =
    "sk_test_d77866a8e1822e78b4b62e5742e645de0fbf721e";

  const location = useLocation();

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
              email: 1,
              department: transactionData.metadata.department_id,
              fee: transactionData.metadata.fee_id,
              amount: transactionData.metadata.amount,
              paid: transactionData.status === "success",
              reference_number: transactionData.reference,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setPostSubmitted(true);
        } catch (error) {
          console.error("Error posting transaction data:", error);
          setError("Failed to post transaction data. Please try again later.");
        }
      }
    };

    postTransactionData();
  }, [transactionData, postSubmitted]);

  return (
    <>
      <div className="navbar">
        <Navbar rightButton="Get support" />
      </div>

      <div className="p-3 bg-gray-100 min-h-screen min-w-[375px] flex justify-center items-center">
        <div className="bg-white sm:px-[2rem] p-3 rounded-lg shadow-lg w-full max-w-3xl">
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {transactionData ? (
            <div>
              <div className="flex justify-between items-center mb-4 mx-5">
                <div>
                  <h1 className="text-3xl font-bold text-sky-500">RECEIPT</h1>
                  <p className="text-gray-600">Payment Receipt</p>
                </div>
                <div className="">
                  <img src={bidalogo} alt="" className="" />
                </div>
              </div>
              <div className="border-b-2 border-gray-200 mb-8"></div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-sky-500 mb-2">
                    Student Information
                  </h3>
                  <p className="text-gray-600 py-1">
                    Matriculation Number:{" "}
                    {transactionData.metadata.matriculation_number}
                  </p>
                  <p className="text-gray-600 py-1">
                    First Name: {transactionData.metadata.first_name}
                  </p>
                  <p className="text-gray-600 py-1">
                    Middle Name: {transactionData.metadata.middle_name}
                  </p>
                  <p className="text-gray-600 py-1">
                    Last Name: {transactionData.metadata.last_name}
                  </p>
                  <p className="text-gray-600 py-1">Email: {user.email}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-sky-500 mb-2">
                    Transaction Details
                  </h3>
                  <p className="text-gray-600 py-1">
                    Department: {transactionData.metadata.department}
                  </p>
                  <p className="text-gray-600 py-1">
                    Fee: {transactionData.metadata.fee}
                  </p>
                  <p className="text-gray-600 py-1">
                    Transaction ID: {transactionData.id}
                  </p>
                  <p className="text-gray-600 py-1">
                    Amount: {transactionData.amount / 100} NGN
                  </p>
                  <p className="text-gray-600 py-1">
                    Reference Number: {transactionData.reference}
                  </p>
                </div>
              </div>
              <div className="border-b-2 border-gray-200 mb-8"></div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600 py-1">
                    Thank you for your payment.
                  </p>
                </div>
                <div>
                  <h2 className="text-[1rem] ss:text-2xl font-bold text-sky-500">
                    Total: {transactionData.amount / 100} NGN
                  </h2>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => window.print()}
                  className="bg-sky-500 text-white px-4 py-2 rounded"
                >
                  Print Receipt
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 py-1 text-center">Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ReceiptPage;
