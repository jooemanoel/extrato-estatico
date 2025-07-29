// supabase-service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  listarCompras(): Observable<any> {
    const url = 'https://pzvzcautkzwqvvppsgdn.supabase.co/functions/v1/compras-list'
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(url, { headers: headers });
  }
}
