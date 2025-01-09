import { useMutation } from "@tanstack/react-query";
import ManageHotelForm from "../forms/ManageHotelForm";
import { useAppContext } from "../Contexts/AppContext";
import { addMyHotel } from "../api";

export default function AddHotel() {
	const { showToast } = useAppContext();
	const { mutate, isPending } = useMutation({
		mutationFn: addMyHotel,
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
	return <ManageHotelForm onSave={handleSave} isPending={isPending} />;
}
