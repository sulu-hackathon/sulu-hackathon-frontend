import React from "react";
import { useLocation } from "react-router-dom";
// import Header2 from "components/Header/Header";
import Header from "../shared/Header/Header";

const SiteHeader = () => {
	const location = useLocation();

	return <Header />;
};

export default SiteHeader;
