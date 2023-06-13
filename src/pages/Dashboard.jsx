import NavBar from "./../components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const Dashboard = () => {
	return(
		<div className="min-h-screen relative">
			<NavBar />
			<div className="mt-4 px-4">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default Dashboard;