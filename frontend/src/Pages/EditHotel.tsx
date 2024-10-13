import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchMyHotelById } from "../api";
import ManageHotelForm from "../forms/ManageHotelForm";

export default function EditHotel() {
	const { hotelId } = useParams();

	const { data: hotel } = useQuery({
		queryKey: ["fetchMyHotelById"],
		queryFn: () => fetchMyHotelById(hotelId || ""),
		enabled: !!hotelId, // only run query if hotelId is truthy
	});
	return <ManageHotelForm hotel={hotel} />;
}
