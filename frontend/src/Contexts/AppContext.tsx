import React from "react";

export type ToastMessage = {
	message: string;
	type: "SUCCESS" | "ERROR";
};

export type AppContextType = {
	showToast: (toastMessage: ToastMessage) => void;
	isLoggedIn: boolean;
};

const AppContext = React.createContext<AppContextType | undefined>(undefined);

export default AppContext




