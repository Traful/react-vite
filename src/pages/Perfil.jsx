import { useContext } from "react";
import Context from "./../store/Context";

const Perfil = () => {
	const context = useContext(Context);

	return(
		<div className="w-full">
			<h1>Perfil</h1>
			<pre style={{ padding: "1rem", backgroundColor: "#424242", color: "white", borderRadius: "4px", overflowX: "scroll" }}>
				{ JSON.stringify(context.state, null, 4) }
			</pre>
		</div>
	);
};

export default Perfil;