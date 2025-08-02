import { Component, effect } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CompraService } from '../../services/compra-service';
import { Compra } from '../../shared/models/interfaces/compra';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ControleService } from '../../services/controle-service';

@Component({
  selector: 'app-tabela-compras',
  imports: [
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './tabela-compras.html',
  styleUrl: './tabela-compras.css',
})
export class TabelaCompras {
  displayedColumns: string[] = [
    'codigo_categoria_compra',
    'descricao_compra',
    'valor_compra',
  ];
  dataSource = new MatTableDataSource<Compra>([]);
  constructor(
    private compraService: CompraService,
    private controleService: ControleService,
    private router: Router
  ) {
    effect(() => {
      const compras = this.compraService.compras();
      const codigo_categoria_compra = compraService.codigo_categoria_compra();
      this.dataSource.data = codigo_categoria_compra
        ? compras.filter(
            (x) => x.codigo_categoria_compra === codigo_categoria_compra
          )
        : compras;
    });
  }
  get carregando() {
    return this.controleService.carregando;
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
  detalhar(element: Compra) {
    this.compraService.compra.set(element);
    this.router.navigateByUrl('detalhar-compra');
  }
  categoriaCompra(codigo: number) {
    return this.compraService.categoriaCompra[codigo];
  }
}
