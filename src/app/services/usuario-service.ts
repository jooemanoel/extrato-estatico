import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { RespostaLogin } from '../shared/models/interfaces/resposta-login';
import { UsuarioEntrada } from '../shared/models/interfaces/usuario-entrada';
import { UsuarioResposta } from '../shared/models/interfaces/usuario-resposta';
import { CompraService } from './compra-service';
import { ControleService } from './controle-service';
import { FaturaService } from './fatura-service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private controleService = inject(ControleService);
  private compraService = inject(CompraService);
  private faturaService = inject(FaturaService);
  private http = inject(HttpClient);
  private router = inject(Router);
  usuario = signal<UsuarioResposta>({
    codigo_usuario: 0,
    nome_usuario: '',
  });
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
          if (res.usuario) {
            this.usuario.set(res.usuario);
          }
          this.carregarUsuario();
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
            this.usuario.set(res);
            this.carregarUsuario();
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
  carregarUsuario() {
    this.compraService.listarCompras();
    this.faturaService.listarFaturas();
    this.controleService.showMessage(
      `Bem vindo(a), ${this.usuario().nome_usuario}!`,
      ''
    );
    this.router.navigateByUrl('dashboard');
  }
}
