import React, { FC } from "react";

export interface LabelProps {
	className?: string;
}

const Label: FC<LabelProps> = ({ className = "", children }) => {
	return (
		<label
			className={`nc-Label text-sm font-medium text-neutral-700 dark:text-neutral-300 ${className}`}
			data-nc-id="Label"
		>
			{children}
		</label>
	);
};

export default Label;
