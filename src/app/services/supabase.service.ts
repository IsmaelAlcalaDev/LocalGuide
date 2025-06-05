import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      import.meta.env['VITE_SUPABASE_URL'],
      import.meta.env['VITE_SUPABASE_ANON_KEY']
    );
  }

  get client() {
    return this.supabase;
  }

  async signIn(email: string, password: string) {
    return await this.supabase.auth.signInWithPassword({
      email,
      password
    });
  }

  async signUp(email: string, password: string, userData: any) {
    return await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
  }

  async signOut() {
    return await this.supabase.auth.signOut();
  }

  async getSession() {
    return await this.supabase.auth.getSession();
  }

  async getUser() {
    const { data } = await this.supabase.auth.getUser();
    return data.user;
  }
}