import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TabelaCompras } from '../../components/tabela-compras/tabela-compras';
import { CompraService } from '../../services/compra-service';

@Component({
  selector: 'app-extrato',
  imports: [TabelaCompras, MatCardModule, MatButtonModule],
  templateUrl: './extrato.html',
  styleUrl: './extrato.css',
})
export class Extrato {
  constructor(private compraService: CompraService) {}
  get total_compras() {
    return this.compraService.total_compras;
  }
  ngOnInit(): void {
    this.compraService.listarCompras();
  }
  formatarParaReal(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
