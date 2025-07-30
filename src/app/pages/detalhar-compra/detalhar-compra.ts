import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CompraService } from '../../services/compra-service';
import { ControleService } from '../../services/controle-service';

@Component({
  selector: 'app-detalhar-compra',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './detalhar-compra.html',
  styleUrl: './detalhar-compra.css'
})
export class DetalharCompra {
  constructor(private compraService: CompraService, private controleService: ControleService) {}
  get compra() {
    return this.compraService.compra;
  }
  formatarParaReal(valor: string): string {
    return parseFloat(valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
  formatarParaData(timestamp: string) {
    const [ano, mes, dia] = timestamp.slice(0, 10).split('-');
    return `${dia}/${mes}/${ano}`;
  }
  apagarCompra() {
    this.compraService.apagarCompra(this.compraService.compra().codigo_compra ?? 0);
    this.controleService.navegar('extrato');
  }
  editarCompra() {
    this.controleService.navegar('editar-compra');
  }
}
