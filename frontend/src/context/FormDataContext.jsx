import { useContext, useState, createContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
const FormDataContext = createContext();
import { useNavigate } from "react-router-dom";

export default FormDataContext;

export const FormDataProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    matriculation_number: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    department: "",
    department_id: null, // Added department_id
    fee: "",
    fee_id: null, // Added fee_id
    amount: "",
  });

  const [departments, setDepartments] = useState([]);
  const [fees, setFees] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await pay();
  };

  const PAYSTACK_SECRET_KEY =
    "sk_test_d77866a8e1822e78b4b62e5742e645de0fbf721e";

  const pay = async () => {
    try {
      const userData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        middle_name: formData.middle_name,
        department: formData.department,
        department_id: formData.department_id, // Included department_id
        fee: formData.fee,
        fee_id: formData.fee_id, // Included fee_id
        amount: formData.amount,
        matriculation_number: formData.matriculation_number,
      };

      const metadata = {
        ...userData,
      };

      const response = await fetch(
        "https://api.paystack.co/transaction/initialize",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          },
          body: JSON.stringify({
            amount: formData.amount * 100,
            currency: "NGN",
            email: user.email,
            callback_url: "http://localhost:5173/receipt-page/",
            metadata: metadata,
          }),
        }
      );
      const data = await response.json();
      console.log(data);

      if (data.status) {
        window.location.replace(data.data.authorization_url);
      } else {
        console.error("Payment failed:", data.message);
      }
    } catch (error) {
      console.error("Error occurred while initializing payment:", error);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/departments/")
      .then((response) => setDepartments(response.data))
      .catch((error) => console.error("Error fetching departments:", error));
  }, []);

  const handleDepartmentChange = (value) => {
    const selectedDepartment = departments.find(
      (department) => department.id === parseInt(value)
    );

    setFormData((prevState) => ({
      ...prevState,
      department: selectedDepartment ? selectedDepartment.department : "",
      department_id: selectedDepartment ? selectedDepartment.id : null, // Set department_id
      fee: "",
      amount: "",
    }));

    axios
      .get(`http://localhost:8000/api/fees/${value}/`)
      .then((response) => setFees(response.data))
      .catch((error) => console.error("Error fetching fees:", error));
  };

  const handleFeeChange = (value) => {
    const selectedFee = fees.find((fee) => fee.id === parseInt(value));

    setFormData((prevState) => ({
      ...prevState,
      fee: selectedFee ? selectedFee.fee : "",
      fee_id: selectedFee ? selectedFee.id : null, // Set fee_id
      amount: selectedFee ? selectedFee.amount : "",
    }));
  };

  const formDataData = {
    setFormData: setFormData,
    handleSubmit: handleSubmit,
    handleDepartmentChange: handleDepartmentChange,
    handleFeeChange: handleFeeChange,
    formData: formData,
    departments: departments,
    fees: fees,
  };

  return (
    <FormDataContext.Provider value={formDataData}>
      {children}
    </FormDataContext.Provider>
  );
};
