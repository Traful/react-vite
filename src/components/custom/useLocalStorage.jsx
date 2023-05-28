const useLocalStorage = () => {
	const getValue = (key) => {
		try {
			return localStorage.getItem(key);
		} catch (error) {
			return null;
		}
	};

	const setValue = (key, value) => {
		try {
			localStorage.setItem(key, value);
			return true;
		} catch (error) {
			return false;
		}
	};

	const removeKey = (key) => {
		try {
			localStorage.removeItem(key);
			return true;
		} catch (error) {
			return false;
		}
	}

	return [getValue, setValue, removeKey];
};

export default useLocalStorage;