import { useContext } from "react";
import Context from "./store/Context";
import { createBrowserRouter, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register"; //Solicitud de registro
import Validreg from "./pages/Validreg"; //Validación del registro

import Recover from "./pages/Recover"; //Solicitud para recuprar la contraseña
import Changepass from "./pages/Changepass"; //Cambio de contraseña (link mail)

import Dashboard from "./pages/Dashboard";
import Dolly from "./pages/Dolly";
import About from "./pages/About";
import Perfil from "./pages/Perfil";

import Notfound from "./pages/Notfound";

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
	{ path: "/recover/token/:id", element: <Redirected><Changepass /></Redirected> },
	{
		path: "/dashboard",
		element: <Protected><Dashboard /></Protected>,
		children: [
			{ index: true, element: <Dolly /> },
			{ path: "about", element: <About /> },
			{ path: "perfil", element: <Perfil /> }
		]
	},
	{ path: "*", element: <Notfound /> }
]);

export default router;