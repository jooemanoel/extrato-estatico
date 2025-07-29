import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TabelaCompras } from '../../components/tabela-compras/tabela-compras';
import { CompraService } from '../../services/compra-service';

@Component({
  selector: 'app-dashboard',
  imports: [TabelaCompras, MatCardModule, MatButtonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
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
