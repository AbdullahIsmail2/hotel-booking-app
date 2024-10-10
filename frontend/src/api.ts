import { RegisterFormData } from "./Pages/Register";
import { SignInFormType } from "./Pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// api request for registering new user
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
};

// api request for logging in with existing user

export const signIn = async (userObject: SignInFormType) => {
	const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
		method: "POST",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(userObject),
	});

	const responseBody = await response.json();

	if (!response.ok) {
		throw new Error(responseBody.message);
	}

	return responseBody;
};

// api request for signing out
export const signOut = async () => {
	const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
		method: "POST",
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("error during sign out");
	}
};

// api request for validating token
export const validateToken = async () => {
	const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
		credentials: "include",
	});

	const responseBody = await response.json();

	if (!response.ok) {
		throw new Error("Token invalid");
	}

	return responseBody;
};

export const addMyHotel = async (hotelFormData: FormData) => {
	const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
		method: "POST",
		credentials: "include",
		body: hotelFormData,
	});

	if (!response.ok) {
		throw new Error("Failed to add hotel");
	}
	
	return response.json();
};
