// Type definitions for our data models

export interface BeautySalon {
  id: string;
  title: string;
  slug: string;
  _yf_slug?: string;
  website?: string;
  telephone?: string;
  address?: string;
  postal_code?: string;
  latitude?: string;
  longitude?: string;
  email?: string;
  opening_hours?: string;
  description?: string;
  service_product?: string;
  reviews?: string;
  average_star?: string;
  
  // Enriched data
  city?: City;
  state?: State;
  categories?: Category[];
  details?: SalonDetail[];
  amenities?: Amenity[];
  payments?: Payment[];
  images?: Image[];
  reviews_data?: Review[];
}

export interface City {
  id: string;
  city: string;
  slug: string;
  state_id: string;
  state?: State;
  salons?: BeautySalon[];
  salonCount?: number;
}

export interface State {
  id: string;
  state: string;
  slug?: string;
  cities?: City[];
  salons?: BeautySalon[];
  salonCount?: number;
}

export interface Category {
  id: string;
  category: string;
  slug?: string;
  salons?: BeautySalon[];
  salonCount?: number;
}

export interface SalonDetail {
  key: string;
  value: string;
  beauty_salon_id: string;
}

export interface Amenity {
  id: string;
  amenity: string;
  beauty_salon_id?: string;
}

export interface Payment {
  id: string;
  payment: string;
  beauty_salon_id?: string;
}

export interface Image {
  beauty_salon_id: string;
  path: string;
}

export interface ImageSlug {
  beauty_salon_id: string;
  _img_slug: string;
}

export interface Review {
  beauty_salon_id: string;
  review: string;
  author?: string;
  time?: string;
  rating_stars?: string;
}

export interface SalonCategory {
  beauty_salon_id: string;
  category_id: string;
}

export interface CityBeautySalon {
  beauty_salon_id: string;
  city_id: string;
}

export interface AmenityBeautySalon {
  beauty_salon_id: string;
  amenity_id: string;
}

export interface PaymentBeautySalon {
  beauty_salon_id: string;
  payment_id: string;
}