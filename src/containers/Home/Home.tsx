import React, { useState, useEffect } from "react";
import FlightInput from "../../components/FlightInput/FlightInput";
import ButtonSubmit from "../../components/FlightInput/ButtonSubmit";
import axios from "axios";

const Home = () => {
	const [locationInputValue, setLocationInputValue] = React.useState("");
	const arr = [1, 2, 3];

	const [loading, setLoading] = useState(true);

	const [flightData, setFlightData] = useState([]);

	useEffect(() => {
		const handler = setTimeout(() => {
			const items = fetchItemsByPrefix("flight:");

			const cachedData = Object.values(items);

			const finalData = cachedData.map((item) => JSON.parse(item));

			console.log(finalData.flat());
			if (finalData.length > 0) {
				setFlightData(finalData.flat());
			}

			setLoading(false);
		}, 1000);

		return () => {
			clearTimeout(handler);
		};
	}, []);

	function fetchItemsByPrefix(prefix) {
		const filteredItems = {};
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			if (key.startsWith(prefix)) {
				const value = localStorage.getItem(key);
				filteredItems[key] = value;
			}
		}
		return filteredItems;
	}

	// {loading && (
	//      <div className="flex flex-row justify-center">
	//           <MoonLoader
	//                color={"#4338CA"}
	//                loading={loading}
	//                size={50}
	//                aria-label="MoonLoader"
	//                data-testid="loader"
	//           />
	//      </div>
	// )}

	useEffect(() => {
		// Set a timeout to make the API call after 300 milliseconds
		const handler = setTimeout(() => {
			// Call the API here
			axios
				.get(
					`http://127.0.0.1:8000/flight/fetch_flight_details/${locationInputValue}/`
				)
				.then((response) => {
					let modifiedData = response.data;
					modifiedData = modifiedData.map((item) => {
						return {
							...item,
							flight_number: locationInputValue || "EY45",
						};
					});

					console.log("data", modifiedData);
					setFlightData(modifiedData);
					setLoading(false);
					localStorage.setItem(
						`flight:${locationInputValue}`,
						JSON.stringify(response.data)
					);
					// Handle the data
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		}, 500);

		// Clear the timeout if value changes again within the 300ms
		return () => {
			clearTimeout(handler);
		};
	}, [locationInputValue]);

	const updateUserFlightDetails = async (date, flightNumber) => {
		// Set a timeout to make the API call after 300 milliseconds
		try {
			axios
				.post(`http://127.0.0.1:8000/flight/add_flight_details/`, {
					// Data to send in the POST request
					flight_number: flightNumber,
					flight_date: date,
					ussid: localStorage.getItem("ussid"),
				})
				.then((res) => {
					window.location.href = "/profiles";
				});
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<div className="pl-56 pr-56 pb-72">
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
			{flightData.length > 0 ? (
				<div className="max-h-96 overflow-y-auto overflow-x-hidden">
					{flightData.map((item, i) => {
						return (
							<div
								className="mt-4 ml-4 mr-8 cursor-pointer"
								onClick={(e) =>
									updateUserFlightDetails(
										flightData[i].date,
										flightData[i].flight_number
									)
								}
							>
								<div className="border dark:border-slate-700 shadow rounded-md p-4 w-full mx-auto">
									<div className="flex space-x-4">
										<div className="rounded-full justify-center flex items-center bg-slate-700 h-10 w-10">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="size-6"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
												/>
											</svg>
										</div>
										{/* <div>{item.date}</div> */}
										<div className="flex-1 space-y-6 py-1">
											<div className="dark:bg-slate-700 bg-gray-400 rounded p-2">
												Date: {item.date}
											</div>
											<div className="space-y-3">
												<div className="grid grid-cols-6 gap-3">
													<div className="dark:bg-slate-700 bg-gray-400 rounded col-span-2 p-2">
														Departure Airport: {item.departure_airport}
													</div>
													<div className="dark:bg-slate-700 bg-gray-400 rounded col-span-2 p-2">
														Arrival Airport: {item.arrival_airport}
													</div>
													<div className="dark:bg-slate-700 bg-gray-400 rounded col-span-2 p-2">
														Airlines: {item.airline_name}
													</div>
												</div>
												<div className="grid grid-cols-4 gap-3">
													<div className="dark:bg-slate-700 bg-gray-400 rounded col-span-2 p-2">
														Departure Time: {item.departure_local_time}
													</div>
													<div className="dark:bg-slate-700 bg-gray-400 rounded col-span-2 p-2">
														Arrival Time: {item.arrival__local_time}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			) : (
				<div className="max-h-96 overflow-y-auto overflow-x-hidden">
					{arr.map((i) => {
						return (
							<div key={i} className="mt-4 ml-4 mr-8">
								<div className="border dark:border-slate-700 shadow rounded-md p-4 w-full mx-auto">
									<div className="animate-pulse flex space-x-4">
										{/* <div className="rounded-full bg-slate-700 h-10 w-10"></div> */}
										<div className="flex-1 space-y-6 py-1">
											<div className="h-2 dark:bg-slate-700 bg-gray-400 rounded"></div>
											<div className="space-y-3">
												<div className="grid grid-cols-3 gap-4">
													<div className="h-2 dark:bg-slate-700 bg-gray-400 rounded col-span-2"></div>
													<div className="h-2 dark:bg-slate-700 bg-gray-400 rounded col-span-1"></div>
												</div>
												<div className="h-2 dark:bg-slate-700 bg-gray-400 rounded"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Home;
