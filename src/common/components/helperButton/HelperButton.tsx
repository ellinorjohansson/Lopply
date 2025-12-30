"use client";

import { useEffect, useRef, useState } from "react";

export interface HelperButtonProps {
	infoText?: string;
}

const HelperButton = ({ infoText }: HelperButtonProps) => {
	const [open, setOpen] = useState(false);
	const popupRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
		}
		if (open) document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [open]);

	return (
		<div className="relative inline-block">
			<button
				onClick={() => setOpen((prev) => !prev)}
				className="cursor-pointer text-secondaryaccent flex items-center gap-1"
				type="button"
			>
				<span className="material-symbols-outlined">help</span>
			</button>

			{open && (
				<div
					ref={popupRef}
					className="absolute md:left-full md:top-0 md:ml-2 md:translate-x-0 left-1/2 -translate-x-1/2 top-full mt-2 bg-secondaryaccent p-3 rounded-lg text-sm w-52 z-50 text-secondary"
				>
					{infoText}
				</div>
			)}
		</div>
	);
};

export default HelperButton;
