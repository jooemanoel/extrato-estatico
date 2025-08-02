import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TabelaCompras } from '../../components/tabela-compras/tabela-compras';
import { CompraService } from '../../services/compra-service';
import { ControleService } from '../../services/controle-service';

@Component({
  selector: 'app-extrato',
  imports: [TabelaCompras, MatCardModule, MatButtonModule],
  templateUrl: './extrato.html',
  styleUrl: './extrato.css',
})
export class Extrato {
  titulo = '';
  constructor(private compraService: CompraService, private controleService: ControleService) {}
  get total_compras() {
    return this.compraService.total_compras;
  }
  get carregando() {
    return this.controleService.carregando;
  }
  get codigo_categoria_compra() {
    return this.compraService.codigo_categoria_compra;
  }
  ngOnInit(): void {
    this.compraService.listarCompras();
    this.titulo =
      this.compraService.categoriaCompra[
        this.compraService.codigo_categoria_compra()
      ]?.nome ?? 'TOTAL DE COMPRAS';
  }
  ngOnDestroy() {
    this.compraService.codigo_categoria_compra.set(0);
  }
  formatarParaReal(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
  somaCategoria(categoria: number) {
    return this.compraService.somaCategoria(categoria);
  }
}
