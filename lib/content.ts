import { createHash } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { defaultVehicles, type Vehicle } from "./vehicles";

export type SiteContent = {
  identite: {
    nomPartie1: string;
    nomPartie2: string;
    slogan: string;
    logo: string;
  };
  menu: { label: string; lien: string }[];
  hero: {
    titreLigne1: string;
    titreLigne2: string;
    motDegrade: string;
    sousTitre: string;
    boutonPrincipal: string;
    boutonSecondaire: string;
    boutonAnnonce: string;
    image: string;
    clients: string;
    note: string;
  };
  sectionVedette: { titre: string; lien: string };
  sectionCategories: {
    titre: string;
    lien: string;
    liste: { nom: string; nombre: string; image: string }[];
  };
  banniere: {
    surtitre: string;
    titreAvant: string;
    motDegrade: string;
    titreApres: string;
    avantages: string[];
    bouton: string;
    image: string;
  };
  sectionAvis: {
    titre: string;
    lien: string;
    liste: { texte: string; nom: string; ville: string }[];
  };
  footer: {
    description: string;
    colonnes: { titre: string; liens: { label: string; lien: string }[] }[];
    copyright: string;
  };
  contact: {
    telephone: string;
    email: string;
    adresse: string;
    horaires: string;
  };
  pageVehicules: { titre: string; motDegrade: string; sousTitre: string };
  pageServices: {
    titre: string;
    motDegrade: string;
    sousTitre: string;
    services: { titre: string; description: string; points: string[] }[];
  };
  pageAPropos: {
    titre: string;
    motDegrade: string;
    sousTitre: string;
    histoireTitre: string;
    histoire1: string;
    histoire2: string;
    image: string;
    stats: { valeur: string; label: string }[];
    valeurs: { titre: string; description: string }[];
  };
  pageAnnonce: {
    titre: string;
    motDegrade: string;
    sousTitre: string;
    avantages: { titre: string; description: string }[];
    image: string;
  };
  vehicules: Vehicle[];
  admin: { email: string; motDePasseHash: string; adresse: string };
};

export function sha256(s: string) {
  return createHash("sha256").update(s).digest("hex");
}

export function adminToken(admin: SiteContent["admin"]) {
  return sha256(`av-session:${admin.email}:${admin.motDePasseHash}`);
}

export const DEFAULT_CONTENT: SiteContent = {
  identite: {
    nomPartie1: "AUTO",
    nomPartie2: "VENTE",
    slogan: "Trouvez la voiture de vos rêves",
    logo: "/images/logo.png",
  },
  menu: [
    { label: "Accueil", lien: "/" },
    { label: "Véhicules", lien: "/vehicules" },
    { label: "Services", lien: "/services" },
    { label: "À propos", lien: "/a-propos" },
    { label: "Contact", lien: "/contact" },
  ],
  hero: {
    titreLigne1: "Trouvez la voiture",
    titreLigne2: "de vos",
    motDegrade: "rêves",
    sousTitre: "Des véhicules sélectionnés avec soin, au meilleur prix pour vous.",
    boutonPrincipal: "Voir les véhicules",
    boutonSecondaire: "Nous contacter",
    boutonAnnonce: "Déposer une annonce",
    image: "/images/hero-car.jpg",
    clients: "+2K clients satisfaits",
    note: "4.8/5",
  },
  sectionVedette: { titre: "Nos véhicules en vedette", lien: "Voir tous les véhicules" },
  sectionCategories: {
    titre: "Catégories populaires",
    lien: "Voir toutes les catégories",
    liste: [
      { nom: "Citadines", nombre: "12 véhicules", image: "/images/cars/peugeot-208.jpg" },
      { nom: "Berlines", nombre: "18 véhicules", image: "/images/cars/audi-a4.jpg" },
      { nom: "SUV / 4x4", nombre: "24 véhicules", image: "/images/cars/range-rover-evoque.jpg" },
      { nom: "Utilitaires", nombre: "8 véhicules", image: "/images/cars/renault-kangoo.jpg" },
      { nom: "Sportives", nombre: "6 véhicules", image: "/images/cars/maserati-granturismo.jpg" },
    ],
  },
  banniere: {
    surtitre: "Offre spéciale",
    titreAvant: "Vendez votre voiture",
    motDegrade: "rapidement",
    titreApres: "et en toute sécurité",
    avantages: ["Annonce gratuite", "Visibilité maximale", "Acheteurs sérieux"],
    bouton: "Déposer une annonce gratuitement",
    image: "/images/offer-car.jpg",
  },
  sectionAvis: {
    titre: "Ils nous font confiance",
    lien: "Voir tous les avis",
    liste: [
      {
        texte:
          "Service impeccable ! J'ai trouvé la voiture que je cherchais au meilleur prix. Je recommande Auto Vente.",
        nom: "Amine K.",
        ville: "Tunis",
      },
      {
        texte:
          "Équipe professionnelle et à l'écoute. Toutes les démarches ont été simples et rapides.",
        nom: "Sarra M.",
        ville: "Sousse",
      },
      {
        texte: "Voitures de qualité et garanties. Très satisfait de mon achat.",
        nom: "Yassine B.",
        ville: "Monastir",
      },
    ],
  },
  footer: {
    description: "Votre partenaire de confiance pour l'achat et la vente de voitures.",
    colonnes: [
      {
        titre: "Navigation",
        liens: [
          { label: "Accueil", lien: "/" },
          { label: "Véhicules", lien: "/vehicules" },
          { label: "Services", lien: "/services" },
          { label: "À propos", lien: "/a-propos" },
          { label: "Contact", lien: "/contact" },
        ],
      },
      {
        titre: "Services",
        liens: [
          { label: "Vente de voiture", lien: "/services" },
          { label: "Reprise", lien: "/services" },
          { label: "Financement", lien: "/services" },
          { label: "Garantie", lien: "/services" },
          { label: "Assistance", lien: "/services" },
        ],
      },
      {
        titre: "Informations",
        liens: [
          { label: "À propos", lien: "/a-propos" },
          { label: "Conditions générales", lien: "/a-propos" },
          { label: "Confidentialité", lien: "/a-propos" },
          { label: "FAQ", lien: "/contact" },
        ],
      },
    ],
    copyright: "© 2024 Auto Vente. Tous droits réservés.",
  },
  contact: {
    telephone: "+216 58 123 456",
    email: "contact@autovente.tn",
    adresse: "Monastir, Tunisie",
    horaires: "Lun – Sam : 9h à 18h",
  },
  pageVehicules: {
    titre: "Nos",
    motDegrade: "véhicules",
    sousTitre: "Des véhicules inspectés et garantis, sélectionnés avec soin pour vous.",
  },
  pageServices: {
    titre: "Nos",
    motDegrade: "services",
    sousTitre:
      "De la recherche au financement, Auto Vente vous accompagne à chaque étape de votre projet automobile.",
    services: [
      {
        titre: "Vente de voiture",
        description:
          "Vendez votre véhicule rapidement grâce à notre plateforme et notre réseau d'acheteurs sérieux.",
        points: ["Annonce gratuite", "Estimation offerte", "Visibilité maximale"],
      },
      {
        titre: "Reprise",
        description:
          "Nous reprenons votre ancien véhicule au meilleur prix lors de l'achat de votre nouvelle voiture.",
        points: ["Offre immédiate", "Démarches simplifiées", "Paiement sécurisé"],
      },
      {
        titre: "Financement",
        description:
          "Des solutions de financement adaptées à votre budget, en partenariat avec les meilleures banques.",
        points: ["Taux compétitifs", "Réponse sous 48h", "Mensualités flexibles"],
      },
      {
        titre: "Garantie",
        description:
          "Tous nos véhicules sont contrôlés et garantis pour que vous rouliez en toute sérénité.",
        points: ["Contrôle 120 points", "Garantie 12 mois", "Extension possible"],
      },
      {
        titre: "Assistance",
        description:
          "Une équipe disponible 7j/7 pour vous accompagner avant, pendant et après votre achat.",
        points: ["Support 7j/7", "Dépannage rapide", "Suivi personnalisé"],
      },
    ],
  },
  pageAPropos: {
    titre: "À propos d'",
    motDegrade: "Auto Vente",
    sousTitre:
      "Depuis 2014, nous aidons les Tunisiens à acheter et vendre leur voiture en toute confiance.",
    histoireTitre: "Notre histoire",
    histoire1:
      "Née à Monastir, Auto Vente est partie d'un constat simple : acheter une voiture d'occasion ne devrait jamais être un pari. Nous avons donc construit une plateforme où chaque véhicule est vérifié, chaque prix est juste et chaque client est accompagné.",
    histoire2:
      "Aujourd'hui, plus de 2 000 clients nous font confiance pour trouver la voiture de leurs rêves ou vendre la leur en quelques jours, partout en Tunisie.",
    image: "/images/hero-car.jpg",
    stats: [
      { valeur: "+2 000", label: "Clients satisfaits" },
      { valeur: "+500", label: "Véhicules vendus" },
      { valeur: "4.8/5", label: "Note moyenne" },
      { valeur: "10 ans", label: "D'expérience" },
    ],
    valeurs: [
      {
        titre: "Confiance",
        description:
          "Chaque véhicule est inspecté sur 120 points de contrôle avant d'être mis en vente.",
      },
      {
        titre: "Transparence",
        description:
          "Historique, kilométrage, état réel : vous savez exactement ce que vous achetez.",
      },
      {
        titre: "Accompagnement",
        description:
          "De l'essai à la remise des clés, notre équipe vous guide à chaque étape.",
      },
      {
        titre: "Qualité",
        description:
          "Une sélection exigeante de véhicules récents, garantis et au juste prix.",
      },
    ],
  },
  pageAnnonce: {
    titre: "Vendez votre voiture",
    motDegrade: "rapidement",
    sousTitre:
      "Remplissez le formulaire ci-dessous : votre annonce est vérifiée puis publiée sous 24h.",
    avantages: [
      {
        titre: "Annonce gratuite",
        description: "Publiez votre annonce sans aucun frais, sans engagement.",
      },
      {
        titre: "Visibilité maximale",
        description: "Votre véhicule vu par des milliers d'acheteurs chaque jour.",
      },
      {
        titre: "Acheteurs sérieux",
        description: "Nous filtrons les contacts pour vous éviter les curieux.",
      },
      {
        titre: "Vente rapide",
        description: "En moyenne, un véhicule se vend en moins de 15 jours.",
      },
    ],
    image: "/images/offer-car.jpg",
  },
  vehicules: defaultVehicles,
  admin: {
    email: "admin@autovente.tn",
    motDePasseHash: sha256("admin123"),
    adresse: "Monastir, Tunisie",
  },
};

const CONTENT_PATH = path.join(process.cwd(), "data", "site-content.json");
let memoryContent: SiteContent | null = null;

function mergeContent(parsed: Partial<SiteContent> | null | undefined): SiteContent {
  return {
    ...DEFAULT_CONTENT,
    ...(parsed ?? {}),
    admin: { ...DEFAULT_CONTENT.admin, ...(parsed?.admin ?? {}) },
  } as SiteContent;
}

export async function readContent(): Promise<SiteContent> {
  if (memoryContent) {
    return memoryContent;
  }

  try {
    const raw = await fs.readFile(CONTENT_PATH, "utf8");
    const parsed = JSON.parse(raw);
    memoryContent = mergeContent(parsed);
    return memoryContent;
  } catch {
    memoryContent = mergeContent(undefined);

    try {
      await fs.mkdir(path.dirname(CONTENT_PATH), { recursive: true });
      await fs.writeFile(CONTENT_PATH, JSON.stringify(memoryContent, null, 2), "utf8");
    } catch {
      // Ignore filesystem write errors in serverless environments such as Vercel.
    }

    return memoryContent;
  }
}

export async function writeContent(content: SiteContent): Promise<void> {
  memoryContent = content;

  try {
    await fs.mkdir(path.dirname(CONTENT_PATH), { recursive: true });
    await fs.writeFile(CONTENT_PATH, JSON.stringify(content, null, 2), "utf8");
  } catch {
    // Ignore filesystem write errors in serverless environments such as Vercel.
  }
}
