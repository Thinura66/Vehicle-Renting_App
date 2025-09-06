export interface Booking {
  id: string;
  vehicleId: number;
  vehicleName: string;
  vehicleImage: any;
  vehicleCategory: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  numberOfDays: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'active';
  bookingDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  features: string[];
}

export interface BookingStatus {
  label: string;
  color: string;
  backgroundColor: string;
}
