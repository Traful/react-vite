export const fetchWithToken = (token) => {
	return async (url) => {
		const api_url = `${import.meta.env.VITE_API_URL}${url}`;
		const init = {
			headers: {
				"Authorization": token
			}
		};
		try {
			const res = await fetch(api_url, init);
			if(!res.ok) {
				const error = new Error("Ocurrió un error al obtener los datos.");
				let err = await res.json();
				error.msg = err.msg;
				error.errores = err.errores ? err.errores : [];
				//error.status = res.status
				throw error
			}
			return await res.json();
		} catch(e) {
			return ({
				ok: false,
				msg: e.msg ? e.msg : `${e.name}: ${e.message}`,
				data: null,
				errores: e.errores ? e.errores : []
			});
		}
	};
};

export const apiCallWithToken = (token = null, method = "POST") => {
	return async (url, { arg }) => {
		const api_url = `${import.meta.env.VITE_API_URL}${url}`;
		const init = {
			method: method,
			body: JSON.stringify(arg),
			headers: {
				"Content-Type": "application/json",
				"Authorization": token
			}
		};

		try {
			const res = await fetch(api_url, init);
			if(!res.ok) {
				const error = new Error("Ocurrió un error al obtener los datos.");
				let err = await res.json();
				error.msg = err.msg;
				error.errores = err.errores ? err.errores : [];
				//error.status = res.status
				throw error
			}
			return await res.json();
		} catch(e) {
			return ({
				ok: false,
				msg: e.msg ? e.msg : `${e.name}: ${e.message}`,
				data: null,
				errores: e.errores ? e.errores : []
			});
		}
	}
};