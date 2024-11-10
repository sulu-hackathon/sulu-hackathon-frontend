import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
// import Footer from "shared/Footer/Footer";
import PageLogin from "../containers/PageLogin/PageLogin";
import PageSignUp from "../containers/PageSignUp/PageSignUp";
import SiteHeader from "../containers/SiteHeader";
import Footer from "../shared/Footer/Footer";
import Onboarding from "../containers/Onboarding/Onboarding";
import Home from "../containers/Home/Home";
import Profiles from "../containers/Profiles/Profiles";

export const pages: Page[] = [
	{ path: "/", component: <Home /> },
	{ path: "/login", component: <PageLogin /> },
	{ path: "/register", component: <PageSignUp /> },
	{ path: "/onboarding", component: <Onboarding /> },
	{ path: "/profiles", component: <Profiles /> },
	//
];

const AppRoutes = () => {
	return (
		<BrowserRouter basename="/">
			<ScrollToTop />
			<SiteHeader />

			<Routes>
				{pages.map(({ component, path, exact }) => (
					<Route key={path} element={component} path={path} />
				))}
				{/* <Route path="*" element={<Page404 />} /> */}
			</Routes>
			<Footer />
		</BrowserRouter>
	);
};

export default AppRoutes;
