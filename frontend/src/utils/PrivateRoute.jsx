import { Navigate, Outlet } from "react-router-dom";
import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = () => {
	const { user } = useContext(AuthContext);
	return <div>{user ? <Outlet /> : <Navigate to="/home-page" />}</div>;
};

export default PrivateRoute;
