import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { Fatura, IFatura } from '../../shared/models/classes/fatura';
import { ControleService } from '../../services/controle-service';

@Injectable({
  providedIn: 'root',
})
export class FaturaService {
  // Dependências
  private controleService = inject(ControleService);
  private http = inject(HttpClient);
  // Atributos
  listaFaturas = signal<Fatura[]>([]);
  fatura = signal<Fatura>(Fatura.fromDTO());
  faturaAtiva = signal<Fatura>(Fatura.fromDTO());
  // Métodos
  listarFaturas() {
    this.controleService.load();
    this.http
      .get<IFatura[]>(`${this.controleService.API}/faturas`, {
        headers: this.controleService.headers(),
      })
      .pipe(finalize(() => this.controleService.unload()))
      .subscribe({
        next: (faturas) => {
          this.listaFaturas.set(faturas.map((x) => Fatura.fromDTO(x)));
          this.detectarFaturaMaisProximaDataAtual();
        },
        error: (res) => {
          this.controleService.showErrorMessage(
            res?.error?.message ?? 'Erro desconhecido'
          );
        },
      });
  }
  detectarFaturaMaisProximaDataAtual() {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const faturaAtiva = this.listaFaturas().find((fatura) => {
      const inicio = fatura.data_abertura_fatura.toDate();
      const fim = fatura.data_fechamento_fatura.toDate();
      if (!inicio || !fim) return false; // evita faturas inválidas
      return hoje >= inicio && hoje <= fim;
    });

    if (faturaAtiva) {
      this.faturaAtiva.set(faturaAtiva);
    } else {
      // se nenhuma fatura encontrada, pode definir como avulsa
      this.faturaAtiva.set(Fatura.faturaAvulsa());
    }
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
    this.faturaAtiva.set(Fatura.fromDTO());
  }
}
