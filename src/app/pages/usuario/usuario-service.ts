import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { RespostaLogin } from '../../shared/models/interfaces/resposta-login';
import { UsuarioEntrada } from '../../shared/models/interfaces/usuario-entrada';
import { UsuarioResposta } from '../../shared/models/interfaces/usuario-resposta';
import { ControleService } from '../../services/controle-service';
import { FaturaService } from '../fatura/fatura-service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  // Dependências
  private controleService = inject(ControleService);
  private faturaService = inject(FaturaService);
  private http = inject(HttpClient);
  private router = inject(Router);
  // Métodos
  login(entrada: UsuarioEntrada) {
    this.controleService.load();
    this.http
      .post<RespostaLogin>(`${this.controleService.API}/usuario/login`, entrada)
      .subscribe({
        next: (res) => {
          this.controleService.unload();
          if (res.token) {
            this.controleService.token.set(res.token);
            localStorage.setItem('extrato-estatico-token', res.token);
          }
          this.carregarUsuario(res.usuario.nome_usuario);
        },
        error: (res) => {
          this.controleService.unload();
          this.controleService.showMessage(
            res?.error?.message ?? 'Erro desconhecido'
          );
        },
      });
  }
  validarToken() {
    const token = localStorage.getItem('extrato-estatico-token');
    if (token) {
      this.controleService.token.set(token);
      this.controleService.load();
      this.http
        .get<UsuarioResposta>(`${this.controleService.API}/usuario/perfil`, {
          headers: this.controleService.headers(),
        })
        .pipe(finalize(() => this.controleService.unload()))
        .subscribe({
          next: (res) => {
            this.carregarUsuario(res.nome_usuario);
          },
          error: (res) => {
            this.controleService.showMessage(
              res?.error?.message ?? 'Erro desconhecido'
            );
          },
        });
    }
  }
  cadastrar(entrada: UsuarioEntrada) {
    this.controleService.load();
    this.http
      .post<RespostaLogin>(
        `${this.controleService.API}/usuario/cadastro`,
        entrada
      )
      .pipe(finalize(() => this.controleService.unload()))
      .subscribe({
        next: () => {
          this.controleService.showMessage(
            `Usuário ${entrada.nome_usuario} cadastrado com sucesso`
          );
          this.router.navigateByUrl('');
        },
        error: (res) => {
          const message: string = res?.error?.message ?? 'Erro desconhecido';
          if (message.startsWith('duplicate')) {
            this.controleService.showMessage('Este usuário já existe');
          } else {
            this.controleService.showMessage(message);
          }
        },
      });
  }
  carregarUsuario(nome: string) {
    this.faturaService.listarFaturas();
    this.controleService.showMessage(`Bem vindo(a), ${nome}!`, '');
    this.router.navigateByUrl('dashboard');
  }
}
