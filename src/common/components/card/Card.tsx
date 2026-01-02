"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface RaceCardProps {
	image: string;
	title: string;
	location: string;
	date: string;
	distance: string | number;
	terrain: string;
	difficulty: string;
	description: string;
	raceUrl: string;
}

const Card = ({
	image,
	title,
	location,
	date,
	distance,
	terrain,
	difficulty,
	description,
	raceUrl,
}: RaceCardProps) => {
	const [favorited, setFavorited] = useState(false);

	const toggleFavorite = (e: React.MouseEvent) => {
		e.stopPropagation();
		setFavorited(!favorited);
	};

	const terrainIcons: { [key: string]: string } = {
		urban: "apartment",
		costal: "water",
		mountain: "landscape",
	};

	const terrainIcon = terrainIcons[terrain.toLowerCase()];

	return (
		<Link
			href={raceUrl}
			target="_blank"
			rel="noopener noreferrer"
			className="block" >
			<article
				className="rounded-3xl overflow-hidden bg-secondary text-secondaryaccent max-w-sm shadow-lg cursor-pointer hover:scale-103 transition"
				aria-labelledby="race-title"
			>
				<div className="relative h-48 md:h-60 w-full">
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

				<div className="p-4 md:p-6 flex flex-col gap-3">
					<h3
						id="race-title"
						className="text-xl md:text-2xl font-bold text-primaryaccent!"
					>
						{title}
					</h3>

					<div className="flex items-center gap-3 text-base" aria-label="Race location">
						<span className="material-symbols-outlined w-5 h-5 text-primaryaccent" aria-hidden="true">
							location_on
						</span>
						<span className="font-sans">{location}</span>
					</div>

					<div className="flex items-center gap-3" aria-label="Race date">
						<span className="material-symbols-outlined w-5 h-5 text-primaryaccent" aria-hidden="true">
							calendar_today
						</span>
						<span className="text-base font-sans">{date}</span>
					</div>

					<div className="flex items-center gap-3" aria-label="Race distance">
						<span className="material-symbols-outlined w-5 h-5 text-primaryaccent" aria-hidden="true">
							steps
						</span>
						<span className="text-base font-sans">{distance} km</span>
					</div>

					<div className="flex items-center gap-3" aria-label="Race description">
						<p className="text-base font-sans">{description}</p>
					</div>

					<div className="flex flex-wrap gap-4 pt-2">
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
		</Link>
	);
};

export default Card;
