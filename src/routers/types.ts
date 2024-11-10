import { ReactElement } from "react";

export interface LocationStates {
	"/": {};
	"/login"?: {};
	"/register"?: {};
	"/onboarding"?: {};
	"/profiles"?: {};
}

export type PathName = keyof LocationStates;

export interface Page {
	path: PathName;
	exact?: boolean;
	component: ReactElement; // Change to ReactElement to match JSX elements in the route config
}
