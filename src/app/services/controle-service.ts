import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ControleService {
  titulosPorPagina: Record<string, string> = {
    dashboard: 'Painel',
    'inserir-compra': 'Nova Compra',
    'detalhar-compra': 'Detalhar Compra',
    'editar-compra': 'Editar Compra',
    extrato: 'Extrato',
  };
  pagina = signal('dashboard');
  titulo = signal('Extrato');
  navegar(pagina: string) {
    this.pagina.set(pagina);
    this.titulo.set(this.titulosPorPagina[pagina]);
  }
}
