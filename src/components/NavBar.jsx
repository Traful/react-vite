import { useEffect, useState, useRef, useContext } from "react";
import Context from "./../store/Context";
import { SET_DEFAULT } from "./../store/constants";
import { Link } from "react-router-dom";
import useLocalStorage from "./custom/useLocalStorage";

const NavBar = () => {
	const context = useContext(Context);
	const nav = useRef(0);
	const [visible, setVisible] =  useState(false);
	const [getValue, setValue, removeKey] = useLocalStorage();

	useEffect(() => {
		const xFuncion = (event) => {
			if(nav.current) {
				if(!nav.current.contains(event.target)) {
					setVisible(false);
				}
			}
		};
		document.addEventListener("click", xFuncion);
		return () => {
			document.removeEventListener("click", xFuncion);
		};
	}, []);

	const handleCloseSession = () => {
		removeKey("rv-jwt");
		context.dispatch({ type: SET_DEFAULT });
	};

	return(   
		<div ref={nav} className="relative">
			<nav className="py-4 md:py-0 flex w-full items-center justify-between bg-slate-800 px-4 text-white shadow-lg">
				<div className="flex items-center space-x-2">
					<div className="logo">
						<svg className="fill-white" width="35px" version="1.1" viewBox="0 0 35.247 24.391" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-82.339 -113.21)"><path d="m99.879 113.52c-0.48142 9e-3 -0.93831 0.17383-1.1183 0.56141-0.33795 0.72763-0.3151 0.54175-0.60799 0.36459-1.7119-1.0354-2.9397 0.68013-2.6598 1.5956 0.09855 0.35746 0.14968 0.65619-0.27345 0.36509-2.0459-0.87454-1.9804 0.40068-2.0063 1.8125-0.01096 0.59831-0.80719 1.3489-1.9261 1.7133-3.9234 1.4835-5.0978 2.5841-6.4475 4.4227-1.2205 1.6626-1.6105 3.649-1.9151 5.6532-0.12088 0.7952 0.29161 1.0014 0.85089 0.91199 3.7287-0.59639 4.5958-1.6744 5.7754-2.7966 1.1878-1.1299 2.0146-2.6825 2.7355-4.4377 0.34067-0.62188 0.70322-1.4088 0.72969 0.36509l0.72919 7.2338c0.4144 1.9289 1.0234 3.5204 2.0283 4.4573 2.7612 2.5744 7.6373 1.0651 8.4778-0.0556l0.64505-0.8594c0.19851-0.29638 0.30712-0.246 0.34356 0.0857 0.21761 1.1009 0.3228 1.4033 0.30098 2.2351l1.7198-0.4297-1.7198-2.751c-0.11046-0.25681 0.15029-0.48465 0.38713-0.25792l2.1064 2.1921 1.3752-1.0317-3.5678-1.9342c0.31214-1.413 0.53714-2.973 0.62351-4.2449l0.57994-5.2691c0.0315-0.34685 0.0578-0.71033 0.45224 0.018l1.6542 3.1341c2.1462 3.2197 3.284 3.2069 6.126 4.1643 0.48949 0.16489 1.3106 0.0481 1.3106 0.0481 0.33152-0.0889 0.46781-0.20401 0.47276-0.51583 0.0315-1.9821-0.55035-3.5444-1.2896-4.9431-1.2268-2.321-2.8371-3.2945-4.4272-4.2559l-3.6109-1.5906c-0.69793-0.35375-1.0214-0.90721-0.85991-1.7193 0.12324-1.0489-1.0548-2.0153-1.8916-1.6332l-0.26394 0.1868c-0.27632 0.16934-0.4042 0.10618-0.37962-0.19732l0.015-0.62301c-0.0961-1.495-1.5004-1.7801-2.2492-1.3677l-0.304 0.22786c-0.2032 0.16661-0.39664 0.29917-0.44072-0.0911-0.0208-0.43828-0.77679-0.757-1.4804-0.74371zm-2.9137 8.7553a2.2138 2.2568 0 0 1 2.2136 2.2567 2.2138 2.2568 0 0 1-2.2136 2.2567 2.2138 2.2568 0 0 1-2.2141-2.2567 2.2138 2.2568 0 0 1 2.2141-2.2567zm5.7168 0a2.2997 2.3212 0 0 1 2.3002 2.3208 2.2997 2.3212 0 0 1-2.3002 2.3213 2.2997 2.3212 0 0 1-2.2998-2.3213 2.2997 2.3212 0 0 1 2.2998-2.3208z"/><path d="m103.18 124.6a1.0317 0.98868 0 0 1-1.0317 0.98868 1.0317 0.98868 0 0 1-1.0317-0.98868 1.0317 0.98868 0 0 1 1.0317-0.98868 1.0317 0.98868 0 0 1 1.0317 0.98868zm-4.6425-0.0215a1.0317 0.96718 0 0 1-1.0317 0.96719 1.0317 0.96718 0 0 1-1.0317-0.96719 1.0317 0.96718 0 0 1 1.0317-0.96718 1.0317 0.96718 0 0 1 1.0317 0.96718z"/></g></svg>
					</div>
					<div className="text-2xl">Sheep Shit</div>
				</div>
				<div className="hidden justify-end space-x-3 md:flex">
					<Link to="/dashboard" className="p-2 font-semibold uppercase text-slate-500 hover:text-white" href="#">Dolly</Link>
					<Link to="/dashboard/about" className="p-2 font-semibold uppercase text-slate-500 hover:text-white" href="#">About</Link>
				</div>
				<div className="per-menu relative">
					<span className="my-4 hidden md:flex h-8 w-8 items-center justify-center rounded-full bg-purple-700 p-2 cursor-pointer">HA</span>
					<div className="per-menu-links hidden absolute -left-28 top-12 bg-white z-20 w-32 p-2 rounded-md">
						<Link to="/dashboard/perfil"><div className="text-gray-400 mb-2 hover:text-black">Perfil</div></Link>
						<hr />
						<div className="text-gray-400 mt-2 hover:text-black cursor-pointer" onClick={handleCloseSession}>Cerrar Sesión</div>
					</div>
				</div>
				<div className="btn-menu cursor-pointer md:hidden" onClick={() => setVisible(prev => !prev)}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
					</svg>
				</div>
			</nav>
			<div className={`absolute left-0 top-[56px] w-full ${visible ? "flex" : "hidden"} flex-col items-center justify-center space-y-2 bg-slate-800 text-white md:hidden z-10`}>
				<div className="per-menu relative">
					<span className="my-4 hidden md:flex h-8 w-8 items-center justify-center rounded-full bg-purple-700 p-2 cursor-pointer">HA</span>
					<div className="per-menu-links hidden absolute -left-16 top-14 bg-white z-20 w-32 p-2 rounded-md">
						<Link to="/dashboard/perfil"><div className="text-gray-400 mb-2 hover:text-black">Perfil</div></Link>
						<hr />
						<div className="text-gray-400 mt-2 hover:text-black cursor-pointer" onClick={handleCloseSession}>Cerrar Sesión</div>
					</div>
				</div>
				<Link to="/dashboard" className="p-2 font-semibold uppercase text-slate-500 hover:text-white" href="#">Dolly</Link>
				<Link to="/dashboard/about" className="p-2 font-semibold uppercase text-slate-500 hover:text-white" href="#">About</Link>
			</div>
		</div>
	);
};

export default NavBar;