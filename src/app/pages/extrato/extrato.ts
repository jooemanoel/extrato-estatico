import { Component, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { CompraService } from '../../services/compra-service';
import { ControleService } from '../../services/controle-service';
import { Compra } from '../../shared/models/interfaces/compra';

@Component({
  selector: 'app-extrato',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './extrato.html',
  styleUrl: './extrato.css',
})
export class Extrato {
  titulo = '';
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
  get total_compras() {
    return this.compraService.total_compras;
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
