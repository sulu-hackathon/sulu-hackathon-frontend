import React, { FC, useState } from "react";
// import facebookSvg from "images/Facebook.svg";
// import twitterSvg from "images/Twitter.svg";
// import googleSvg from "images/Google.svg";
import instagramSvg from "../../assets/images/instagram.svg";
import { Helmet } from "react-helmet";
import Input from "../../shared/Input/Input";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";

export interface PageSignUpProps {
	className?: string;
}

export interface SignupFormType {
	email: string;
	password: string;
	e: React.FormEvent<HTMLFormElement>;
}

const loginSocials = [
	{
		name: "Continue with Instagram",
		href: "#",
		icon: instagramSvg,
	},
];

const SignupWithEmail = async ({ e, email, password }: SignupFormType) => {
	e.preventDefault();
	if (!email || !password) {
		console.error("Provide Email and Password");
		return;
	}
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);

		const user = userCredential.user;
		localStorage.setItem("ussid", user.uid);
		window.location.href = "/onboarding";

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		const errorCode = error.code;
		const errorMessage = error.message;

		console.log("errorCode:", errorCode, "errorMessage:", errorMessage);
	}
};

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
			<Helmet>
				<title>Sign up || Boarding Together</title>
			</Helmet>
			<div className="container mb-24 lg:mb-32">
				<h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
					Signup
				</h2>
				<div className="max-w-md mx-auto space-y-6 ">
					<div className="grid gap-3">
						{loginSocials.map((item, index) => (
							<a
								key={index}
								href={item.href}
								className="nc-will-change-transform items-center flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
							>
								<img
									className="flex-shrink-0"
									width={40}
									src={item.icon}
									alt={item.name}
								/>
								<h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
									{item.name}
								</h3>
							</a>
						))}
					</div>
					{/* OR */}
					<div className="relative text-center">
						<span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
							OR
						</span>
						<div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
					</div>
					{/* FORM */}
					<form
						className="grid grid-cols-1 gap-6"
						action="#"
						method="post"
						onSubmit={(e) => SignupWithEmail({ e, email, password })}
					>
						<label className="block">
							<span className="text-neutral-800 dark:text-neutral-200">
								Email address
							</span>
							<Input
								onChange={(e) => setEmail(e.target.value)}
								value={email}
								type="email"
								placeholder="example@example.com"
								className="mt-1"
							/>
						</label>
						<label className="block">
							<span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
								Password
							</span>
							<Input
								type="password"
								onChange={(e) => setPassword(e.target.value)}
								value={password}
								className="mt-1"
							/>
						</label>
						<ButtonPrimary type="submit">Continue</ButtonPrimary>
					</form>

					{/* ==== */}
					<span className="block text-center text-neutral-700 dark:text-neutral-300">
						Already have an account? {` `}
						<Link to="/login">Sign in</Link>
					</span>
				</div>
			</div>
		</div>
	);
};

export default PageSignUp;
