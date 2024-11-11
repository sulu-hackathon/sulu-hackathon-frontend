// import Logo from "shared/Logo/Logo";
// import SocialsList1 from "shared/SocialsList1/SocialsList1";
import logo from "../../assets/images/logo.svg";
import { CustomLink } from "../../data/types";
import React from "react";

export interface WidgetFooterMenu {
	id: string;
	title: string;
	menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
	{
		id: "5",
		title: "Boarding Together",
		menus: [
			{ href: "#", label: "About Us" },
			{ href: "#", label: "Become a Host" },
			{ href: "#", label: "Work with Us" },
			{ href: "#", label: "Contact" },
		],
	},
];

const Footer: React.FC = () => {
	const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
		return (
			<div key={index} className="text-sm">
				<h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
					{menu.title}
				</h2>
				<ul className="mt-5 space-y-4">
					{menu.menus.map((item, index) => (
						<li key={index}>
							<a
								key={index}
								className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
								href={item.href}
							>
								{item.label}
							</a>
						</li>
					))}
				</ul>
			</div>
		);
	};

	return (
		<>
			<div className="nc-Footer relative lg:py-12 border-t border-neutral-200 dark:border-neutral-700">
				<div className="container flex justify-between gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
					<div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
						<div className="col-span-2 md:col-span-1">
							<img
								className="flex-shrink-0"
								width={70}
								src={logo}
								alt={"logo"}
							/>
						</div>
						<div className="col-span-2 flex items-center md:col-span-3">
							{/* <SocialsList1 className="flex items-center space-x-3 lg:space-x-0 lg:flex-col lg:space-y-2.5 lg:items-start" /> */}
						</div>
					</div>
					{widgetMenus.map(renderWidgetMenuItem)}
				</div>
			</div>
			<div className="flex justify-center py-2">© Boarding Together</div>
		</>
	);
};

export default Footer;
