import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./utils/PrivateRoute";
import PaymentPage from "./pages/PaymentPage";
import GetSupportPage from "./pages/GetSupportPage";
import RecieptPage from "./pages/RecieptPage";
import { AuthProvider } from "./context/AuthContext";
import { FormDataProvider } from "./context/FormDataContext";
import TransactionsPage from "./pages/TransactionsPage";
import RegistrationPage from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FormDataProvider>
          <Routes>
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/receipt-page" element={<RecieptPage />} />{" "}
            {/* Corrected spelling here */}
            <Route element={<PrivateRoute />}>
              <Route path="/payment" element={<PaymentPage />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/get-support" element={<GetSupportPage />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/transactions" element={<TransactionsPage />} />
            </Route>
          </Routes>
        </FormDataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
