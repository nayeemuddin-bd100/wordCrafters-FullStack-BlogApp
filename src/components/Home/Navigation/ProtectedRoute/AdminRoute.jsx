import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AdminRoute = () => {
	const isAuthenticated = useSelector((state) => state?.users?.userAuth);

	if (!isAuthenticated) {
		return <Navigate to="/login" replace={true} />;
	} else if (!isAuthenticated?.isAdmin) {
		return <Navigate to="/" replace={true} />;
	} return <Outlet />;
};

export default AdminRoute;
