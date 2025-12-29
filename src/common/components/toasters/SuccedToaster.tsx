"use client";

import { useEffect } from "react";

export interface SuccedToasterProps {
	headerMessage: string;
	text: string;
	onClose: () => void;
}

const SuccedToaster = ({ headerMessage, text, onClose }: SuccedToasterProps) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 3500);

		return () => clearTimeout(timer);
	}, [onClose]);

	return (
		<div
			className="
        fixed bottom-10 right-20 bg-secondary text-secondaryaccent shadow-lg border border-secondaryaccent p-4 animate-slide-up rounded-2xl max-w-xs sm:max-w-sm md:max-w-md
				wrap-break-words"
		>
			<h3 className="font-bold text-sm">{headerMessage}</h3>
			<p className="text-xs">{text}</p>
		</div>
	);
};

export default SuccedToaster;
