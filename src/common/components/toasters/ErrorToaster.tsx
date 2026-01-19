"use client";

import { useEffect } from "react";

export interface ErrorToasterProps {
	headerMessage: string;
	text: string;
	onClose: () => void;
}

const ErrorToaster = ({ headerMessage, text, onClose }: ErrorToasterProps) => {

	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 4000);

		return () => clearTimeout(timer);
	}, [onClose]);

	return (
		<div
			className="
				fixed bottom-10 right-20 bg-error text-secondaryaccent shadow-lg  p-4 animate-slide-up rounded-2xl max-w-xs sm:max-w-sm md:max-w-md
				wrap-break-words z-200"
		>
			<h3 className="font-semibold text-base">{headerMessage}</h3>
			<p className="text-sm">{text}</p>
		</div>
	);
};

export default ErrorToaster;
