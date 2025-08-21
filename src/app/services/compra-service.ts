import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { ListaCompras } from '../shared/models/classes/lista-compras';
import { Compra, ICompra } from '../shared/models/interfaces/compra';
import { ControleService } from './controle-service';
import { FaturaService } from './fatura-service';
import { Timestamp } from '../shared/models/classes/timestamp';

@Injectable({
  providedIn: 'root',
})
export class CompraService {
  categoriaCompra: Record<number, { nome: string; icon: string }> = {
    1: { nome: 'MERCADO', icon: 'shopping_cart' },
    2: { nome: 'SAÚDE', icon: 'local_hospital' },
    3: { nome: 'TRANSPORTE', icon: 'directions_bus' },
    4: { nome: 'LAZER', icon: 'mood' },
    5: { nome: 'VARIEDADES', icon: 'shopping_bag' },
    6: { nome: 'EDUCAÇÃO', icon: 'school' },
    7: { nome: 'INTERNET', icon: 'wifi_calling_bar_3' },
  };
  codigo_categoria_compra = signal(0);
  compras = signal<ListaCompras>(new ListaCompras());
  compra = signal<Compra>(new Compra());
  private http = inject(HttpClient);
  private controleService = inject(ControleService);
  private faturaService = inject(FaturaService);
  faturaAvulsa() {
    const dataAtual = new Date();
    const data30DiasAtras = new Date(dataAtual);
    data30DiasAtras.setDate(data30DiasAtras.getDate() - 30);
    return {
      data_abertura_fatura: Timestamp.fromDate(data30DiasAtras).toDateString(),
      data_fechamento_fatura: Timestamp.fromDate(dataAtual).toDateString(),
    };
  }
  listarCompras() {
    this.controleService.load();
    this.http
      .post<ICompra[]>(
        `${this.controleService.API}/compras/por-data`,
        this.faturaService.faturaAtiva().codigo_fatura
          ? this.faturaService.faturaAtiva()
          : this.faturaAvulsa(),
        {
          headers: this.controleService.headers(),
        }
      )
      .pipe(finalize(() => this.controleService.unload()))
      .subscribe({
        next: (compras) => {
          this.compras.set(new ListaCompras(compras));
        },
        error: (res) => {
          this.controleService.showErrorMessage(
            res?.error?.message ?? 'Erro desconhecido'
          );
        },
      });
  }
  inserirCompra(compra: ICompra) {
    this.controleService.load();
    this.http
      .post<ICompra>(`${this.controleService.API}/compras`, compra, {
        headers: this.controleService.headers(),
      })
      .pipe(finalize(() => this.controleService.unload()))
      .subscribe((res) => {
        console.log('Inserir Compra', res);
        this.listarCompras();
      });
  }
  editarCompra(compra: ICompra) {
    this.controleService.load();
    this.http
      .put<ICompra>(
        `${this.controleService.API}/compras/${compra.codigo_compra}`,
        compra,
        {
          headers: this.controleService.headers(),
        }
      )
      .pipe(finalize(() => this.controleService.unload()))
      .subscribe((res) => {
        console.log('Editar Compra', res);
        this.listarCompras();
      });
  }
  apagarCompra(codigo_compra: number) {
    this.controleService.load();
    this.http
      .delete(`${this.controleService.API}/compras/${codigo_compra}`, {
        headers: this.controleService.headers(),
      })
      .pipe(finalize(() => this.controleService.unload()))
      .subscribe((res) => {
        console.log('Apagar Compra', res);
        this.listarCompras();
      });
  }
  somaCategoria(codigo_categoria_compra: number) {
    return this.compras().somaCategoria(codigo_categoria_compra);
  }
}
