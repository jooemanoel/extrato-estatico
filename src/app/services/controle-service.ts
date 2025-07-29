import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ControleService {
  titulosPorPagina: Record<string, string> = {
    dashboard: 'Extrato',
    'inserir-compra': 'Nova Compra',
    'detalhar-compra': 'Detalhar Compra'
  };
  pagina = signal('dashboard');
  titulo = signal('Extrato');
  navegar(pagina: string) {
    this.pagina.set(pagina);
    this.titulo.set(this.titulosPorPagina[pagina]);
  }
}
