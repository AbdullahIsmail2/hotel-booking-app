import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchMyHotelById, updateMyHotelById } from "../api";
import ManageHotelForm from "../forms/ManageHotelForm";
import { useAppContext } from "../Contexts/useAppContext";

export default function EditHotel() {
	const { hotelId } = useParams();
	const { showToast } = useAppContext();

	const { data: hotel } = useQuery({
		queryKey: ["fetchMyHotelById"],
		queryFn: () => fetchMyHotelById(hotelId || ""),
		enabled: !!hotelId, // only run query if hotelId is truthy
	});

	const { mutate, isPending } = useMutation({
		mutationFn: updateMyHotelById,
		onSuccess: () => {
			showToast({ message: "Hotel Saved!", type: "SUCCESS" });
		},
		onError: () => {
			showToast({ message: "Error Saving Hotel", type: "ERROR" });
		},
	});

	const handleSave = (hotelFormData: FormData) => {
		mutate(hotelFormData);
	};
	return (
		<ManageHotelForm hotel={hotel} onSave={handleSave} isPending={isPending} />
	);
}
