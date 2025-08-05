import { HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioResposta } from '../shared/models/interfaces/usuario-resposta';

@Injectable({
  providedIn: 'root',
})
export class ControleService {
  // readonly API = 'http://localhost:8080';
  readonly API = 'https://extrato-api-express.vercel.app';
  carregando = signal(false);
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
    cadastro: 'Cadastro',
    'painel-faturas': 'Minhas Faturas',
    'criar-fatura': 'Criar Fatura',
    'detalhar-fatura': 'Detalhar Fatura',
    'editar-fatura': 'Editar Fatura',
  };
  constructor(private snackBar: MatSnackBar) {}
  headers() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token()}`,
    });
  }
  showMessage(message: string, action: string = '') {
    return this.snackBar.open(message, action, { duration: 3000 });
  }
}
