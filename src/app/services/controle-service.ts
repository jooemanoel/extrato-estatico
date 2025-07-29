import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ControleService {
  titulosPorPagina: Record<string, string> = {
    dashboard: 'Extrato',
    'inserir-compra': 'Nova Compra',
  };
  titulo = signal('Extrato');
  pagina = signal('dashboard');
  navegar(pagina: string) {
    this.pagina.set(pagina);
    this.titulo.set(this.titulosPorPagina[pagina]);
  }
}
