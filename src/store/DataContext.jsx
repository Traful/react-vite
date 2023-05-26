import { useReducer } from "react";
import Context from "./Context";
import reducer from "./reducer";
import { defaultContext }  from "./constants";

const DataContext = (props) => {

	const [state, dispatch] = useReducer(reducer, defaultContext);

	return(
		<Context.Provider value={{state, dispatch}}>
			<>
				{ props.children }
			</>
		</Context.Provider>
	);
};

export default DataContext;