import { useContext, useEffect, useState } from "react";
import Context from "./../store/Context";
import useForm from "../components/custom/useForm";
import { SET_USER_DATA } from "./../store/constants";
import { Link } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import { apiCallWithToken } from "./../api/fetchers";
import Logo from "../components/Logo";
import Spinner from "../components/utils/Spinner";
import { ToastContainer, toast } from "react-toastify";
import useLocalStorage from "../components/custom/useLocalStorage";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
	const context = useContext(Context);
	const [getValue, setValue, removeKey] = useLocalStorage(null);
	const [datos, onCambios, setData] = useForm({
		email: "",
		password: ""
	});
	const [remember, setRemember] = useState(false);

	useEffect(() => {
		if(getValue("rv-email")) {
			setRemember(true);
			setData({
				email: getValue("rv-email"),
				password: getValue("rv-password")
			});
		}
	}, []);

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
		const result = await trigger(datos, /* options */); //Options sobreescribe las opciones de useSWRMutation onSuccess, onError, etc
		if(result.ok) {
			if(!remember) {
				removeKey("rv-email");
				removeKey("rv-password");
			} else {
				setValue("rv-email", datos.email);
				setValue("rv-password", datos.password);
			}
			context.dispatch({
				type: SET_USER_DATA,
				payload: result.data
			});
		} else {
			//alert(result.msg);
			toast.error(result.msg);
			result.errres?.map((e) => toast.info(e));
		}
	};

	return(
		<div className="w-full min-h-screen flex justify-center items-center p-4">
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
					<div className="flex justify-between items-center p-2 mt-4">
						<div>
							<input type="checkbox" name="remember" id="remember" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> <label htmlFor="remember">Recordar mi cuenta.</label>
						</div>
						<div>
							<Link to="/recover" className="underline text-blue-600">Olvidé mi contraseña.</Link>
						</div>
					</div>
					<div className={`flex ${isMutating ? "justify-center" : "justify-around"} items-center gap-2 mt-4`}>
						{
							isMutating ?
							<Spinner />
							:
							<>
								<Link to="/" className="btn w-full text-center">Cancelar</Link>
								<button className="btn w-full" type="submit">Ingresar</button>
							</>
						}
					</div>
				</form>
			</div>
			<ToastContainer autoClose={3000} />
		</div>
	);
};

export default Login;