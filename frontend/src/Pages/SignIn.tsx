import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { signIn } from "../api";
import { useAppContext } from "../Contexts/useAppContext";
import { useNavigate } from "react-router-dom";

export type SignInFormType = {
	email: string;
	password: string;
};

export default function SignIn() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInFormType>();

	const { showToast } = useAppContext();
	const navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: signIn,
		onSuccess: () => {
			showToast({
				message: "Login Successful! ",
				type: "SUCCESS",
			});
			navigate("/");
		},
		onError: (error: Error) => {
			showToast({
				message: error.message,
				type: "ERROR",
			});
		},
	});

	const onSubmit = handleSubmit((data) => {
		console.log(data);
		mutation.mutate(data);
	});

	return (
		<form className="flex flex-col gap-5" onSubmit={onSubmit}>
			<h2 className="text-3xl font-bold">Sign In</h2>

			<label className="text-gray-700 text-sm font-bold flex-1">
				Email
				<input
					type="email"
					className="border border-gray-700 rounded w-full py-1 px-2 font-normal md:mt-2"
					{...register("email", { required: "Email is required" })}
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
						required: "Password is required",
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

      <span className="">
				<button
					type="submit"
					className="bg-blue-600 text-white p-2 font-bold
           hover:bg-blue-500 text-xl"
				>
					Sign In
				</button>
			
			</span>
	
		</form>
	);
}
