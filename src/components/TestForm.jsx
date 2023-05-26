import useSWR from "swr";
import useForm from "./custom/useForm";
import PreData from "./utils/PreData";


const TestForm = () => {

	const { data, error } = useSWR('centros', { method: "GET" });

	const [datos, onCambios] = useForm({
		nombre: "",
		fecha: "",
		hora: "",
		email: "",
		edad: 0,
		opcion: 1
	});

	return(
		<>
			<form className="w-full">
				<div className="field">
					<label htmlFor="nombre">Nombre</label>
					<input type="text" name="nombre" id="nombre" pattern="[0-9]*" value={datos.nombre} onChange={onCambios} />
				</div>
				<div className="field">
					<label htmlFor="fecha">Nacimiento</label>
					<input type="date" name="fecha" id="fecha" value={datos.fecha} onChange={onCambios} />
				</div>
				<div className="field">
					<label htmlFor="hora">Hora</label>
					<input type="time" name="hora" id="hora" value={datos.hora} onChange={onCambios} />
				</div>
				<div className="field">
					<label htmlFor="email">Email</label>
					<input type="email" name="email" id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" value={datos.email} onChange={onCambios} />
				</div>
				<div className="field">
					<label htmlFor="edad">Edad</label>
					<input type="number" name="edad" id="edad" value={datos.edad} onChange={onCambios} />
				</div>
				<div className="field">
					<label htmlFor="opcion">Opción</label>
					<select name="opcion" id="opcion" value={datos.opcion} onChange={onCambios}>
						<option value={1}>Valor 1</option>
						<option value={2}>Valor 2</option>
						<option value={3}>Valor 3</option>
					</select>
				</div>
			</form>
			{
				error ?
				null
				:
				<PreData jsonData={data} />
			}
			
		</>
	);
};

export default TestForm;