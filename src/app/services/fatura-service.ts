import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { Fatura } from '../shared/models/interfaces/fatura';
import { Mock } from '../shared/utils/mock';
import { ControleService } from './controle-service';

@Injectable({
  providedIn: 'root',
})
export class FaturaService {
  faturas = signal<Fatura[]>([]);
  fatura = signal<Fatura>(Mock.faturaVazia());
  faturaAtiva = signal<Fatura>(Mock.faturaVazia());
  constructor(
    private http: HttpClient,
    private controleService: ControleService
  ) {}
  validarFatura() {
    const stringFatura = localStorage.getItem('extrato-estatico-fatura');
    if (stringFatura) this.faturaAtiva.set(JSON.parse(stringFatura));
  }
  listarFaturas() {
    this.controleService.load();
    this.http
      .get<Fatura[]>(`${this.controleService.API}/faturas`, {
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
  inserirFatura(fatura: Fatura) {
    this.controleService.load();
    this.http
      .post<Fatura>(`${this.controleService.API}/faturas`, fatura, {
        headers: this.controleService.headers(),
      })
      .pipe(finalize(() => this.controleService.unload()))
      .subscribe((res) => {
        console.log('Inserir fatura', res);
        this.listarFaturas();
      });
  }
  editarFatura(fatura: Fatura) {
    this.controleService.load();
    this.http
      .put<Fatura>(
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
