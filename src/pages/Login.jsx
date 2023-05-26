import { useContext, useState } from "react";
import Context from "./../store/Context";
import useForm from "../components/custom/useForm";
import { SET_USER_DATA } from "./../store/constants";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../components/Logo";

const Login = () => {
	const context = useContext(Context);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [datos, onCambios] = useForm({
		email: "hansjal@gmail.com",
		password: "quilmes"
	});

	const handleSubmit = async (event) => {
		event.preventDefault();
		if(!loading) {
			setLoading(true);
			//let resp = fetch()
		}
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
		navigate("/dashboard");
	};

	return(
		<div className="w-full min-h-screen bg-slate-50 flex justify-center items-center">
			<div className="w-full max-w-[400px] mx-auto flex flex-col">
				<div className="mb-4">
					<Logo />
				</div>
				<hr />
				<form onSubmit={handleSubmit}>
					<div className="field">
						<label htmlFor="email">Email</label>
						<input type="email" name="email" id="email" value={datos.email} onChange={onCambios} />
					</div>
					<div className="field">
						<label htmlFor="password">Contraseña</label>
						<input type="password" name="password" id="password" value={datos.password} onChange={onCambios} />
					</div>
					<div className="flex justify-between items-center mt-4">
						<Link to="/" className="btn">Cancelar</Link>
						<button className="btn" type="submit">Ingresar</button>
					</div>
				</form>
				<pre style={{ marginTop: "1em", padding: "1rem", backgroundColor: "#424242", color: "white", borderRadius: "4px" }}>
					{ JSON.stringify(context.state, null, 4) }
				</pre>
			</div>
		</div>
	);
};

export default Login;