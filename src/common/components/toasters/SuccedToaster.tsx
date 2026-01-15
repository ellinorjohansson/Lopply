"use client";

import { useEffect, useState } from "react";

export interface SuccedToasterProps {
	headerMessage: string;
	text: string;
	onClose: () => void;
}

const SuccedToaster = ({ headerMessage, text, onClose }: SuccedToasterProps) => {
	const [zIndex] = useState(() => Date.now());

	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 4000);

		return () => clearTimeout(timer);
	}, [onClose]);

	return (
		<div
			style={{ zIndex }}
			className="
        fixed bottom-10 right-20 bg-secondary text-secondaryaccent shadow-lg border border-secondaryaccent p-4 animate-slide-up rounded-2xl max-w-xs sm:max-w-sm md:max-w-md
				wrap-break-words"
		>
			<h3 className="font-semibold text-base mb-1">{headerMessage}</h3>
			<p className="text-sm">{text}</p>
		</div>
	);
};

export default SuccedToaster;
