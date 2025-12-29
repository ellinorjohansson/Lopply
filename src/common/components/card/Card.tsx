"use client";
import React, { useState } from "react";
import Image from "next/image";

export interface RaceCardProps {
	image: string;
	title: string;
	location: string;
	date: string;
	distance: string | number;
	terrain: string;
	difficulty: string;
}

const Card: React.FC<RaceCardProps> = ({
	image,
	title,
	location,
	date,
	distance,
	terrain,
	difficulty,
}) => {
	const [favorited, setFavorited] = useState(false);

	const toggleFavorite = () => {
		setFavorited(!favorited);
	};

	const terrainIcons: { [key: string]: string } = {
		urban: "apartment",
		costal: "water",
		mountain: "landscape",
	};

	const terrainIcon = terrainIcons[terrain.toLowerCase()];


	return (
		<article
			className="rounded-3xl overflow-hidden bg-secondary text-secondaryaccent max-w-sm shadow-lg"
			aria-labelledby="race-title"
		>
			<div className="relative h-60 w-full">
				<Image
					src={image}
					alt={title}
					fill
					className="object-cover rounded-3xl"
					sizes="100%"
				/>
				<div
					onClick={toggleFavorite}
					className="absolute top-4 right-4 bg-white/85 rounded-xl w-10 h-10 flex items-center justify-center cursor-pointer"
					aria-hidden="true"
				>
					<span
						className={`material-symbols-outlined ${favorited ? "text-primaryaccent" : "text-secondary"}`}
						aria-hidden="true"
					>
						favorite
					</span>
				</div>
			</div>

			<div className="p-6 flex flex-col gap-3">
				<h3
					id="race-title"
					className="text-2xl font-bold text-primaryaccent!"
				>
					{title}
				</h3>

				<div className="flex items-center gap-3 text-base" aria-label="Race location">
					<span className="material-symbols-outlined w-5 h-5" aria-hidden="true">
						location_on
					</span>
					<span className="font-sans">{location}</span>
				</div>

				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-3" aria-label="Race date">
						<span className="material-symbols-outlined w-5 h-5" aria-hidden="true">
							calendar_today
						</span>
						<span className="text-base font-sans">{date}</span>
					</div>

					<div className="flex items-center gap-3" aria-label="Race distance">
						<span className="material-symbols-outlined w-5 h-5" aria-hidden="true">
							steps
						</span>
						<span className="text-base font-sans">{distance} km</span>
					</div>
				</div>

				<div className="flex gap-4 pt-2">
					<span
						className="flex items-center gap-2 px-5 py-2 rounded-full border border-primaryaccent text-primaryaccent text-base"
						aria-label="Terrain type"
					>
						<span className="material-symbols-outlined w-5 h-5" aria-hidden="true">
							{terrainIcon}
						</span>
						{terrain}
					</span>

					<span
						className="flex items-center gap-2 px-5 py-2 rounded-full border border-primaryaccent text-primaryaccent text-base"
						aria-label="Difficulty level"
					>
						{difficulty}
					</span>
				</div>
			</div>
		</article>
	);
};

export default Card;