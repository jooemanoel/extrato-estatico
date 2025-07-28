import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Compra } from '../shared/utils/interfaces/compra';

@Injectable({
  providedIn: 'root',
})
export class CompraService {
  compras = signal<Compra[]>([]);
  private readonly API = 'https://extrato-api-express.vercel.app/compras';
  constructor(private http: HttpClient) {}
  listarCompras() {
    return this.http.get<Compra[]>(this.API).subscribe((compras) => {
      console.log(compras);
      this.compras.set(compras);
    });
  }
}
