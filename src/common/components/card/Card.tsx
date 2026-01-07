"use client";
import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/common/hooks/useTranslation";

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
	const r = useTranslation("races");

	const toggleFavorite = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setFavorited((prev) => !prev);
	};

	const terrainIcons: { [key: string]: string } = {
		urban: "apartment",
		costal: "water",
		mountain: "landscape",
		desert: "landscape_2",
		forest: "forest"
	};

	const terrainIcon = terrainIcons[terrain.toLowerCase()];

	return (
		<Link
			href={raceUrl}
			target="_blank"
			rel="noopener noreferrer"
			className="block" >
			<article
				className="rounded-3xl overflow-hidden bg-secondary text-secondaryaccent w-80 h-36rem shadow-lg cursor-pointer hover:scale-103 transition flex flex-col"
				aria-labelledby="race-title"
			>
				<div className="relative h-48 md:h-60 w-full">
					{image ? (
						<img
							src={image}
							alt={title}
							className="object-cover rounded-3xl w-full h-full"
							loading="lazy"
							width={400}
							height={250}
						/>
					) : (
						<div className="w-full h-full rounded-3xl bg-linear-to-br from-primaryaccent/20 to-secondaryaccent/30 flex flex-col items-center justify-center text-primaryaccent">
							<span className="material-symbols-outlined text-3xl! opacity-70">
								image_not_supported
							</span>
							<span className="text-sm mt-2 opacity-60 w-40 text-center">{r("no_image")}</span>
						</div>
					)}

					<button
						onClick={toggleFavorite}
						className="absolute top-4 right-4 bg-white/85 rounded-xl w-10 h-10 flex items-center justify-center cursor-pointer"
						aria-pressed={favorited}
						aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
					>
						<span
							className={`material-symbols-rounded ${favorited ? "text-primaryaccent" : "text-secondary/50"}`}
							aria-hidden="true"
						>
							{favorited ? "favorite" : "favorite_border"}
						</span>
					</button>
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
						<p className="text-base font-sans line-clamp-3 h-20">{description}</p>
					</div>

					<div className="flex flex-wrap gap-4 pt-2 mt-auto">
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
