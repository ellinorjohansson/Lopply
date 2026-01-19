"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useTranslation } from "@/common/hooks/useTranslation";
import ApproveButton from "../buttons/ApproveButton";
import RejectButton from "../buttons/RejectButton";
import DeleteButton from "../buttons/DeleteButton";
import SecondaryButton from "../buttons/SecondaryButton";
import ErrorToaster from "../toasters/ErrorToaster";
import SuccedToaster from "../toasters/SuccedToaster";
import ToolTip from "../tooltip/ToolTip";

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
	id?: string;
	onApprove?: (_id: string) => void;
	onReject?: (_id: string) => void;
	onDelete?: (_id: string) => void;
	onFavoriteChange?: () => void;
	onRemoveSuccess?: () => void;
	onFavoriteSuccess?: () => void;
	showRemoveButton?: boolean;
	isFavorited?: boolean;
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
	id,
	onApprove,
	onReject,
	onDelete,
	onFavoriteChange,
	onRemoveSuccess,
	onFavoriteSuccess,
	showRemoveButton = false,
	isFavorited = false,
}: RaceCardProps) => {
	const [favorited, setFavorited] = useState(isFavorited);
	const [isLoading, setIsLoading] = useState(false);
	const [showError, setShowError] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [showRemoveSuccess, setShowRemoveSuccess] = useState(false);
	const { data: session } = useSession();
	const racesT = useTranslation("races");
	const buttonsT = useTranslation("buttons");
	const authT = useTranslation("authentication");
	const bucketT = useTranslation("bucketlist");

	useEffect(() => {
		setFavorited(isFavorited);
	}, [isFavorited]);

	const toggleFavorite = async (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		if (!session) {
			setShowError(true);
			return;
		}

		setIsLoading(true);
		try {
			if (favorited) {
				const res = await fetch("/api/bucketlist", {
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ raceId: id }),
				});

				if (res.ok) {
					setFavorited(false);
					setShowRemoveSuccess(false);
					setTimeout(() => setShowRemoveSuccess(true), 0);
					if (onFavoriteSuccess) {
						onFavoriteSuccess();
					}
					if (onFavoriteChange) {
						onFavoriteChange();
					}
				}
			} else {
				const res = await fetch("/api/bucketlist", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ raceId: id }),
				});

				if (res.ok) {
					setFavorited(true);
					setShowSuccess(false);
					setTimeout(() => setShowSuccess(true), 0);
					if (onFavoriteSuccess) {
						onFavoriteSuccess();
					}
				}
			}
		} catch (error) {
			console.error("Error toggling favorite:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const terrainIcons: { [key: string]: string } = {
		urban: "apartment",
		costal: "water",
		mountain: "landscape",
		desert: "wb_sunny",
		forest: "forest"
	};

	const terrainIcon = terrainIcons[terrain.toLowerCase()];

	const isAdminMode = !!(onApprove && onReject && id) || !!(onDelete && id);
	const isBucketlistMode = showRemoveButton && !isAdminMode;

	const handleApprove = () => {
		if (onApprove && id) onApprove(id);
	};

	const handleReject = () => {
		if (onReject && id) onReject(id);
	};

	const handleDelete = () => {
		if (onDelete && id) onDelete(id);
	};

	const handleRemoveFromBucketlist = async (e?: React.MouseEvent) => {
		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}
		setIsLoading(true);
		try {
			const res = await fetch("/api/bucketlist", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ raceId: id }),
			});

			if (res.ok) {
				setFavorited(false);
				if (onRemoveSuccess) {
					onRemoveSuccess();
				}
				if (onFavoriteChange) {
					onFavoriteChange();
				}
			}
		} catch (error) {
			console.error("Error removing from bucketlist:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const cardContent = (
		<>
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
						<span className="text-sm mt-2 opacity-60 w-40 text-center">{racesT("no_image")}</span>
					</div>
				)}

				{!isAdminMode && (
					<div className="absolute top-4 right-4">
						<ToolTip text={buttonsT("save_to_bucketlist")} position="left" hideOnMobile={true}>
							<button
								onClick={toggleFavorite}
								disabled={isLoading}
								className=" bg-white/85 rounded-xl w-10 h-10 flex items-center justify-center cursor-pointer disabled:opacity-50"
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
						</ToolTip>
					</div>
				)}
			</div>

			<div className="p-4 md:p-6 flex flex-col gap-3 grow">
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

				<div className={`flex flex-wrap gap-4 mt-auto ${(isAdminMode || isBucketlistMode) ? 'border-b pb-8 border-secondaryaccent/40' : ''}`}>
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

				{isBucketlistMode && (
					<div className="flex flex-col gap-3 mt-8 mb-5 ">
						<div className="flex gap-3">
							<SecondaryButton text={bucketT("remove_from_list")} icon="delete" size="medium" onClick={handleRemoveFromBucketlist} />
						</div>
					</div>
				)}

				{isAdminMode && (
					<div className="flex flex-col gap-3 mt-4 mb-3">
						{onApprove && onReject && (
							<p
								className="max-w-md truncate cursor-pointer"
								title={raceUrl}
								onClick={() => navigator.clipboard.writeText(raceUrl)}
							>
								{raceUrl}
							</p>
						)}
						<div className="flex gap-3">
							{onApprove && onReject ? (
								<>
									<ApproveButton text={buttonsT("approve")} onClick={handleApprove} />
									<RejectButton text={buttonsT("reject")} onClick={handleReject} />
								</>
							) : (
								<DeleteButton text={buttonsT("delete")} onClick={handleDelete} />
							)}
						</div>
					</div>
				)}

			</div>
		</>
	);

	if (isAdminMode) {
		return (
			<>
				{showError && (
					<ErrorToaster
						headerMessage={authT("toaster.auth_required")}
						text={authT("toaster.auth_subtext")}
						onClose={() => setShowError(false)}
					/>
				)}
				<article
					className="rounded-3xl overflow-hidden bg-secondary text-secondaryaccent w-80 shadow-lg flex flex-col h-full"
					aria-labelledby="race-title"
				>
					{cardContent}
				</article>
			</>
		);
	}

	return (
		<>
			{showError && (
				<ErrorToaster
					headerMessage={authT("toaster.auth_required")}
					text={authT("toaster.auth_subtext")}
					onClose={() => setShowError(false)}
				/>
			)}
			{showSuccess && (
				<SuccedToaster
					headerMessage={bucketT("added_to_bucketlist")}
					text={bucketT("added_subtext")}
					onClose={() => setShowSuccess(false)}
				/>
			)}
			{showRemoveSuccess && (
				<SuccedToaster
					headerMessage={bucketT("removed_from_bucketlist")}
					text={bucketT("removed_subtext")}
					onClose={() => setShowRemoveSuccess(false)}
				/>
			)}
			<Link
				href={raceUrl}
				target="_blank"
				rel="noopener noreferrer"
				className="block h-full"
			>
				<article
					className="rounded-3xl overflow-hidden bg-secondary text-secondaryaccent w-80 shadow-lg cursor-pointer hover:scale-103 transition flex flex-col h-full"
					aria-labelledby="race-title"
				>
					{cardContent}
				</article>
			</Link>
		</>
	);
};

export default Card;
