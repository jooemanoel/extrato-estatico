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
import { CategoriaCompra } from '../../shared/models/classes/categoria-compra';
import { Compra } from '../../shared/models/classes/compra';

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
  controleService = inject(ControleService);
  compraService = inject(CompraService);
  faturaService = inject(FaturaService);
  private router = inject(Router);

  titulo = '';
  columns: string[] = [
    'codigo_categoria_compra',
    'descricao_compra',
    'valor_compra',
  ];
  dataSource = new MatTableDataSource<Compra>([]);

  detectarListaCompras = effect(() => {
    const compras = this.compraService.listaCompras();
    const categoria_compra = this.compraService.categoria_compra();
    this.dataSource.data = compras.listarPorCategoria(categoria_compra.codigo);
  });

  ngOnInit(): void {
    if (!this.controleService.token()) {
      this.router.navigateByUrl('');
    }
    this.titulo = this.compraService.categoria_compra().codigo
      ? this.compraService.categoria_compra().nome
      : 'TOTAL DE COMPRAS';
  }
  ngOnDestroy() {
    this.compraService.categoria_compra.set(CategoriaCompra.fromCodigo(0));
  }
  detalhar(element: Compra) {
    this.compraService.compra.set(element);
    this.router.navigateByUrl('detalhar-compra');
  }
  navegarDashboard() {
    this.router.navigateByUrl('dashboard');
  }
  navegarPainelFaturas() {
    this.router.navigateByUrl('painel-faturas');
  }
}
