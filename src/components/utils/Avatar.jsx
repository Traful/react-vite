import { useContext } from "react";
import Context from "./../../store/Context";
import { Link } from "react-router-dom";

function generarColorHex() {
	let color = "#";
	for(let i = 0; i < 3; i++) {
		let componente = Math.round(Math.random() * 255).toString(16);
		if(componente.length < 2) {
			componente = "0" + componente;
		}
		color += componente;
	}
	return color;
};

function obtenerColorContrario(colorHex) {
	// Convierte el color hexadecimal a un número entero
	let colorInt = parseInt(colorHex.substring(1), 16);

	// Calcula el complemento del color entero utilizando el operador bitwise NOT
	let colorComplemento = ~colorInt;

	// Convierte el complemento del color entero nuevamente a formato hexadecimal
	let colorHexComplemento = "#" + (colorComplemento.toString(16)).substr(1);

	return colorHexComplemento;
};

function obtenerColorContraste(colorHex) {
	// Convierte el color hexadecimal a valores RGB
	let r = parseInt(colorHex.substring(1, 3), 16);
	let g = parseInt(colorHex.substring(3, 5), 16);
	let b = parseInt(colorHex.substring(5, 7), 16);

	// Calcula la luminosidad relativa utilizando la fórmula de W3C
	let luminosidad = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

	// Si la luminosidad es menor a 0.5, devuelve un color claro, de lo contrario un color oscuro
	return luminosidad < 0.5 ? '#FFFFFF' : '#000000';
};
  

const Avatar = ({ size }) => {
	const context = useContext(Context);
	let color = generarColorHex();
	let texto = obtenerColorContraste(color);

	return(
		<Link to="/dashboard/perfil" style={{color: texto, backgroundColor: color}} className={`flex font-bold justify-center items-center w-9 h-9 rounded-full cursor-pointer border-2 border-gay-200`}>
			{context.state.user.firstname.substring(0, 2).toUpperCase()}
		</Link>
	);
};

export default Avatar;