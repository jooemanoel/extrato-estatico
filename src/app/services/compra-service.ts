import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Compra } from '../shared/models/interfaces/compra';
import { Mock } from '../shared/utils/mock';

@Injectable({
  providedIn: 'root',
})
export class CompraService {
  carregando = true;
  compras = signal<Compra[]>([]);
  compra = signal<Compra>(Mock.compraVazia());
  private readonly API = 'https://extrato-api-express.vercel.app/compras';
  constructor(private http: HttpClient) {}
  listarCompras() {
    this.http.get<Compra[]>(this.API).subscribe((compras) => {
      console.log('Listar Compras', compras);
      this.carregando = false;
      this.compras.set(compras);
    });
  }
  inserirCompra(compra: Compra) {
    this.carregando = true;
    this.http.post<Compra>(this.API, compra).subscribe((res) => {
      console.log('Inserir Compra', res);
      this.listarCompras();
    });
  }
  apagarCompra(codigo_compra: number) {
    this.carregando = true;
    this.http.delete(`${this.API}/${codigo_compra}`).subscribe((res) => {
      console.log('Apagar Compra', res);
      this.listarCompras();
    });
  }
  editarCompra(compra: Compra, codigo_compra: number) {
    this.carregando = true;
    this.http.put<Compra>(`${this.API}/${codigo_compra}`, compra).subscribe((res) => {
      console.log('Editar Compra', res);
      this.listarCompras();
    });
  }
}
