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
}

export interface Category {
  id: string;
  name: string;
  count: number;
}
