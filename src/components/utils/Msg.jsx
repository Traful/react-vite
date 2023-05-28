import Logo from "./../Logo";
import { Link } from "react-router-dom";

const Msg = (props) => {
	return(
		<div className="w-full min-h-screen flex flex-col justify-center items-center max-w-[400px] mx-auto">
			<div className="mb-4">
				<Logo />
			</div>
			<div>
				{ props.children }
			</div>
			<div className="flex justify-end items-center gap-2 mt-4">
				<Link to={props.url} className="btn w-full">Regresar</Link>
			</div>
		</div>
	);
};

export default Msg;