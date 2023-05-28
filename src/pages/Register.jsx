import { useContext, useState } from "react";
import Context from "./../store/Context";
import useForm from "../components/custom/useForm";
import { Link, useNavigate } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import { apiCallWithToken } from "./../api/fetchers";
import Logo from "../components/Logo";
import Spinner from "../components/utils/Spinner";
import { ToastContainer, toast } from "react-toastify";
import Msg from "../components/utils/Msg";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
	const context = useContext(Context);
	const navigate = useNavigate();
	const [datos, onCambios] = useForm({
		email: "",
		firstname: "",
		lastname: "",
		password: "",
		rpassword: ""
	});
	const [complete, setComplete] = useState(false);

	const { trigger, isMutating } = useSWRMutation("user/register", apiCallWithToken(context.state.user.token, "POST"));

	const handleSubmit = async (event) => {
		event.preventDefault();
		if(datos.password !== datos.rpassword) {
			toast.error("La contraseña y su repetición debe ser iguales.");
			return false;
		}
		const result = await trigger({
			email: datos.email,
			firstname: datos.firstname,
			lastname: datos.lastname,
			password: datos.password
		});
		if(result.ok) {
			if(result.mailSend) {
				//navigate("/register/send");
				setComplete(true);
			} else {
				toast.error(`Ocurrió un error al enviar el token de corroboración de cuenta a ${datos.email}, por favor intentelo más tarde.`);
			}
		} else {
			toast.error(result.msg);
			result.errores?.map((e) => toast.info(e));
		}
	};

	if(complete) return <Msg url="/"><p>Para completar el proceso de registro por favor veifique la casilla de correo eletrónico {datos.email} y siga las instrucciones.</p></Msg>

	return(
		<div className="w-full min-h-screen flex justify-center items-center">
			<div className="w-full max-w-[400px] mx-auto flex flex-col">
				<div className="mb-4">
					<Logo />
				</div>
				<hr />
				<form onSubmit={handleSubmit}>
					<div className="field">
						<label htmlFor="lastname">Apellido</label>
						<input type="text" name="lastname" id="lastname" value={datos.lastname} onChange={onCambios} autoComplete="off" />
					</div>
					<div className="field">
						<label htmlFor="firstname">Nombre</label>
						<input type="text" name="firstname" id="firstname" value={datos.firstname} onChange={onCambios} autoComplete="off" />
					</div>
					<div className="field">
						<label htmlFor="email">Email</label>
						<input type="email" name="email" id="email" value={datos.email} onChange={onCambios} autoComplete="off" />
					</div>
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
								<button className="btn" type="submit">Registrar</button>
							</>
						}
					</div>
				</form>
			</div>
			<ToastContainer autoClose={3000} />
		</div>
	);
};

export default Register;