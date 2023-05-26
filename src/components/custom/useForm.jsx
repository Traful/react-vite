import { useState } from "react";

const useForm = (defaultData) => {
	const [data, setData] = useState(defaultData);

	const handleChange = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.type === "checkbox" ? target.checked : target.value;
		setData(prev => ({ ...prev, [name]: value }));
	}

	return [data, handleChange];
};

export default useForm;