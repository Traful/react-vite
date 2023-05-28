import { useContext } from "react";
import Context from "./store/Context";
import { SWRConfig } from "swr";
import { fetchWithToken } from "./api/fetchers";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./App.css";

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
