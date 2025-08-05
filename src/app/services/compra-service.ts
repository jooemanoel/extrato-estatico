import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Compra } from '../shared/models/interfaces/compra';
import { formatarDateParaString } from '../shared/utils/functions';
import { Mock } from '../shared/utils/mock';
import { ControleService } from './controle-service';
import { FaturaService } from './fatura-service';
import { finalize } from 'rxjs';

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
  compras = signal<Compra[]>([]);
  compra = signal<Compra>(Mock.compraVazia());
  constructor(
    private http: HttpClient,
    private controleService: ControleService,
    private faturaService: FaturaService
  ) {}
  faturaAvulsa() {
    const dataAtual = new Date();
    const data30DiasAtras = new Date(dataAtual);
    data30DiasAtras.setDate(data30DiasAtras.getDate() - 30);
    return {
      data_abertura_fatura: formatarDateParaString(data30DiasAtras),
      data_fechamento_fatura: formatarDateParaString(dataAtual),
    };
  }
  listarCompras() {
    this.controleService.load();
    this.http
      .post<Compra[]>(
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
          this.compras.set(compras);
        },
        error: (res) => {
          this.controleService.showErrorMessage(
            res?.error?.message ?? 'Erro desconhecido'
          );
        },
      });
  }
  inserirCompra(compra: Compra) {
    this.controleService.load();
    this.http
      .post<Compra>(`${this.controleService.API}/compras`, compra, {
        headers: this.controleService.headers(),
      })
      .pipe(finalize(() => this.controleService.unload()))
      .subscribe((res) => {
        console.log('Inserir Compra', res);
        this.listarCompras();
      });
  }
  editarCompra(compra: Compra) {
    this.controleService.load();
    this.http
      .put<Compra>(
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
  somaCategoria(categoria: number) {
    return this.compras()
      .filter((x) => !categoria || x.codigo_categoria_compra === categoria)
      .reduce((acc, x) => acc + parseFloat(x.valor_compra), 0);
  }
}
