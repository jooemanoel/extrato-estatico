import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CompraService } from '../../services/compra-service';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ControleService } from '../../services/controle-service';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  constructor(
    private compraService: CompraService,
    private controleService: ControleService,
    private router: Router
  ) {}
  get total_compras() {
    return this.compraService.total_compras;
  }
  get carregando() {
    return this.controleService.carregando;
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
  codigosCategoriaCompra() {
    return Object.keys(this.compraService.categoriaCompra).map((x) =>
      parseInt(x)
    );
  }
  categoriaCompra(codigo: number) {
    return this.compraService.categoriaCompra[codigo];
  }
  somaCategoria(categoria: number) {
    if (!categoria) return this.compraService.total_compras();
    return this.compraService
      .compras()
      .filter((x) => x.codigo_categoria_compra == categoria)
      .reduce((acc, x) => acc + parseFloat(x.valor_compra), 0);
  }
  navegarExtrato(codigo_categoria_compra: number) {
    this.compraService.codigo_categoria_compra.set(codigo_categoria_compra);
    this.router.navigateByUrl('extrato');
  }
}
