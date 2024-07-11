import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import formDataContext from "../context/FormDataContext";
import RecieptPage from "./RecieptPage";

const PaymentPage = () => {
  const { user } = useContext(AuthContext);
  const {
    setFormData,
    formData,
    handleSubmit,
    handleDepartmentChange,
    handleFeeChange,
    departments,
    fees,
  } = useContext(formDataContext);

  return (
    <>
      <div className="main-container bg-background-image bg-opacity-[10%] absolute w-full bg-contain bg-no-repeat bg-center h-screen">
        <div>
          <div className="text-shadow h-screen bg-white bg-opacity-[90%]">
            <Navbar rightButton="Get support" />

            <div className="flex justify-center">
              <div className="form-container mt-[3rem] mb-[5rem] border w-[500px] shadow pb-[3rem] rounded-[1rem]">
                <p className="text-center font-semibold pt-[2rem] pb-[.5rem]">
                  Fill in the form below to make payment
                </p>
                <form
                  className="max-w-[85%] ss:max-w-[400px] mx-auto"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="text"
                    onChange={(e) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        first_name: e.target.value,
                      }))
                    }
                    placeholder="First Name"
                    className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2 my-2 focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Middle Name"
                    onChange={(e) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        middle_name: e.target.value,
                      }))
                    }
                    className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2 my-2 focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    onChange={(e) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        last_name: e.target.value,
                      }))
                    }
                    placeholder="Last Name"
                    className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2 my-2 focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    onChange={(e) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        matriculation_number: e.target.value,
                      }))
                    }
                    placeholder="Matriculation Number"
                    className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2 my-2 focus:outline-none focus:border-blue-500"
                  />
                  <select
                    id="department"
                    className="border border-gray-300 text-sm rounded-lg w-full p-2 focus:outline-none focus:border-blue-500 bg-white mb-2"
                    value={formData.department}
                    onChange={(e) => handleDepartmentChange(e.target.value)}
                  >
                    <option value="" className="">
                      {formData.department
                        ? formData.department
                        : "Select Department"}
                    </option>
                    {departments.map((department) => (
                      <option
                        key={department.id}
                        value={department.id}
                        className="text-gray-400"
                      >
                        {department.department}
                      </option>
                    ))}
                  </select>
                  <select
                    id="fee"
                    className="border border-gray-300 text-red text-sm rounded-lg w-full p-2 focus:outline-none mb-2 focus:border-blue-500 bg-white"
                    value={formData.fee}
                    onChange={(e) => handleFeeChange(e.target.value)}
                  >
                    <option value="" className="">
                      {formData.fee ? formData.fee : "Select Fee"}
                    </option>
                    {fees.map((fee) => (
                      <option
                        key={fee.id}
                        value={fee.id}
                        className="text-gray-400"
                      >
                        {fee.fee}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Amount"
                    readOnly
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        amount: e.target.value,
                      }))
                    }
                    className="border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2 focus:outline-none focus:border-blue-500"
                  />
                  <div className="payment-button my-4">
                    <button className="font-bold bg-sky-400 w-full hover:bg-sky-600 transition-all duration-400 rounded-lg py-2 mt-2 text-white">
                      Pay
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
