

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: 'admin' | 'client';
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  user_id: string;
  service_type: string;
  date: string;
  time: string;
  details: string | null;
  status: 'pending' | 'confirmed' | 'canceled' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  section: string;
  content: any;
  updated_at: string;
  updated_by: string | null;
}

