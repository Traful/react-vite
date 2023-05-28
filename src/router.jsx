import { useContext } from "react";
import Context from "./store/Context";
import { createBrowserRouter, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Validreg from "./pages/Validreg";
import Recover from "./pages/Recover"; //Solicitud para recuprar la contraseña

import Dashboard from "./pages/Dashboard";

const Redirected =  ({ children }) => {
	const context = useContext(Context);
	if(parseInt(context.state.user.id) !== 0) {
		return <Navigate to="/dashboard" />;
	}
	return children;
};

const Protected = ({ children }) => {
	const context = useContext(Context);
	if(parseInt(context.state.user.id) === 0) {
		return <Navigate to="/" />;
	}
	return children;
};

const router = createBrowserRouter([
	{ path: "/", element: <Redirected><Landing /></Redirected> },
	{ path: "/login", element: <Redirected><Login /></Redirected> },
	{ path: "/register", element: <Redirected><Register /></Redirected> },
	{ path: "/register/token/:id", element: <Redirected><Validreg /></Redirected> },

	{ path: "/recover", element: <Redirected><Recover /></Redirected> },
	{ path: "/dashboard", element: <Protected><Dashboard /></Protected> }
]);

export default router;