// auth.service.ts
import { Injectable } from '@angular/core';
import { createClient, Session, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://pzvzcautkzwqvvppsgdn.supabase.co';
const SUPABASE_ANON_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6dnpjYXV0a3p3cXZ2cHBzZ2RuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNjE2MTQsImV4cCI6MjA2NzgzNzYxNH0.7zRyWu4ulzfAkx5ARE6PRV4eEUJMoSambpfdSAJmxCE`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase!: SupabaseClient;
  private session: Session | null = null;
  private sessionLoaded = false;
  constructor() {
    this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
    // Atualiza sessão em eventos de login/logout
    this.supabase.auth.onAuthStateChange((_event, session) => {
      this.session = session;
    });
    this.loadSession();
  }
  private async loadSession() {
    // Aguarda a primeira tentativa de carregar a sessão
    if (!this.sessionLoaded) {
      const { data } = await this.supabase.auth.getSession();
      this.session = data.session;
      this.sessionLoaded = true;
    }
  }
  async login(email: string, password: string) {
    await this.loadSession();
    if (this.session) {
      console.log('Já logado.', this.getUser());
      return;
    }
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error('Erro ao logar:', error.message);
      return;
    }
    this.session = data.session;
    console.log('Logado com token:', data.session?.access_token);
  }
  getToken(): string | null {
    return this.session?.access_token ?? null;
  }
  getUser() {
    return this.session?.user ?? null;
  }
  logout() {
    this.supabase.auth.signOut();
    this.session = null;
  }
  isLoggedIn(): boolean {
    return !!this.session;
  }
}
