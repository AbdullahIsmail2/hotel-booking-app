import { RegisterFormData } from "./Pages/Register";
import { SignInFormType } from "./Pages/SignIn";
import { HotelSearchResponse, HotelType } from "../../backend/src/shared/types";

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

export const fetchMyHotels = async (): Promise<HotelType[]> => {
	const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Error fetching hotels");
	}

	return response.json();
};

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
	const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Error fetching Hotels");
	}

	return response.json();
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
	const response = await fetch(
		`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,
		{
			method: "PUT",
			body: hotelFormData,
			credentials: "include",
		}
	);

	if (!response.ok) {
		throw new Error("Failed to update Hotel");
	}

	return response.json();
};

export type SearchParams = {
	destination?: string;
	checkIn?: string;
	checkOut?: string;
	adultCount?: string;
	childCount?: string;
	page?: string;
};

export const searchHotels = async (
	searchParams: SearchParams
): Promise<HotelSearchResponse> => {
	const queryParams = new URLSearchParams();
	// URLSearchParams is a built-in JavaScript object that allows you to easily construct query string parameters for URLs.

	
	// queryParams.append(): Adds a key-value pair to the query string.
	queryParams.append("destination", searchParams.destination || "");
	queryParams.append("checkIn", searchParams.checkIn || "");
	queryParams.append("checkOut", searchParams.checkOut || "");
	queryParams.append("adultCount", searchParams.adultCount || "");
	queryParams.append("childCount", searchParams.childCount || "");
	queryParams.append("page", searchParams.page || "");

	const response = await fetch(
		`${API_BASE_URL}/api/hotels/search?${queryParams}`
	);

	// The URLSearchParams will append these query parameters so final URl would like this for example: 
	// APIBASEURL/api/hotels/search?destination=London&checkIn=2024-10-20&checkOut=2024-10-25&adultCount=2&childCount=1&page=1


	if (!response.ok) {
		throw new Error("Error fetching hotels");
	}

	return response.json();
};
