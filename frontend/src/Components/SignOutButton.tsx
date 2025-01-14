import { signOut } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "../Contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SignOutButton() {
	
	const queryClient = useQueryClient();
	const { showToast } = useAppContext();
	const navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: signOut,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
			showToast({
				message: "Sign Out Successful",
				type: "SUCCESS",
			});
			navigate("/");
		},
		onError: (error: Error) => {
			showToast({
				message: error.message,
				type: "ERROR",
			});
		},
	});

	const handleClick = () => {
		mutation.mutate();
	};
	return (
		<button
			className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100"
			onClick={handleClick}
		>
			Sign Out
		</button>
	);
}
