import { useEffect, useRef, useState } from "react";

const getCurrentTime = () => {
	const now = new Date();
	const hours = now.getHours();
	const minutes = now.getMinutes();
	const formattedHours = hours < 10 ? '0' + hours : hours;
	const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
	const currentTime = `${formattedHours}:${formattedMinutes}`;
	return currentTime;
};

const randomSeconds = (max = 5) => Math.floor(Math.random() * max) + 1;

const Msg = ({msg}) => {
	switch(msg.user) {
		case "user":
			return (
				<div className="flex bg-white text-black p-1 rounded-md shadow-md py-[6px] pr-[7px] pb-[8px] pl-[9px] w-fit self-start">
					<p>{msg.msg}</p>
					<span className="text-gray-400 ml-1 text-[.7rem] translate-y-3">{msg.time}</span>
				</div>
			);
		default:
			return (
				<div className="flex bg-green-600 text-white p-1 rounded-md shadow-md py-[6px] pr-[7px] pb-[8px] pl-[9px] w-fit self-end">
					<p className="break-words whitespace-pre-wrap hyphens-auto overflow-x-hidden" lang="es">{msg.msg}</p>
					<span className="text-white ml-1 text-[.7rem] translate-y-3">{msg.time}</span>
				</div>
			);
	};
};

const config = { childList: true };

const callback = (mutationsList, observer) => {
	for(let mutation of mutationsList) {
		if(mutation.type === "childList") {
			mutation.addedNodes[0].scrollIntoView();
		}
	}
};

const Dolly = () => {
	const refBody = useRef(null);
	const [dollyStatus, setDollyStatus] = useState("online & hot!");
	const [time, setTime] = useState(null);
	const [messages, setMessages] = useState([]);
	const [msg, setMsg] = useState("");

	useEffect(() => {
		if(refBody) {
			const observer = new MutationObserver(callback);
			observer.observe(refBody.current, config);
		}
		return () => {
			if(typeof observer !== "undefined") observer = null;
		}
	}, [refBody]);

	useEffect(() => {
		const intervalo = () => {
			setTime(getCurrentTime());
		};
		setInterval(intervalo, 1000);

		return () => {
			clearInterval(intervalo);
		};
	}, []);

	const handleNewMsg = (event) => {
		event.preventDefault();
		setMessages(prev => ([
			...prev, {
				user: "user",
				msg: msg,
				time: getCurrentTime()
			}
		]));
		setMsg("");
		//Iniciar respueta de Dolly
		setDollyStatus("escribiendo...");
		setTimeout(() => {
			setMessages(prev => ([
				...prev, {
					user: "dolly",
					msg: "Beeeeeeee",
					time: getCurrentTime()
				}
			]));
			setDollyStatus("online & hot!");
		}, randomSeconds() * 1000);
	}

	return(
		<div style={{ maxWidth: "412px", minHeight: "300px" }} className="max-w-md mx-auto border-4 border-gray-900 rounded-md relative">
			<div className="flex justify-end items-center gap-1 py-1 px-2 bg-gray-900 text-white">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
					<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
					<path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
				</svg>
				<div className="text-gray-500 text-[.7rem] font-bold w-4 h-4">9G</div>
				<svg className="w-3 h-3 fill-[#e5e7eb]" version="1.1" viewBox="0 0 10.583 10.583" xmlns="http://www.w3.org/2000/svg">
					<path d="m10.225 0.50178c-4.0584 4.0145-4.5995 4.6242-9.8485 9.6599h9.8485zm-0.30024 0.92863-0.011369 8.4165h-0.8201v-7.5959z" />
				</svg>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 4.2773 8.2238" xmlSpace="preserve" className="fill-[#e5e7eb] h-3">
					<g transform="translate(-.54087 -.033102)">
						<path d="m2.3948 0.033104c-0.12844-4.8659e-4 -0.2249 0.094726-0.2263 0.23208l0.00209 0.27488-1.2127-0.00381c-0.3609-0.0011272-0.40955 0.23832-0.40972 0.3954l-0.0072179 6.8867c-2.5933e-4 0.25269 0.20267 0.43853 0.46726 0.43853h3.3428c0.34409 0 0.46753-0.24079 0.46726-0.49599l-0.007238-6.779c-2.071e-4 -0.21735-0.081664-0.43133-0.43851-0.43133h-1.1789l-0.0042623-0.28752c-0.0029584-0.20089-0.125-0.22756-0.21652-0.22789zm2.0136 2.4298 0.00724 5.2046c3.402e-4 0.24436-0.13383 0.20819-0.24439 0.20846l-2.9833 0.0072c-0.1923 4.816e-4 -0.23728-0.07319-0.23728-0.2444v-5.1615zm-3.2257 2.0379v1.4958h3.0199v-1.4958zm0.00126 1.6532v1.3916c0 0.10044 0.00515 0.10428 0.12806 0.10428h2.7657c0.12582 0 0.12605-0.00607 0.12605-0.15486v-1.341z"/>
					</g>
				</svg>
				<span style={{fontSize: ".7rem"}}>{time}</span>
			</div>
			<div className="flex justify-between items-center bg-[#d9d9d9] shadow-sm">
				<div className="flex items-center gap-2 py-2 px-4">
					<div className="ava-sheep w-10 h-10 rounded-full border-2 border-gray-500" />
					<div className="flex flex-col gap-1">
						<span className="text-sm font-medium">Dolly</span>
						<span style={{fontSize: ".7rem"}} className="text-gray-600">{dollyStatus}</span>
					</div>
				</div>
				<div className="flex gap-1 items-center pr-4">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
					</svg>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
					</svg>
				</div>
			</div>
			<div className="w-body relative w-full">
				<div className="w-body-img" />
				<div className="dolly-scroll w-body-msgs">
					<div ref={refBody} className="flex flex-col gap-2">
						{
							messages.map((m, index) => <Msg key={`m-${index}`} msg={m} />)
						}
					</div>
				</div>
			</div>
			<div className="flex items-center gap-2 bg-[#d9d9d9] py-2 px-4 shadow-md">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-10 h-10">
					<path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
				</svg>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-10 h-10">
					<path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
				</svg>
				<form className="w-full flex gap-2" onSubmit={handleNewMsg}>
					<input className="w-full rounded-md p-2 outline-0" type="text" value={msg} onChange={(e) =>  setMsg(e.target.value)} placeholder="Escribe un mensaje aquí" />
					<button type="submit"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" className="w-10 h-10 cursor-pointer" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24" xmlSpace="preserve"><path fill="gray" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path></svg></button>
				</form>
			</div>
		</div>
	);
};

export default Dolly;