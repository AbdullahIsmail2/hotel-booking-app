import { useForm } from "react-hook-form";
import { postNewUser } from "../api";
import { useMutation } from "@tanstack/react-query";

export type RegisterFormData = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
};
export default function Register() {
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>();

	const mutation = useMutation({
		mutationFn: postNewUser,
		onSuccess: () => {
			console.log("registration successful");
		},
		onError: (error: Error) => {
			console.log(error.message);
		},
	});

	const onSubmit = handleSubmit((data) => {
		console.log(data)
		mutation.mutate(data);
	});

	return (
		<form className="flex flex-col gap-5" onSubmit={onSubmit}>
			<h2 className="text-3xl font-bold">Create An Account</h2>
			<div className="flex flex-col md:flex-row gap-5">
				<label className="text-gray-700 text-sm font-bold flex-1">
					First Name
					<input
						type="text"
						className="border border-gray-700 rounded w-full py-1 px-2 font-normal md:mt-2"
						{...register("firstName", { required: "First Name is Required" })}
					/>
					{errors.firstName && (
						<span className="text-red-500">{errors.firstName.message}</span>
					)}
				</label>
				<label className="text-gray-700 text-sm font-bold flex-1">
					Last Name
					<input
						type="text"
						className="border border-gray-700 rounded w-full py-1 px-2 font-normal md:mt-2"
						{...register("lastName", { required: "Last Name is Required" })}
					/>
					{errors.lastName && (
						<span className="text-red-500">{errors.lastName.message}</span>
					)}
				</label>
			</div>
			<label className="text-gray-700 text-sm font-bold flex-1">
				Email
				<input
					type="email"
					className="border border-gray-700 rounded w-full py-1 px-2 font-normal md:mt-2"
					{...register("email", { required: "Email is Required" })}
				/>
				{errors.email && (
					<span className="text-red-500">{errors.email.message}</span>
				)}
			</label>
			<label className="text-gray-700 text-sm font-bold flex-1">
				Password
				<input
					type="password"
					className="border border-gray-700 rounded w-full py-1 px-2 font-normal md:mt-2"
					{...register("password", {
						required: "This field is required",
						minLength: {
							value: 6,
							message: "Password must be at least 6 characters",
						},
					})}
				/>
				{errors.password && (
					<span className="text-red-500">{errors.password.message}</span>
				)}
			</label>
			<label className="text-gray-700 text-sm font-bold flex-1">
				Confirm Password
				<input
					type="password"
					className="border border-gray-700 rounded w-full py-1 px-2 font-normal md:mt-2"
					{...register("confirmPassword", {
						validate: (value) => {
							if (!value) return "This field is required";
							if (watch("password") !== value)
								return "Your passwords do not match";
						},
					})}
				/>
				{errors.confirmPassword && (
					<span className="text-red-500">{errors.confirmPassword.message}</span>
				)}
			</label>
			<span className="mt">
				<button
					type="submit"
					className="bg-blue-600 text-white p-2 font-bold
           hover:bg-blue-500 text-xl"
				>
					Create Account
				</button>
				<button
					className="border-blue-500 border ml-5 bg-white font-black p-2"
					onClick={() => console.log(errors)}
				>
					Log Errors
				</button>
			</span>
		</form>
	);
}
