import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
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
  usuario = signal<UsuarioResposta>({
    codigo_usuario: 0,
    nome_usuario: '',
  });
  constructor(
    private controleService: ControleService,
    private compraService: CompraService,
    private faturaService: FaturaService,
    private http: HttpClient,
    private router: Router
  ) {}
  login(entrada: UsuarioEntrada) {
    this.controleService.carregando.set(true);
    this.http
      .post<RespostaLogin>(`${this.controleService.API}/usuario/login`, entrada)
      .subscribe({
        next: (res) => {
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
          this.controleService.showMessage(
            res?.error?.message ?? 'Erro desconhecido'
          );
        },
      });
  }
  validarToken() {
    const token = localStorage.getItem('extrato-estatico-token');
    if (token) {
      console.log('validarToken');
      this.controleService.token.set(token);
      this.controleService.carregando.set(true);
      this.http
        .get<UsuarioResposta>(`${this.controleService.API}/usuario/perfil`, {
          headers: this.controleService.headers(),
        })
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
    this.controleService.carregando.set(true);
    this.http
      .post<RespostaLogin>(
        `${this.controleService.API}/usuario/cadastro`,
        entrada
      )
      .subscribe({
        next: () => {
          this.controleService.carregando.set(false);
          this.controleService.showMessage(
            `Usuário ${entrada.nome_usuario} cadastrado com sucesso`
          );
          this.router.navigateByUrl('login');
        },
        error: (res) => {
          this.controleService.carregando.set(false);
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
