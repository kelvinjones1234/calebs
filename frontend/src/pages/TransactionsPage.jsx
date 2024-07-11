import React from "react";
import Transactions from "../components/Transactions";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TransactionsPage = () => {
  return (
    <div className="main-container bg-background-image bg-opacity-[10%] absolute w-full bg-contain bg-no-repeat bg-center h-screen">
      <div>
        <div className="text-shadow h-screen bg-white bg-opacity-[90%]">
          <Navbar rightButton="Get support" />
          <Transactions />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
