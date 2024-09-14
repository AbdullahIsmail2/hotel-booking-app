import { useContext } from "react";
import AppContext, { AppContextType } from "./AppContext";

export const useAppContext = () => {
	const context = useContext(AppContext);
	return context as AppContextType;
};
