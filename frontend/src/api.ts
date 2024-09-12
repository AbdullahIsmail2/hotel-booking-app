import { RegisterFormData } from "./Pages/Register";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const postNewUser = async (newUserObject: RegisterFormData) => {
		const response = await fetch(`${API_BASE_URL}/api/user/register`, {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newUserObject),
		});

		const responseBody = await response.json();

		if (!response.ok) {
			throw new Error(responseBody.message);
		}
		return responseBody;
	} 
