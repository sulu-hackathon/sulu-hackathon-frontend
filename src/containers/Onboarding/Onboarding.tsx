import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Input from "../../shared/Input/Input";
import Select from "../../shared/Select/select";
import CommonLayout from "../../components/Layout/CommonLayout";
import FormItem from "../Froms/FormItem";
import Textarea from "../../shared/Textarea/Textarea";
import NcInputNumber from "../../components/NcInputNumber/NcInputNumber";
import axios from "axios";

const Onboarding: React.FC = () => {
	const [onboardingData, setOnboardingData] = useState({
		instaID: "",
		name: "",
		about: "",
		dob: "",
		nationality: "",
		gender: "",
		image: "",
	});
	const [imageName, setImageName] = useState(""); // New state for image name

	const [debouncedInstaID, setDebouncedInstaID] = useState(
		onboardingData.instaID
	);

	useEffect(() => {
		const handler = setTimeout(() => {
            if(onboardingData.instaID) setDebouncedInstaID(onboardingData.instaID);
		}, 300); // 300ms debounce delay

		return () => {
			clearTimeout(handler);
		};
	}, [onboardingData.instaID]);

	useEffect(() => {
		if (debouncedInstaID) {
			makeApiCall(debouncedInstaID);
		}
	}, [debouncedInstaID]);

	const makeApiCall = (inputInstagramID:string) => {
		axios
			.get(
				`http://127.0.0.1:8000/instagram/validate_instagram/${inputInstagramID}/`
			)
			.then((response) => {
				console.log(response.data);
				// Handle the data
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	const onboardingSubmitHandler = (e: React.FormEvent): void => {
		e.preventDefault();
		console.log(onboardingData);
		setOnboardingData({
			instaID: "",
			name: "",
			about: "",
			dob: "",
			nationality: "",
			gender: "",
			image: "",
		});
		setImageName("");
	};

	const onDrop = (acceptedFiles: any) => {
		const file = acceptedFiles[0];
		setOnboardingData({ ...onboardingData, image: file });
		setImageName(file.name);
	};

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: { "image/*": [".jpeg", ".jpg", ".png"] },
		maxFiles: 1,
	});

	return (
		<CommonLayout
			index="01"
			backtHref="/add-listing-1"
			nextHref="/add-listing-2"
            onSubmitHandler={() => onboardingSubmitHandler}
		>
			<>
				<h2 className="text-2xl font-semibold">Onboarding</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				{/* FORM */}
				<div className="space-y-8">
					{/* ITEM */}
					<FormItem
						label="Instagram ID"
						desc="Instagram Id to be used to find matches"
					>
						<Input
							placeholder="Instagram ID"
							value={onboardingData.instaID}
							onChange={(e) =>
								setOnboardingData({
									...onboardingData,
									instaID: e.target.value,
								})
							}
						/>
					</FormItem>
					<FormItem label="Name" desc="Display name for the application">
						<Input 
                            placeholder="Name" 
                            value={onboardingData.name}
                            onChange={(e) =>
								setOnboardingData({
									...onboardingData,
									name: e.target.value,
								})
							}
                        />
					</FormItem>
					<FormItem label="About" desc="A brief description about you">
						<Textarea 
                            placeholder="..." 
                            rows={14} 
                            value={onboardingData.about}
                            onChange={(e) =>
								setOnboardingData({
									...onboardingData,
									about: e.target.value,
								})
							}
                        />
					</FormItem>
					<NcInputNumber label="Age" defaultValue={18} />
					<FormItem
						label="Nationality"
						desc="Your nationality or where you belong to"
					>
						<Input 
                            placeholder="Nationality" 
                            value={onboardingData.nationality}
                            onChange={(e) =>
								setOnboardingData({
									...onboardingData,
									nationality: e.target.value,
								})
							}
                        />
					</FormItem>
					<FormItem label="Gender" desc="">
						<Select
                            value={onboardingData.gender}
                            onChange={(e) =>
								setOnboardingData({
									...onboardingData,
									gender: e.target.value,
								})
							}
                        >
							<option defaultValue="default" value="default"></option>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="others">Others</option>
						</Select>
					</FormItem>
					<div className="space-y-8">
						<div>
							<span className="text-lg font-semibold">Profile Picture</span>
							<div className="mt-5">
								<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md">
									<div className="space-y-1 text-center">
										<svg
											className="mx-auto h-12 w-12 text-neutral-400"
											stroke="currentColor"
											fill="none"
											viewBox="0 0 48 48"
											aria-hidden="true"
										>
											<path
												d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											></path>
										</svg>
										<div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
											<label
												htmlFor="file-upload"
												className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
											>
												<span>Upload a file</span>
												<input
													id="file-upload"
													name="file-upload"
													type="file"
													className="sr-only"
													{...getInputProps()}
												/>
											</label>
											<p className="pl-1">or drag and drop</p>
										</div>
										{imageName && (
											<p className="text-sm text-neutral-700 dark:text-neutral-300 mt-2">
												Uploaded file: {imageName}
											</p>
										)}
										<p className="text-xs text-neutral-500 dark:text-neutral-400">
											PNG, JPG, GIF up to 10MB
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		</CommonLayout>
	);
};

export default Onboarding;
