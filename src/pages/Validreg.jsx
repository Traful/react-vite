import { useParams } from "react-router-dom";
import useSWR from "swr";
import Msg from "../components/utils/Msg";

const Validreg = () => {
	const { id: token } = useParams();
	const { data, error, isLoading } = useSWR(() => token ? `user/register/temp/${token}` : null);

	if(isLoading) return <div>Loading...</div>
	if(error) return <div>Error!</div>
	if(!data) return <div>S/Datos</div>

	return(
		<>
			{
				data.ok ?
				<Msg url="/">
					<>
						<h2 className="text-2xl mb-2">Se ha completado el proceso de registros!</h2>
						<p>Bienvenido a <strong>Sheep Shit!</strong></p>
					</>
				</Msg>
				:
				<Msg url="/">
					<>
						<h2 className="text-2xl mb-2">Ups!</h2>
						<p>{data.msg}</p>
					</>
				</Msg>
			}
		</>
	);
};

export default Validreg;