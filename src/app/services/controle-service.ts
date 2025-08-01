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
}
