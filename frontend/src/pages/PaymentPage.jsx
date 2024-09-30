import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import formDataContext from "../context/FormDataContext";
import SubmitButton from "../components/SubmitButton";

const PaymentPage = () => {
  const [fees, setFees] = useState([]);
  const [levels, setLevels] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedFee, setSelectedFee] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const { handleSubmit } = useContext(formDataContext);

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
    setError("");

    if (!selectedLevel || !selectedSemester || !selectedFee) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    handleSubmit(
      selectedFee.amount,
      selectedFee.fee,
      selectedFee.id,
      selectedLevel,
      selectedSemester
    ).finally(() => {
      setLoading(false);
    });
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

              {error && <p className="text-red-500 text-center">{error}</p>}

              <div className="payment-button my-4">
                <SubmitButton label="Pay" loading={loading} />
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
