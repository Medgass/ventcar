"use client";

import { useState } from "react";
import FavoriteButton from "./FavoriteButton";

export default function ImageGallery({
  images,
  alt,
  vehicleId,
  badge,
}: {
  images: string[];
  alt: string;
  vehicleId: string;
  badge?: string;
}) {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      {/* Photo principale */}
      <div className="relative h-72 overflow-hidden rounded-3xl bg-slate-100 sm:h-96">
        <img
          src={images[selected]}
          alt={`${alt} — photo ${selected + 1}`}
          className="h-full w-full object-cover"
        />
        {badge && (
          <span className="absolute left-4 top-4 rounded-md bg-violet-600 px-3 py-1.5 text-xs font-bold tracking-wide text-white shadow">
            {badge}
          </span>
        )}
        <span className="absolute right-4 top-4">
          <FavoriteButton
            vehicleId={vehicleId}
            className="grid h-11 w-11 place-items-center rounded-full bg-white/95 text-slate-700 shadow-lg transition hover:text-pink-500"
            iconClassName="h-5 w-5"
          />
        </span>
      </div>

      {/* Miniatures */}
      <div className="mt-3 grid grid-cols-3 gap-3">
        {images.map((img, i) => (
          <button
            key={img}
            type="button"
            onClick={() => setSelected(i)}
            aria-label={`Photo ${i + 1} de ${alt}`}
            aria-pressed={i === selected}
            className={`h-20 overflow-hidden rounded-xl border-2 bg-slate-100 transition sm:h-24 ${
              i === selected
                ? "border-violet-600 ring-2 ring-violet-100"
                : "border-transparent opacity-75 hover:opacity-100"
            }`}
          >
            <img src={img} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
