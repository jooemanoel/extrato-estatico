import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Compra } from '../shared/models/interfaces/compra';
import { Mock } from '../shared/utils/mock';
import { ControleService } from './controle-service';

@Injectable({
  providedIn: 'root',
})
export class CompraService {
  openReloadSnack = signal(0);
  categoriaCompra: Record<number, { nome: string; icon: string }> = {
    1: { nome: 'MERCADO', icon: 'shopping_cart' },
    2: { nome: 'SAÚDE', icon: 'local_hospital' },
    3: { nome: 'TRANSPORTE', icon: 'directions_bus' },
    4: { nome: 'LAZER', icon: 'mood' },
    5: { nome: 'VARIEDADES', icon: 'shopping_bag' },
    6: { nome: 'EDUCAÇÃO', icon: 'school' },
    7: { nome: 'INTERNET', icon: 'wifi_calling_bar_3' },
  };
  total_compras = signal(0);
  codigo_categoria_compra = signal(0);
  compras = signal<Compra[]>([]);
  compra = signal<Compra>(Mock.compraVazia());
  constructor(
    private http: HttpClient,
    private controleService: ControleService
  ) {}
  listarCompras() {
    this.http
      .get<Compra[]>(`${this.controleService.API}/compras`, {
        headers: this.controleService.headers(),
      })
      .subscribe({
        next: (compras) => {
          this.compras.set(compras);
          this.total_compras.set(
            compras.reduce((acc, x) => acc + parseFloat(x.valor_compra), 0)
          );
          this.controleService.carregando.set(false);
        },
        error: () => {
          this.openReloadSnack.update((x) => x + 1);
        },
      });
  }
  inserirCompra(compra: Compra) {
    this.controleService.carregando.set(true);
    this.http
      .post<Compra>(`${this.controleService.API}/compras`, compra, {
        headers: this.controleService.headers(),
      })
      .subscribe((res) => {
        this.listarCompras();
      });
  }
  apagarCompra(codigo_compra: number) {
    this.controleService.carregando.set(true);
    this.http
      .delete(`${this.controleService.API}/compras/${codigo_compra}`, {
        headers: this.controleService.headers(),
      })
      .subscribe((res) => {
        console.log('Apagar Compra', res);
        this.listarCompras();
      });
  }
  editarCompra(compra: Compra) {
    this.controleService.carregando.set(true);
    this.http
      .put<Compra>(
        `${this.controleService.API}/compras/${compra.codigo_compra}`,
        compra,
        {
          headers: this.controleService.headers(),
        }
      )
      .subscribe((res) => {
        console.log('Editar Compra', res);
        this.listarCompras();
      });
  }
  somaCategoria(categoria: number) {
    if (!categoria) return this.total_compras();
    return this.compras()
      .filter((x) => x.codigo_categoria_compra == categoria)
      .reduce((acc, x) => acc + parseFloat(x.valor_compra), 0);
  }
}
