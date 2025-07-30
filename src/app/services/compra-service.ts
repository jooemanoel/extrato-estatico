import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Compra } from '../shared/models/interfaces/compra';
import { Mock } from '../shared/utils/mock';

@Injectable({
  providedIn: 'root',
})
export class CompraService {
  categoriaCompra: Record<number, {nome: string, icon: string}> = {
    1: {nome: 'MERCADO', icon: 'shopping_cart'},
    2: {nome: 'SAÚDE', icon: 'local_hospital'},
    3: {nome: 'TRANSPORTE', icon: 'directions_bus'},
    4: {nome: 'LAZER', icon: 'mood'},
    5: {nome: 'VARIEDADES', icon: 'shopping_bag'},
    6: {nome: 'EDUCAÇÃO', icon: 'school'},
    7: {nome: 'INTERNET', icon: 'wifi_calling_bar_3'}
  };
  carregando = signal(true);
  total_compras = signal(0);
  codigo_categoria_compra = signal(0);
  compras = signal<Compra[]>([]);
  compra = signal<Compra>(Mock.compraVazia());
  private readonly API = 'https://extrato-api-express.vercel.app/compras';
  constructor(private http: HttpClient) {}
  listarCompras() {
    this.http.get<Compra[]>(this.API).subscribe((compras) => {
      this.compras.set(compras);
      this.total_compras.set(compras.reduce((acc, x) => acc + parseFloat(x.valor_compra), 0));
      this.carregando.set(false);
    });
  }
  inserirCompra(compra: Compra) {
    this.carregando.set(true);
    this.http.post<Compra>(this.API, compra).subscribe((res) => {
      this.listarCompras();
    });
  }
  apagarCompra(codigo_compra: number) {
    this.carregando.set(true);
    this.http.delete(`${this.API}/${codigo_compra}`).subscribe((res) => {
      console.log('Apagar Compra', res);
      this.listarCompras();
    });
  }
  editarCompra(compra: Compra) {
    this.carregando.set(true);
    this.http
      .put<Compra>(`${this.API}/${compra.codigo_compra}`, compra)
      .subscribe((res) => {
        console.log('Editar Compra', res);
        this.listarCompras();
      });
  }
}
