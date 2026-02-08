import { createClient } from '@supabase/supabase-js';

// Diese Werte müssen Sie durch Ihre eigenen Supabase-Credentials ersetzen
// Erstellen Sie ein kostenloses Konto auf: https://supabase.com
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Database {
  public: {
    Tables: {
      expenses: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          amount: number;
          category: string;
          description: string;
          created_at: string;
          updated_at?: string;
        };
        Insert: Omit<Database['public']['Tables']['expenses']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['expenses']['Insert']>;
      };
      accounts: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          type: string;
          balance: number;
          currency: string;
          last_updated: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['accounts']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['accounts']['Insert']>;
      };
      financing: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string;
          initial_amount: number;
          remaining_amount: number;
          monthly_payment: number;
          start_date: string;
          end_date: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['financing']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['financing']['Insert']>;
      };
      budgets: {
        Row: {
          id: string;
          user_id: string;
          category: string;
          limit: number;
          spent: number;
          period: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['budgets']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['budgets']['Insert']>;
      };
      user_settings: {
        Row: {
          id: string;
          user_id: string;
          monthly_income: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['user_settings']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['user_settings']['Insert']>;
      };
    };
  };
}
