import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./utils/PrivateRoute";
import PaymentPage from "./pages/PaymentPage";
import { AuthProvider } from "./context/AuthContext";
import GetSupportPage from "./pages/GetSupportPage";
import { FormDataProvider } from "./context/FormDataContext";
import RecieptPage from "./pages/RecieptPage";

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<FormDataProvider>
					<Routes>
						<Route path="/home-page" element={<HomePage />} />
						<Route path="/reciept-page" element={<RecieptPage />} />
						<Route element={<PrivateRoute />}>
							<Route path="/payment" element={<PaymentPage />}></Route>
						</Route>
						<Route element={<PrivateRoute />}>
							<Route path="/get-support" element={<GetSupportPage />}></Route>
						</Route>
					</Routes>
				</FormDataProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
