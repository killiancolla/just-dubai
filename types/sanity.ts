export type SanityImage = {
  asset: { _ref: string; _type: string };
  alt?: string;
};

export type LocaleString = { fr?: string; en?: string; ru?: string };
export type Locale = keyof LocaleString;

export interface Vehicle {
  _id: string;
  name: string;
  slug: { current: string };
  brand: string;
  model: string;
  year: number;
  fuel: string;
  transmission?: string;
  seats?: number;
  pricePerDay?: number;
  mainPhoto: SanityImage;
  photos?: SanityImage[];
  description?: { fr?: string; en?: string; ru?: string };
}

export interface Yacht {
  _id: string;
  name: string;
  slug: { current: string };
  /** Longueur en pieds ; convertie en mètres à l'affichage pour fr et ru. */
  lengthFeet: number;
  capacity: number;
  pricePerHour?: number;
  pricePerDay?: number;
  mainPhoto: SanityImage;
  photos?: SanityImage[];
  amenities?: string[];
  description?: { fr?: string; en?: string; ru?: string };
}

export interface BlogPost {
  _id: string;
  title: LocaleString;
  slug: { current: string };
  publishedAt: string;
  coverImage: SanityImage;
  excerpt: LocaleString;
  categories: string[];
}
