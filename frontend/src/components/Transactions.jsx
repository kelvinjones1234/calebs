import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const Transactions = () => {
  const [transactionsData, setTransactionsData] = useState([]);
  const { authTokens, user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/transactions/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
      .then((response) => {
        setTransactionsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching transactions data:", error);
      });
  }, [authTokens]);

  return (
    <div className="p-6 mx-auto max-w-[1200px]">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-[.8rem]">
          {transactionsData.map((transaction, index) => (
            <tbody key={index}>
              <tr
                className={`hover:bg-gray-50 ${
                  index % 2 == 1 ? "bg-sky-50" : ""
                } transition-all duration-400 ease-in-out`}
              >
                <td className="py-2 px-4 border-b text-center border-r">
                  {index + 1}
                </td>

                <td className="py-2 px-2 border-b">{transaction.first_name}</td>
                <td className="py-2 px-2 border-b">
                  {transaction.middle_name}
                </td>
                <td className="py-2 px-2 border-b">{transaction.last_name}</td>
                <td className="py-2 px-2 border-b">
                  {transaction.matriculation_number}
                </td>
                {/* <td className="py-2 px-2 border-b">{user.email}</td> */}
                <td className="py-2 px-2 border-b">
                  {transaction.department.department}
                </td>
                <td className="py-2 px-2 border-b">{transaction.fee.fee}</td>
                <td className="py-2 px-2 border-b text-sky-600 font-bold">
                  {transaction.reference_number}
                </td>
                <td className="py-2 px-2 border-b">
                  {transaction.date
                    ? new Date(transaction.date).toLocaleString()
                    : ""}
                </td>
                <Link
                  to={`/receipt-page/?trxref=${transaction.reference_number}&reference=${transaction.reference_number}`}
                >
                  <td className="py-2 px-2 border-b flex">
                    <p className="bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-2xl px-2 py-1">
                      Print Reciept
                    </p>
                  </td>
                </Link>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Transactions;
