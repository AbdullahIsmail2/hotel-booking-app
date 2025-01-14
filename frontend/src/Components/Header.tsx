import { Link } from "react-router-dom";
import { useAppContext } from "../Contexts/AppContext";
import SignOutButton from "./SignOutButton";
import { useState, useEffect } from "react";

export default function Header() {
	const { isLoggedIn } = useAppContext();

		const [isMobile, setIsMobile] = useState(false);
	
		useEffect(() => {
			const handleResize = () => {
				setIsMobile(window.innerWidth < 560);
			};
			handleResize();
	
			window.addEventListener("resize", handleResize);
	
			return () => {
				window.removeEventListener("resize", handleResize);
			};
		});
	

	return (
		<div className="bg-blue-800 py-6 px-4 xs:px-8">
			<div className="container mx-auto flex justify-between">
				<span className="text-xl xs:text-2xl lg:text-3xl text-white font-bold tracking-tight">
					<Link to="/">Radiant Resorts</Link>
				</span>

				<span className="flex space-x-2">
					{isLoggedIn ? (
						<>
							<Link
								className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
								to={isMobile ? "/" : "/my-hotels"}
							>
								My Hotels
							</Link>
							<SignOutButton />
						</>
					) : (
						<Link
							to={isMobile ? "/" : "/sign-in"}
							className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
						>
							Sign In
						</Link>
					)}
				</span>
			</div>
		</div>
	);
}
