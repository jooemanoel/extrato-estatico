import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Fatura } from '../shared/models/interfaces/fatura';
import { Mock } from '../shared/utils/mock';
import { ControleService } from './controle-service';
import { CompraService } from './compra-service';

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
    this.http
      .get<Fatura[]>(`${this.controleService.API}/faturas`, {
        headers: this.controleService.headers(),
      })
      .subscribe({
        next: (faturas) => {
          this.faturas.set(faturas);
          this.controleService.carregando.set(false);
        },
        error: (res) => {
          this.controleService.showMessage(
            res?.error?.message ?? 'Erro desconhecido'
          );
        },
      });
  }
  inserirFatura(fatura: Fatura) {
    this.controleService.carregando.set(true);
    this.http
      .post<Fatura>(`${this.controleService.API}/faturas`, fatura, {
        headers: this.controleService.headers(),
      })
      .subscribe((res) => {
        console.log('Inserir fatura', res);
        this.listarFaturas();
      });
  }
  editarFatura(fatura: Fatura) {
    this.controleService.carregando.set(true);
    this.http
      .put<Fatura>(
        `${this.controleService.API}/faturas/${fatura.codigo_fatura}`,
        fatura,
        {
          headers: this.controleService.headers(),
        }
      )
      .subscribe((res) => {
        console.log('Editar fatura', res);
        this.listarFaturas();
      });
  }
  apagarFatura(codigo_fatura: number) {
    this.controleService.carregando.set(true);
    this.http
      .delete(`${this.controleService.API}/faturas/${codigo_fatura}`, {
        headers: this.controleService.headers(),
      })
      .subscribe((res) => {
        console.log('Apagar fatura', res);
        this.listarFaturas();
      });
  }
}
