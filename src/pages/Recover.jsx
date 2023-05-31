import { useContext, useState } from "react";
import Context from "./../store/Context";
import { Link } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import { apiCallWithToken } from "./../api/fetchers";
import Logo from "../components/Logo";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../components/utils/Spinner";
import Msg from "../components/utils/Msg";
import "react-toastify/dist/ReactToastify.css";

const Recover = () => {
	const context = useContext(Context);
	const [email, setEmail] = useState("");
	const [sended, setSended] = useState(false);

	const { trigger, isMutating } = useSWRMutation("user/password/recover", apiCallWithToken(context.state.user.token, "POST"));

	const handleSubmit = async (event) => {
		event.preventDefault();
		const result = await trigger({ email: email });
		if(result.ok) {
			if(result.mailSend) {
				setSended(true);
			} else {
				toast.error(`Ocurrió un error al enviar el mensaje a ${email}, por favor intentelo más tarde.`);
			}
		} else {
			toast.error(result.msg);
			result.errres?.map((e) => toast.info(e));
		}
	};

	if(sended) return <Msg url="/"><p>Hemos enviado un link de recuperación a <strong>{email}</strong>, por favor revise la correspondencia y siga las instrucciones.</p></Msg>

	return(
		<div className="w-full min-h-screen flex justify-center items-center p-4">
			<div className="w-full max-w-[400px] mx-auto flex flex-col">
				<div className="mb-4">
					<Logo />
				</div>
				<hr />
				<div>
					<p className="mt-4 mb-2 text-sm text-justify">Para recuperar su contraseña por favor indique la dirección de correo eletrónico con la cual registro su cuenta.</p>
					<form onSubmit={handleSubmit}>
						<div className="field">
							<label htmlFor="email">Email</label>
							<input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
						</div>
						<div className={`flex ${isMutating ? "justify-center" : "justify-around"} items-center gap-2 mt-4`}>
							{
								isMutating ?
								<Spinner />
								:
								<>
									<Link to="/" className="btn w-full text-center">Cancelar</Link>
									<button className="btn w-full" type="submit">Enviar</button>
								</>
							}
						</div>
					</form>
				</div>
			</div>
			<ToastContainer autoClose={3000} />
		</div>
	);
};

export default Recover;