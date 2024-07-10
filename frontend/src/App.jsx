import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./utils/PrivateRoute";
import PaymentPage from "./pages/PaymentPage";
import GetSupportPage from "./pages/GetSupportPage";
import RecieptPage from "./pages/RecieptPage";
import { AuthProvider } from "./context/AuthContext";
import { FormDataProvider } from "./context/FormDataContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FormDataProvider>
          <Routes>
            <Route path="/home-page" element={<HomePage />} />
            <Route path="/receipt-page" element={<RecieptPage />} />{" "}
            {/* Corrected spelling here */}
            <Route element={<PrivateRoute />}>
              <Route path="/payment" element={<PaymentPage />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/get-support" element={<GetSupportPage />} />
            </Route>
          </Routes>
        </FormDataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
