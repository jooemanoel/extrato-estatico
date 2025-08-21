import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { CompraService } from '../../services/compra-service';
import { ControleService } from '../../services/controle-service';
import { FaturaService } from '../../services/fatura-service';
import { Compra } from '../../shared/models/interfaces/compra';

@Component({
  selector: 'app-extrato',
  imports: [
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './extrato.html',
  styleUrl: './extrato.css',
})
export class Extrato implements OnInit, OnDestroy {
  titulo = '';
  displayedColumns: string[] = [
    'codigo_categoria_compra',
    'descricao_compra',
    'valor_compra',
  ];
  dataSource = new MatTableDataSource<Compra>([]);
  controleService = inject(ControleService);
  compraService = inject(CompraService);
  faturaService = inject(FaturaService);
  private router = inject(Router);
  constructor() {
    effect(() => {
      const compras = this.compraService.compras();
      const codigo_categoria_compra =
        this.compraService.codigo_categoria_compra();
      this.dataSource.data = compras.listarPorCategoria(
        codigo_categoria_compra
      );
    });
  }
  ngOnInit(): void {
    if (!this.controleService.token()) {
      this.router.navigateByUrl('');
    }
    this.titulo =
      this.compraService.categoriaCompra[
        this.compraService.codigo_categoria_compra()
      ]?.nome ?? 'TOTAL DE COMPRAS';
  }
  ngOnDestroy() {
    this.compraService.codigo_categoria_compra.set(0);
  }
  detalhar(element: Compra) {
    this.compraService.compra.set(element);
    this.router.navigateByUrl('detalhar-compra');
  }
  categoriaCompra(codigo: number) {
    return this.compraService.categoriaCompra[codigo];
  }
  navegarDashboard() {
    this.router.navigateByUrl('dashboard');
  }
  navegarPainelFaturas() {
    this.router.navigateByUrl('painel-faturas');
  }
  formatarParaData(timestamp: string) {
    const [ano, mes, dia] = timestamp.slice(0, 10).split('-');
    return `${dia}/${mes}/${ano}`;
  }
}
