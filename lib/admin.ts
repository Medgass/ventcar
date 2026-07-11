export type VehicleStatus = "Disponible" | "Réservé" | "Vendu";

export const vehicleStatuses: Record<string, VehicleStatus> = {
  "audi-a4": "Disponible",
  "bmw-serie-3": "Réservé",
  "mercedes-classe-c": "Disponible",
  "range-rover-evoque": "Vendu",
  "volkswagen-golf-8": "Disponible",
  "peugeot-208": "Disponible",
  "audi-q5": "Réservé",
  "mercedes-glc": "Disponible",
  "porsche-cayman": "Disponible",
  "maserati-granturismo": "Réservé",
  "renault-kangoo": "Vendu",
  "citroen-berlingo": "Disponible",
};

export const monthlySales = [
  { month: "Fév", value: 12 },
  { month: "Mar", value: 18 },
  { month: "Avr", value: 15 },
  { month: "Mai", value: 22 },
  { month: "Juin", value: 26 },
  { month: "Juil", value: 19 },
];

export type AdminMessage = {
  id: number;
  name: string;
  initials: string;
  gradient: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
};

export const messages: AdminMessage[] = [
  {
    id: 1,
    name: "Amine K.",
    initials: "AK",
    gradient: "from-violet-500 to-fuchsia-500",
    subject: "Essai de l'Audi A4",
    preview:
      "Bonjour, je souhaiterais essayer l'Audi A4 ce samedi matin si possible…",
    time: "Il y a 12 min",
    unread: true,
  },
  {
    id: 2,
    name: "Sarra M.",
    initials: "SM",
    gradient: "from-sky-500 to-indigo-500",
    subject: "Question financement",
    preview:
      "Est-il possible d'avoir une simulation de financement sur 60 mois pour la BMW…",
    time: "Il y a 1 h",
    unread: true,
  },
  {
    id: 3,
    name: "Yassine B.",
    initials: "YB",
    gradient: "from-orange-400 to-rose-500",
    subject: "Reprise de mon véhicule",
    preview:
      "Je vends ma Golf 7 de 2019, proposez-vous un service de reprise ?",
    time: "Il y a 3 h",
    unread: true,
  },
  {
    id: 4,
    name: "Nour H.",
    initials: "NH",
    gradient: "from-emerald-500 to-teal-500",
    subject: "Disponibilité Range Rover",
    preview:
      "Le Range Rover Evoque est-il toujours disponible ? Je suis très intéressée…",
    time: "Hier",
    unread: false,
  },
  {
    id: 5,
    name: "Karim T.",
    initials: "KT",
    gradient: "from-amber-500 to-orange-500",
    subject: "Documents pour l'achat",
    preview:
      "Quels documents dois-je préparer pour finaliser l'achat de la Classe C ?",
    time: "Hier",
    unread: false,
  },
];
