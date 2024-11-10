import React from "react";
import FlightInput from "../../components/FlightInput/FlightInput";
import ButtonSubmit from "../../components/FlightInput/ButtonSubmit";

const Home = () => {
	const [locationInputValue, setLocationInputValue] = React.useState("");

	return (
		<div className="pt-12 pl-48 pr-48 pb-72">
			<form className="w-full relative flex md:flex-row  rounded-3xl md:rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700  md:divide-y-0">
				<FlightInput
					defaultValue={locationInputValue}
					onChange={(e) => setLocationInputValue(e)}
				/>
				{/* BUTTON SUBMIT OF FORM */}
				<div className="px-4 py-4 lg:py-0 flex items-center justify-center">
					<ButtonSubmit />
				</div>
			</form>
		</div>
	);
};

export default Home;
