import { Link } from "react-router-dom";

const Notfound = () => {
	return(
		<div className="w-full h-screen flex flex-col justify-center items-center p-4">
			<h1 className="text-8xl font-extrabold">4<span className="text-rose-500">0</span>4</h1>
			<p className="my-4 italic text-3xl">Oveja descarriada!!!, acá no hay nada que ver!!!</p>
			<Link to="/" className="btn mt-4">Ir al Inicio</Link>
		</div>
	);
};

export default Notfound;