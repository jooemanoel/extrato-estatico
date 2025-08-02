import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RespostaLogin } from '../shared/models/interfaces/resposta-login';
import { UsuarioEntrada } from '../shared/models/interfaces/usuario-entrada';
import { UsuarioResposta } from '../shared/models/interfaces/usuario-resposta';

@Injectable({
  providedIn: 'root',
})
export class ControleService {
  readonly API = 'http://localhost:8080';
  // readonly API = 'https://extrato-api-express.vercel.app';
  carregando = signal(true);
  usuario = signal<UsuarioResposta>({
    codigo_usuario: 0,
    nome_usuario: '',
  });
  token = signal('');
  titulosPorPagina: Record<string, string> = {
    dashboard: 'Painel',
    'inserir-compra': 'Nova Compra',
    'detalhar-compra': 'Detalhar Compra',
    'editar-compra': 'Editar Compra',
    extrato: 'Extrato',
    login: 'Bem vindo ao Extrato!',
    cadastro: 'Cadastro'
  };
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  login(entrada: UsuarioEntrada) {
    this.http
      .post<RespostaLogin>(`${this.API}/usuario/login`, entrada)
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.token) {
            this.token.set(res.token);
            localStorage.setItem('extrato-estatico-token', res.token);
          }
          if (res.usuarioResposta) this.usuario.set(res.usuarioResposta);
          this.router.navigateByUrl('dashboard');
        },
        error: (res) => {
          console.log(res);
          this.showMessage(res?.error?.message ?? 'Erro desconhecido');
        },
      });
  }
  validarToken() {
    const token = localStorage.getItem('extrato-estatico-token');
    if (token) {
      this.token.set(token);
      // pega os dados do usuário no endpoint API/usuario/perfil
      this.http
        .get<UsuarioResposta>(`${this.API}/usuario/perfil`, {
          headers: this.headers(),
        })
        .subscribe({
          next: (res) => {
            this.usuario.set(res);
            this.showMessage(`Bem vindo, ${res.nome_usuario}!`, '');
            this.router.navigateByUrl('dashboard');
          },
          error: (res) => {
            this.showMessage(res?.error?.message ?? 'Erro desconhecido');
          },
        });
    }
  }
  cadastrar(entrada: UsuarioEntrada) {
    this.http
      .post<RespostaLogin>(`${this.API}/usuario/cadastro`, entrada)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.showMessage('Sucesso');
          this.router.navigateByUrl('login');
        },
        error: (res) => {
          console.log(res);
          const message: string = res?.error?.message ?? 'Erro desconhecido';
          if (message.startsWith('duplicate')) {
            this.showMessage('Este usuário já existe');
          } else {
            this.showMessage(message);
          }
        },
      });
  }
  headers() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token()}`,
    });
  }
  showMessage(message: string, action: string = '') {
    return this.snackBar.open(message, action, { duration: 3000 });
  }
}
