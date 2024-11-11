import React, { FC, useState } from "react";
// import facebookSvg from "images/Facebook.svg";
// import twitterSvg from "images/Twitter.svg";
// import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "../../shared/Input/Input";
import { Link } from "react-router-dom";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import instagramSvg from "../../assets/images/instagram.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";

export interface PageLoginProps {
	className?: string;
}

const loginSocials = [
	{
		name: "Continue with Instagram",
		href: "#",
		icon: instagramSvg,
	},
];

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const LoginWithEmail = async ({ e, email, password }) => {
		e.preventDefault();
		try {
			const { user } = await signInWithEmailAndPassword(auth, email, password);
			localStorage.setItem("ussid", user.uid);
			window.location.href = "/";
		} catch (error) {
			alert(error);
		}
	};

	return (
		<div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
			<Helmet>
				<title>Login || Boarding Together</title>
			</Helmet>
			<div className="container mb-24 lg:mb-32">
				<h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
					Login
				</h2>
				<div className="max-w-md mx-auto space-y-6">
					<div className="grid gap-3">
						{loginSocials.map((item, index) => (
							<a
								key={index}
								href={item.href}
								className="nc-will-change-transform flex items-center w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
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
						onSubmit={(e) => LoginWithEmail({ e, email, password })}
					>
						<label className="block">
							<span className="text-neutral-800 dark:text-neutral-200">
								Email address
							</span>
							<Input
								type="email"
								onChange={(e) => setEmail(e.target.value)}
								value={email}
								placeholder="example@example.com"
								className="mt-1"
							/>
						</label>
						<label className="block">
							<span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
								Password
								<Link to="/forgot-pass" className="text-sm">
									Forgot password?
								</Link>
							</span>
							<Input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="mt-1"
							/>
						</label>
						<ButtonPrimary type="submit">Continue</ButtonPrimary>
					</form>

					{/* ==== */}
					<span className="block text-center text-neutral-700 dark:text-neutral-300">
						New user? {` `}
						<Link to="/register">Create an account</Link>
					</span>
				</div>
			</div>
		</div>
	);
};

export default PageLogin;
