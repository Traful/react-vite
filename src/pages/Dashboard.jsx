import NavBar from "./../components/NavBar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
	return(
		<>
			<NavBar />
			<div className="mt-4 max-w-lg mx-auto px-4">
				<Outlet />
			</div>
		</>
	);
};

export default Dashboard;