export interface TransportProviderApi {
  id: number;
  profile_pic: string | null;
  name: string;
  email: string;
  phone: string | null;
  location: string | null;
  is_verified: boolean;
  rider_status: string;
  license: string | null;
  license_expiry: string | null;
  license_type: string | null;
  year_of_experience: number;
  vehicle_type: string | null;
  vehicle_year: number | null;
  average_rating: number;
  total_reviews: number;
}

export interface VeterinarianApi {
  id: number;
  profile_pic: string | null;
  name: string;
  email: string;
  phone: string | null;
  location: string | null;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  clinic_name: string | null;
  clinic_location: string | null;
  clinic_latitude: string | null;
  clinic_longitude: string | null;
  specializations: string[];
  vetenary_license: string | null;
  nid: string | null;
  certifications: string[];
  professional_bio: string | null;
  is_verified: boolean;
  year_of_experience: number;
  appointment_booking_fee: string;
  average_rating: number;
  total_reviews: number;
  reviews_list: any[];
}

export interface SellerApi {
  id: number;
  profile_pic: string | null;
  name: string;
  email: string;
  phone: string | null;
  location: string | null;
  delivery_address: string | null;
  delivery_latitude: string | null;
  delivery_longitude: string | null;
  role: string;
  is_active: boolean;
  onesignal_id: string | null;
  created_at: string;
  updated_at: string;
  business_name: string | null;
  business_location: string | null;
  business_latitude: string | null;
  business_longitude: string | null;
  average_rating: number;
  total_reviews: number;
  reviews_list: any[];
  // is_verified isn't in this sample response, but keep optional in case backend adds it
  is_verified?: boolean;
}
