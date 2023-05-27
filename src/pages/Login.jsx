import { useContext, useState } from "react";
import Context from "./../store/Context";
import useForm from "../components/custom/useForm";
import { SET_USER_DATA } from "./../store/constants";
import { Link } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import Logo from "../components/Logo";
import Spinner from "../components/utils/Spinner";

const apiCallWithToken = (token = null, method = "POST") => {
	return async (url, { arg }) => {
		const api_url = `${import.meta.env.VITE_API_URL}${url}`;
		const init = {
			method: method,
			body: JSON.stringify(arg),
			headers: {
				"Content-Type": "application/json",
				"Authorization": token
			}
		};

		try {
			const res = await fetch(api_url, init);
			// Si el status code no esta en el rango 200-299
			if(!res.ok) {
				return await res.json();
			}
			return res.json();
		} catch(e) {
			return ({
				ok: false,
				msg: `${e.name}: ${e.message}`,
				data: null
			});
		}
	}
};

const Login = () => {
	const context = useContext(Context);
	const [datos, onCambios] = useForm({
		email: "hansjal@gmail.com",
		password: "quilmes"
	});

	/*
		data: data for the given key returned from fetcher
		error: error thrown by fetcher (or undefined)
		trigger(arg, options): a function to trigger a remote mutation
		reset: a function to reset the state (data, error, isMutating)
		isMutating: if there's an ongoing remote mutation
	*/
	const { trigger, isMutating } = useSWRMutation("user/login", apiCallWithToken(context.state.user.token, "POST"), {
		//optimisticData: same as mutate's optimisticData
		//revalidate = true: same as mutate's revalidate
		//populateCache = false: same as mutate's populateCache, but the default is false
		//rollbackOnError = true: same as mutate's rollbackOnError
		//throwOnError = true: same as mutate's throwOnError
		/*
		onSuccess: (data, key, config) => { //callback function when a remote mutation has been finished successfully
			console.log("Success", data, key, config);
		},
		onError: (err, key, config) => { //callback function when a remote mutation has returned an error
			console.log("Error", err, key, config);
		}
		*/
	});

	const handleSubmit = async (event) => {
		event.preventDefault();
		const result = await trigger(datos, /* options */) //Options sobreescribe las opciones de useSWRMutation onSuccess, onError, etc
		if(result.ok) {
			context.dispatch({
				type: SET_USER_DATA,
				payload: {
					id: 1,
					email: "",
					firstname: "",
					lastname: "",
					jwt: ""
				}
			});
		} else {
			alert(result.msg);
		}
	};

	return(
		<div className="w-full min-h-screen flex justify-center items-center">
			<div className="w-full max-w-[400px] mx-auto flex flex-col">
				<div className="mb-4">
					<Logo />
				</div>
				<hr />
				<form onSubmit={handleSubmit}>
					<div className="field">
						<label htmlFor="email">Email</label>
						<input type="email" name="email" id="email" value={datos.email} onChange={onCambios} autoComplete="off" />
					</div>
					<div className="field">
						<label htmlFor="password">Contraseña</label>
						<input type="password" name="password" id="password" value={datos.password} onChange={onCambios} autoComplete="off" />
					</div>
					<div className={`flex ${isMutating ? "justify-center" : "justify-around"} items-center mt-12`}>
						{
							isMutating ?
							<Spinner />
							:
							<>
								<Link to="/" className="btn">Cancelar</Link>
								<button className="btn" type="submit">Ingresar</button>
							</>
						}
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;