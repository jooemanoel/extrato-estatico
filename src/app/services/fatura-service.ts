import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { IFatura } from '../shared/models/interfaces/fatura';
import { Mock } from '../shared/utils/mock';
import { ControleService } from './controle-service';

@Injectable({
  providedIn: 'root',
})
export class FaturaService {
  private controleService = inject(ControleService);
  private http = inject(HttpClient);
  faturas = signal<IFatura[]>([]);
  fatura = signal<IFatura>(Mock.faturaVazia());
  faturaAtiva = signal<IFatura>(Mock.faturaVazia());
  validarFatura() {
    const stringFatura = localStorage.getItem('extrato-estatico-fatura');
    if (stringFatura) this.faturaAtiva.set(JSON.parse(stringFatura));
  }
  listarFaturas() {
    this.controleService.load();
    this.http
      .get<IFatura[]>(`${this.controleService.API}/faturas`, {
        headers: this.controleService.headers(),
      })
      .pipe(finalize(() => this.controleService.unload()))
      .subscribe({
        next: (faturas) => {
          this.faturas.set(faturas);
        },
        error: (res) => {
          this.controleService.showErrorMessage(
            res?.error?.message ?? 'Erro desconhecido'
          );
        },
      });
  }
  inserirFatura(fatura: IFatura) {
    this.controleService.load();
    this.http
      .post<IFatura>(`${this.controleService.API}/faturas`, fatura, {
        headers: this.controleService.headers(),
      })
      .pipe(finalize(() => this.controleService.unload()))
      .subscribe((res) => {
        console.log('Inserir fatura', res);
        this.listarFaturas();
      });
  }
  editarFatura(fatura: IFatura) {
    this.controleService.load();
    this.http
      .put<IFatura>(
        `${this.controleService.API}/faturas/${fatura.codigo_fatura}`,
        fatura,
        {
          headers: this.controleService.headers(),
        }
      )
      .pipe(finalize(() => this.controleService.unload()))
      .subscribe((res) => {
        console.log('Editar fatura', res);
        this.listarFaturas();
      });
  }
  apagarFatura(codigo_fatura: number) {
    this.controleService.load();
    this.http
      .delete(`${this.controleService.API}/faturas/${codigo_fatura}`, {
        headers: this.controleService.headers(),
      })
      .pipe(finalize(() => this.controleService.unload()))
      .subscribe((res) => {
        console.log('Apagar fatura', res);
        this.listarFaturas();
      });
  }
  limparFaturaAtiva() {
    this.faturaAtiva.set(Mock.faturaVazia());
    localStorage.removeItem('extrato-estatico-fatura');
  }
}
