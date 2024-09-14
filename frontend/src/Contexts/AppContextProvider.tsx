import React, { useState } from "react";
import AppContext, { ToastMessage } from "./AppContext";
import { useQuery } from "@tanstack/react-query";
import { validateToken } from "../api";
import Toast from "../Components/Toast";

export const AppContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

	const { isError } = useQuery({
		queryKey: ["validateToken"],
		queryFn: validateToken,
		retry: false,
	});

	return (
		<AppContext.Provider
			value={{
				showToast: (toastMessage) => {
					setToast(toastMessage);
				},
				isLoggedIn: !isError,
			}}
		>
			{toast && (
				<Toast
					message={toast.message}
					type={toast.type}
					onClose={() => setToast(undefined)}
				/>
			)}
			{children}
		</AppContext.Provider>
	);
};
