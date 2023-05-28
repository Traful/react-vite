import { useParams } from "react-router-dom";
import useSWR from "swr";
import PreData from  "./../components/utils/PreData";

const Validreg = () => {
	const { id: token } = useParams();
	const { data, error, isLoading } = useSWR(() => token ? `user/register/temp/${token}` : null);

	if(isLoading) return <div>Loading...</div>
	if(error) return <div>Error!</div>
	if(!data) return <div>S/Datos</div>

	return(
		<div className="Validreg">
			<h1>Validar Registro {token}</h1>
			<PreData jsonData={data} />
		</div>
	);
};

export default Validreg;