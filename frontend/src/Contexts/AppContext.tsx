import React, { useContext, useState } from "react";
import Toast from "../Components/Toast";
import { useQuery } from "@tanstack/react-query";
import { validateToken } from "../api";
type ToastMessage = {
	message: string;
	type: "SUCCESS" | "ERROR";
};

type AppContext = {
	showToast: (toastMessage: ToastMessage) => void;
	isLoggedIn: boolean;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

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

export const useAppContext = () => {
	const context = useContext(AppContext);
	return context as AppContext;
};
