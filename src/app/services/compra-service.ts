import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { CategoriaCompra } from '../shared/models/classes/categoria-compra';
import { Compra, ICompra } from '../shared/models/classes/compra';
import { ListaCompras } from '../shared/models/classes/lista-compras';
import { ControleService } from './controle-service';
import { FaturaService } from '../features/fatura/fatura-service';

@Injectable({
  providedIn: 'root',
})
export class CompraService {
  http = inject(HttpClient);
  controleService = inject(ControleService);
  faturaService = inject(FaturaService);

  categoria_compra = signal(CategoriaCompra.fromCodigo(0));
  listaCompras = signal<ListaCompras>(new ListaCompras());
  compra = signal<Compra>(new Compra());

  detectarFaturaAtiva = effect(() => {
    const fatura = this.faturaService.faturaAtiva();
    if (fatura.nome_fatura) {
      this.listarCompras();
    }
  });

  listarCompras() {
    console.log('Listar Compras');
    this.controleService.load();
    this.http
      .post<ICompra[]>(
        `${this.controleService.API}/compras/por-data`,
        this.faturaService.faturaAtiva().toDTO(),
        {
          headers: this.controleService.headers(),
        }
      )
      .pipe(finalize(() => this.controleService.unload()))
      .subscribe({
        next: (compras) => {
          this.listaCompras.set(new ListaCompras(compras));
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
        `${this.controleService.API}/compras/${compra.fitid}`,
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
  apagarCompra(fitid: string) {
    this.controleService.load();
    this.http
      .delete(`${this.controleService.API}/compras/${fitid}`, {
        headers: this.controleService.headers(),
      })
      .pipe(finalize(() => this.controleService.unload()))
      .subscribe((res) => {
        console.log('Apagar Compra', res);
        this.listarCompras();
      });
  }
  somaCategoria(codigo_categoria_compra: number) {
    return this.listaCompras().somaCategoria(codigo_categoria_compra);
  }
  mudarCategoria(categoria: CategoriaCompra = CategoriaCompra.fromCodigo(0)) {
    this.categoria_compra.set(categoria);
  }
  limparCategoria() {
    this.categoria_compra.set(CategoriaCompra.fromCodigo(0));
  }
}
