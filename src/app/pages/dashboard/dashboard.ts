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
  constructor(private comprasService: CompraService) {}
  ngOnInit(): void {
    this.comprasService.listarCompras();
  }
}
