import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
// import Footer from "shared/Footer/Footer";
import PageLogin from "../containers/PageLogin/PageLogin";
import SiteHeader from "../containers/SiteHeader";
import Footer from "../shared/Footer/Footer";

export const pages: Page[] = [
	{ path: "/", component: <PageLogin /> },
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
