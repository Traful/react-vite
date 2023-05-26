import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./App.css";
import { useContext } from "react";
import { SWRConfig } from "swr";
import Context from "./store/Context";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

const fetchWithToken = (token) => {
	return async (url) => {
		const api_url = `${import.meta.env.VITE_API_URL}${url}`;
		const init = {
			headers: {
				"Authorization": token
			}
		};

		const res = await fetch(api_url, init);
 
		// Si el status code no esta en el rango 200-299
		if(!res.ok) {
			const error = new Error('Ocurrió un error al obtener los datos.')
			// Adjunta información extra al objeto de error.
			error.info = await res.json();
			error.status = res.status;
			throw error;
		}
		
		return res.json();
	};
};


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
	{ path: "/dashboard", element: <Protected><Dashboard /></Protected> }
]);


const App = () => {
	const context = useContext(Context);

	return(
		<>
			<SWRConfig
				value={{
					refreshInterval: 0,
					fetcher: fetchWithToken(context.state.user.token),
					onError: (error, key) => {
						console.log(key, error);
						/*
						if(error.status !== 403 && error.status !== 404) {
							// Podemos enviar el error a Sentry
							// o mostrarlo una notificación UI.
						}
						*/
					}
				}}
			>
				<RouterProvider router={router} />
			</SWRConfig>
		</>
	);
};

export default App;
