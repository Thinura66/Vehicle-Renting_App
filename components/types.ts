export interface Vehicle {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: any;
  features: string[];
  location: string;
  description?: string;
  specifications?: {
    engine: string;
    transmission: string;
    fuel: string;
    seats: number;
    year: number;
  };
}

export interface Category {
  id: string;
  name: string;
  count: number;
}
