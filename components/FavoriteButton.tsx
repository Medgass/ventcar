"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "./FavoritesProvider";

export default function FavoriteButton({
  vehicleId,
  className = "grid h-9 w-9 place-items-center rounded-full bg-white/95 text-slate-700 shadow transition hover:text-pink-500",
  iconClassName = "h-[18px] w-[18px]",
}: {
  vehicleId: string;
  className?: string;
  iconClassName?: string;
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(vehicleId);

  return (
    <button
      type="button"
      aria-label={active ? "Retirer des favoris" : "Ajouter aux favoris"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(vehicleId);
      }}
      className={className}
    >
      <Heart
        className={`${iconClassName} transition ${
          active ? "fill-pink-500 text-pink-500" : ""
        }`}
      />
    </button>
  );
}
