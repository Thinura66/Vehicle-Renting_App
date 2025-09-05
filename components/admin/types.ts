// Admin-specific types and interfaces
export interface AdminUser {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  address: string;
  role: 'admin' | 'user';
  profilePhoto: string;
  joinDate: string;
  status: 'active' | 'suspended' | 'inactive';
  totalBookings: number;
  lastLogin: string;
}

export interface AdminVehicle {
  id: string;
  name: string;
  type: string;
  category: 'car' | 'bike' | 'scooter' | 'bicycle';
  brand: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  price: number;
  priceUnit: 'hour' | 'day' | 'week';
  location: string;
  features: string[];
  availability: 'available' | 'rented' | 'maintenance' | 'out-of-service';
  images: string[];
  description: string;
  ownerId: string;
  totalBookings: number;
  rating: number;
  createdDate: string;
  lastMaintenance: string;
}

export interface AdminBooking {
  id: string;
  userId: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'ongoing' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdDate: string;
  notes: string;
}

export interface AdminStats {
  totalUsers: number;
  totalVehicles: number;
  totalBookings: number;
  activeBookings: number;
  pendingBookings: number;
  totalRevenue: number;
  monthlyRevenue: number;
  topVehicles: {
    id: string;
    name: string;
    bookings: number;
  }[];
  recentUsers: AdminUser[];
  recentBookings: AdminBooking[];
}

export interface AdminFormData {
  vehicle: Omit<AdminVehicle, 'id' | 'totalBookings' | 'rating' | 'createdDate'>;
  user: Omit<AdminUser, 'id' | 'totalBookings' | 'joinDate' | 'lastLogin'>;
}

export type AdminPage = 'dashboard' | 'vehicles' | 'users' | 'bookings' | 'settings';

export interface AdminNavigation {
  currentPage: AdminPage;
  setCurrentPage: (page: AdminPage) => void;
}
