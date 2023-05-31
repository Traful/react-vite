import { useContext, useState } from "react";
import Context from "./../store/Context";
import useForm from "../components/custom/useForm";
import { useParams, Link } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import { apiCallWithToken } from "./../api/fetchers";
import Logo from "../components/Logo";
import Spinner from "../components/utils/Spinner";
import { ToastContainer, toast } from "react-toastify";
import Msg from "../components/utils/Msg";
import "react-toastify/dist/ReactToastify.css";

const Changepass = () => {
	const context = useContext(Context);
	const { id: token } = useParams();
	const { data: passToken, error, isLoading } = useSWR(() => token ? `user/password/temp/${token}` : null);
	const [datos, onCambios] = useForm({
		password: "",
		rpassword: ""
	});
	const [complete, setComplete] = useState(false);

	const { trigger, isMutating } = useSWRMutation("user/password/temp/update", apiCallWithToken(context.state.user.token, "PATCH"));

	const handleSubmit = async (event) => {
		event.preventDefault();
		if(datos.password !== datos.rpassword) {
			toast.error("La contraseña y su repetición debe ser iguales.");
			return false;
		}
		const result = await trigger({
			id: passToken.data.id,
			iduser: passToken.data.iduser,
			password: datos.password,
			token: token
		});
		if(result.ok) {
			setComplete(true);
		} else {
			toast.error(result.msg);
			result.errores?.map((e) => toast.info(e));
		}
	};

	if(isLoading) return <div>Loading...</div>
	if(error) return <div>Error!</div>
	if(!passToken) return <div>S/Datos</div>

	if(!passToken.ok) return (<Msg url="/">
		<>
			<h2 className="text-2xl mb-2">Ups!</h2>
			<p>{passToken.msg}</p>
		</>
	</Msg>);

	if(complete) return <Msg url="/"><p>La contraseña se actualizó correctamente.</p></Msg>

	return(
		<div className="w-full min-h-screen flex justify-center items-center p-4">
			<div className="w-full max-w-[400px] mx-auto flex flex-col">
				<div className="mb-4">
					<Logo />
				</div>
				<hr />
				<form onSubmit={handleSubmit}>
					<div className="field">
						<label htmlFor="password">Contraseña</label>
						<input type="password" name="password" id="password" value={datos.password} onChange={onCambios} autoComplete="off" />
					</div>
					<div className="field">
						<label htmlFor="rpassword">Rep. Contr.</label>
						<input type="password" name="rpassword" id="rpassword" value={datos.rpassword} onChange={onCambios} autoComplete="off" />
					</div>
					<div className={`flex ${isMutating ? "justify-center" : "justify-around"} items-center mt-12`}>
						{
							isMutating ?
							<Spinner />
							:
							<>
								<Link to="/" className="btn">Cancelar</Link>
								<button className="btn" type="submit">Actualizar</button>
							</>
						}
					</div>
				</form>
			</div>
			<ToastContainer autoClose={3000} />
		</div>
	);
};

export default Changepass;