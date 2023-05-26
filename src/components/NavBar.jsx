import { useState } from "react";

const NavBar = () => {
	const [visible, setVisible] =  useState(false);

	return(       
		<nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
			<div className="text-white xl:w-9/12 md:w-full mx-auto p-4">
				<div className="flex justify-between">
					<div className="flex items-center space-x-4">
						<div className="flex items-center space-x-2 mr-4">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
								<path fillRule="evenodd" d="M4.5 9.75a6 6 0 0111.573-2.226 3.75 3.75 0 014.133 4.303A4.5 4.5 0 0118 20.25H6.75a5.25 5.25 0 01-2.23-10.004 6.072 6.072 0 01-.02-.496z" clipRule="evenodd" />
							</svg>
							<span>Qwerty123</span>
						</div>
						<div>
							<a href="#" className="mx-1 uppercase">Menu 1</a>
							<a href="#" className="mx-1 uppercase">Menu 2</a>
						</div>
					</div>
					<div>Menu 2</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;