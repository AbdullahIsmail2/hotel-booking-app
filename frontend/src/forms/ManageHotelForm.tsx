import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../backend/src/shared/types";
import { useEffect } from "react";

export type HotelFormData = {
	name: string;
	city: string;
	country: string;
	description: string;
	type: string;
	pricePerNight: number;
	starRating: number;
	facilities: string[];
	imageFiles: FileList;
	imageUrls: string[];
	adultCount: number;
	childCount: number;
};

type Props = {
	onSave: (hotelFormData: FormData) => void;
	isPending: boolean;
	hotel?: HotelType;
};
const ManageHotelForm = ({ hotel, onSave, isPending }: Props) => {
	const formMethods = useForm<HotelFormData>();
	const { handleSubmit, reset } = formMethods;

	useEffect(() => {
		reset(hotel);
	}, [hotel, reset]);

	const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
		// because we have images in our data, we cannot send it as type json to backend
		const formData = new FormData();

		if (hotel) {
			formData.append("hotelId", hotel._id);
		}
		formData.append("name", formDataJson.name);
		formData.append("city", formDataJson.city); 
		formData.append("country", formDataJson.country);
		formData.append("description", formDataJson.description);
		formData.append("type", formDataJson.type);
		formData.append("pricePerNight", formDataJson.pricePerNight.toString());
		formData.append("starRating", formDataJson.starRating.toString());
		formData.append("adultCount", formDataJson.adultCount.toString());
		formData.append("childCount", formDataJson.childCount.toString());

		formDataJson.facilities.forEach((facility, index) => {
			formData.append(`facilities[${index}]`, facility);
		});

		if(formDataJson.imageUrls) {
			formDataJson.imageUrls.forEach((url, index) => {
				formData.append(`imageUrls[${index}]`, url)
			})
		}

		Array.from(formDataJson.imageFiles).forEach((imageFile) => {
			formData.append(`imageFiles`, imageFile);
		});

		onSave(formData);
	});
	return (
		<FormProvider {...formMethods}>
			<form className="flex flex-col gap-10" onSubmit={onSubmit}>
				<DetailsSection />
				<TypeSection />
				<FacilitiesSection />
				<GuestsSection />
				<ImagesSection />
				<span className="flex justify-end">
					<button
						disabled={isPending}
						className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
						type="submit"
					>
						{isPending ? "Saving..." : "Save"}
					</button>
				</span>
			</form>
		</FormProvider>
	);
};

export default ManageHotelForm;
