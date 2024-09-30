import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import formDataContext from "../context/FormDataContext";

const PaymentPage = () => {
  const [fees, setFees] = useState([]);
  const [levels, setLevels] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const { user } = useContext(AuthContext);
  const [selectedFee, setSelectedFee] = useState(null);
  const { handleSubmit } = useContext(formDataContext);
  const [isLoading, setIsLoading] = useState(false); // State for loading spinner

  useEffect(() => {
    if (user) {
      axios
        .get(`http://127.0.0.1:8000/api/fees/${user.dept_id}/`)
        .then((response) => setFees(response.data));
    }

    axios.get("http://127.0.0.1:8000/api/other-data/").then((response) => {
      setLevels([...new Set(response.data.map((item) => item.level))]);
      setSemesters([...new Set(response.data.map((item) => item.semester))]);
    });
  }, [user]);

  const handleFeeChange = (feeId) => {
    const fee = fees.find((item) => item.id === parseInt(feeId));
    setSelectedFee(fee);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading spinner

    if (selectedFee) {
      handleSubmit(
        selectedFee.amount,
        selectedFee.fee,
        selectedFee.id,
        selectedLevel,
        selectedSemester
      ).finally(() => {
        setIsLoading(false); // Stop loading spinner
      });
    }
  };

  return (
    <div className="main-container bg-background-image bg-opacity-[10%] absolute w-full bg-contain bg-no-repeat bg-center h-screen">
      <div className="text-shadow h-screen bg-white bg-opacity-[90%]">
        <Navbar rightButton="Get support" />
        <div className="flex justify-center">
          <div className="form-container mt-[3rem] mb-[5rem] border w-[500px] shadow pb-[3rem] rounded-[1rem]">
            <p className="text-center font-semibold pt-[2rem] pb-[.5rem]">
              Fill in the necessary data into the form below
            </p>
            <form
              className="max-w-[85%] ss:max-w-[400px] mx-auto"
              onSubmit={handleSubmitForm}
            >
              <input
                type="text"
                disabled
                defaultValue={user && user.first_name}
                placeholder="First Name"
                className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2 my-2 focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                disabled
                defaultValue={user && user.middle_name}
                className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2 my-2 focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                disabled
                defaultValue={user && user.last_name}
                placeholder="Last Name"
                className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2 my-2 focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                disabled
                defaultValue={user && user.username}
                placeholder="Mat No"
                className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2 my-2 focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                disabled
                defaultValue={user && user.department}
                placeholder="Department"
                className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2 my-2 focus:outline-none focus:border-blue-500"
              />

              <select
                name="level"
                className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 my-2 focus:outline-none focus:border-blue-500"
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                <option value="">Select Level</option>
                {levels.map((level, index) => (
                  <option key={index} value={level}>
                    {level}
                  </option>
                ))}
              </select>

              <select
                name="semester"
                className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 my-2 focus:outline-none focus:border-blue-500"
                onChange={(e) => setSelectedSemester(e.target.value)}
              >
                <option value="">Select Semester</option>
                {semesters.map((semester, index) => (
                  <option key={index} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>

              <select
                name="fee"
                id="fee"
                className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 my-2 focus:outline-none focus:border-blue-500"
                onChange={(e) => handleFeeChange(e.target.value)}
              >
                <option value="">Select the fee to be paid</option>
                {fees.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.fee}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Amount"
                readOnly
                value={selectedFee ? selectedFee.amount : ""}
                className="border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2 focus:outline-none focus:border-blue-500"
              />

              <div className="payment-button my-4">
                <button
                  type="submit"
                  className="font-bold bg-sky-400 w-full hover:bg-sky-600 transition-all duration-400 rounded-lg py-2 mt-2 text-white"
                  disabled={isLoading} // Disable button when loading
                >
                  {isLoading ? (
                    <>
                      <div role="status" className="grid justify-center">
                        <svg
                          aria-hidden="true"
                          className="w-8 h-8 text-gray-200 animate-spin dark:text-link fill-white"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                      <span>Loading...</span>
                    </>
                  ) : (
                    "Pay"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default PaymentPage;
