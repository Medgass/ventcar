export type Vehicle = {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  fuel: string;
  km: number;
  price: number;
  category: string;
  gearbox: string;
  power: string;
  color: string;
  description: string;
  badge?: string;
  status?: "Disponible" | "Réservé" | "Vendu";
  img: string;
  images: string[];
};

// Valide et normalise les champs d'un véhicule reçu de l'admin
export function sanitizeVehicle(
  body: Record<string, unknown>
): Omit<Vehicle, "id"> | null {
  const str = (k: string) =>
    typeof body[k] === "string" ? (body[k] as string).trim() : "";
  const num = (k: string) => {
    const n = Number(body[k]);
    return Number.isFinite(n) ? n : 0;
  };
  const name = str("name");
  if (!name) return null;

  const images = Array.isArray(body.images)
    ? (body.images as unknown[])
        .filter((i): i is string => typeof i === "string" && i.trim() !== "")
        .map((i) => i.trim())
    : [];

  return {
    name,
    brand: str("brand"),
    model: str("model"),
    year: num("year"),
    fuel: str("fuel") || "Essence",
    km: num("km"),
    price: num("price"),
    category: str("category") || "Berlines",
    gearbox: str("gearbox") || "Manuelle",
    power: str("power"),
    color: str("color"),
    description: str("description"),
    badge: str("badge") || undefined,
    status: (["Disponible", "Réservé", "Vendu"].includes(str("status"))
      ? str("status")
      : "Disponible") as Vehicle["status"],
    img: images[0] ?? "",
    images,
  };
}

export function slugify(s: string): string {
  return (
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "vehicule"
  );
}

function withGallery(v: Omit<Vehicle, "images">): Vehicle {
  return {
    ...v,
    images: [v.img, `/images/cars/${v.id}-2.jpg`, `/images/cars/${v.id}-3.jpg`],
  };
}

export const defaultVehicles: Vehicle[] = [
  withGallery({
    id: "audi-a4",
    name: "Audi A4",
    brand: "Audi",
    model: "A4",
    year: 2021,
    fuel: "Diesel",
    km: 45000,
    price: 89000,
    category: "Berlines",
    gearbox: "Automatique",
    power: "150 ch",
    color: "Rouge tango",
    description:
      "Audi A4 en excellent état, entretien complet chez le concessionnaire. Intérieur cuir, GPS, caméra de recul et régulateur de vitesse adaptatif.",
    badge: "NOUVEAU",
    img: "/images/cars/audi-a4.jpg",
  }),
  withGallery({
    id: "bmw-serie-3",
    name: "BMW Série 3",
    brand: "BMW",
    model: "Série 3",
    year: 2022,
    fuel: "Essence",
    km: 32000,
    price: 115000,
    category: "Berlines",
    gearbox: "Automatique",
    power: "184 ch",
    color: "Gris graphite",
    description:
      "BMW Série 3 sous garantie constructeur. Pack M Sport, toit ouvrant, sièges chauffants et système audio Harman Kardon.",
    img: "/images/cars/bmw-serie-3.jpg",
  }),
  withGallery({
    id: "mercedes-classe-c",
    name: "Mercedes Classe C",
    brand: "Mercedes",
    model: "Classe C",
    year: 2020,
    fuel: "Diesel",
    km: 50000,
    price: 99000,
    category: "Berlines",
    gearbox: "Automatique",
    power: "163 ch",
    color: "Noir obsidienne",
    description:
      "Mercedes Classe C parfaitement entretenue, carnet à jour. Finition AMG Line, toit ouvrant, écran tactile, aide au stationnement active.",
    img: "/images/cars/mercedes-classe-c.jpg",
  }),
  withGallery({
    id: "range-rover-evoque",
    name: "Range Rover Evoque",
    brand: "Range Rover",
    model: "Evoque",
    year: 2019,
    fuel: "Diesel",
    km: 68000,
    price: 135000,
    category: "SUV / 4x4",
    gearbox: "Automatique",
    power: "180 ch",
    color: "Blanc Fuji",
    description:
      "Range Rover Evoque R-Dynamic au design iconique. Transmission intégrale, toit contrasté noir, caméras 360° et intérieur cuir.",
    img: "/images/cars/range-rover-evoque.jpg",
  }),
  withGallery({
    id: "volkswagen-golf-8",
    name: "Volkswagen Golf 8",
    brand: "Volkswagen",
    model: "Golf 8",
    year: 2023,
    fuel: "Essence",
    km: 18000,
    price: 95000,
    category: "Citadines",
    gearbox: "Manuelle",
    power: "110 ch",
    color: "Gris pierre de lune",
    description:
      "Volkswagen Golf 8 quasi neuve, première main. Cockpit digital, App-Connect, capteurs avant/arrière et jantes alliage.",
    badge: "NOUVEAU",
    img: "/images/cars/volkswagen-golf-8.jpg",
  }),
  withGallery({
    id: "peugeot-208",
    name: "Peugeot 208",
    brand: "Peugeot",
    model: "208",
    year: 2022,
    fuel: "Essence",
    km: 25000,
    price: 62000,
    category: "Citadines",
    gearbox: "Manuelle",
    power: "100 ch",
    color: "Gris platinium",
    description:
      "Peugeot 208 économique et agile en ville. i-Cockpit 3D, CarPlay/Android Auto, climatisation automatique.",
    img: "/images/cars/peugeot-208.jpg",
  }),
  withGallery({
    id: "audi-q5",
    name: "Audi Q5",
    brand: "Audi",
    model: "Q5",
    year: 2021,
    fuel: "Diesel",
    km: 55000,
    price: 165000,
    category: "SUV / 4x4",
    gearbox: "Automatique",
    power: "204 ch",
    color: "Gris Daytona",
    description:
      "Audi Q5 quattro, confort et polyvalence. Virtual cockpit, hayon électrique, attelage amovible et suspension pilotée.",
    img: "/images/cars/audi-q5.jpg",
  }),
  withGallery({
    id: "mercedes-glc",
    name: "Mercedes GLC",
    brand: "Mercedes",
    model: "GLC",
    year: 2022,
    fuel: "Diesel",
    km: 40000,
    price: 210000,
    category: "SUV / 4x4",
    gearbox: "Automatique",
    power: "194 ch",
    color: "Bleu brillant",
    description:
      "Mercedes GLC 4MATIC, SUV premium sous garantie. MBUX, éclairage d'ambiance 64 couleurs, pack Urban Edition.",
    img: "/images/cars/mercedes-glc.jpg",
  }),
  withGallery({
    id: "porsche-cayman",
    name: "Porsche Cayman",
    brand: "Porsche",
    model: "Cayman",
    year: 2020,
    fuel: "Essence",
    km: 28000,
    price: 350000,
    category: "Sportives",
    gearbox: "Automatique",
    power: "300 ch",
    color: "Noir intense",
    description:
      "Porsche 718 Cayman à l'entretien irréprochable. Boîte PDK, pack Chrono, échappement sport et sièges baquets adaptatifs.",
    img: "/images/cars/porsche-cayman.jpg",
  }),
  withGallery({
    id: "maserati-granturismo",
    name: "Maserati GranTurismo",
    brand: "Maserati",
    model: "GranTurismo",
    year: 2021,
    fuel: "Essence",
    km: 15000,
    price: 420000,
    category: "Sportives",
    gearbox: "Automatique",
    power: "490 ch",
    color: "Gris mat",
    description:
      "Maserati GranTurismo Trofeo d'exception, faible kilométrage. Finition mate, intérieur cuir rouge Poltrona Frau sur mesure.",
    badge: "PREMIUM",
    img: "/images/cars/maserati-granturismo.jpg",
  }),
  withGallery({
    id: "renault-kangoo",
    name: "Renault Kangoo",
    brand: "Renault",
    model: "Kangoo",
    year: 2020,
    fuel: "Diesel",
    km: 80000,
    price: 45000,
    category: "Utilitaires",
    gearbox: "Manuelle",
    power: "95 ch",
    color: "Gris platine",
    description:
      "Renault Kangoo utilitaire fiable et économique. Porte latérale coulissante, cloison de séparation, révision récente.",
    img: "/images/cars/renault-kangoo.jpg",
  }),
  withGallery({
    id: "citroen-berlingo",
    name: "Citroën Berlingo",
    brand: "Citroën",
    model: "Berlingo",
    year: 2021,
    fuel: "Diesel",
    km: 60000,
    price: 52000,
    category: "Utilitaires",
    gearbox: "Manuelle",
    power: "100 ch",
    color: "Blanc banquise",
    description:
      "Citroën Berlingo XL spacieux et pratique pour les professionnels. Grand volume de chargement, galerie de toit, régulateur, Bluetooth.",
    img: "/images/cars/citroen-berlingo.jpg",
  }),
];

export const categoryNames = [
  "Citadines",
  "Berlines",
  "SUV / 4x4",
  "Utilitaires",
  "Sportives",
];

export function brandsOf(vehicles: Vehicle[]): string[] {
  return [...new Set(vehicles.map((v) => v.brand))].sort();
}

export function modelsOf(vehicles: Vehicle[]): string[] {
  return [...new Set(vehicles.map((v) => v.model))].sort();
}

export function vehicleImages(v: Vehicle): string[] {
  return v.images && v.images.length > 0 ? v.images : [v.img];
}

export function formatNumber(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function formatPrice(n: number) {
  return `${formatNumber(n)} DT`;
}
