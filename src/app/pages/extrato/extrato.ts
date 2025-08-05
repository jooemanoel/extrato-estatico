import { Component, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { CompraService } from '../../services/compra-service';
import { ControleService } from '../../services/controle-service';
import { Compra } from '../../shared/models/interfaces/compra';
import { formatarTimestampParaData, formatarParaReal, formatarStringParaReal } from '../../shared/utils/functions';
import { FaturaService } from '../../services/fatura-service';

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
export class Extrato {
  titulo = '';
  displayedColumns: string[] = [
    'codigo_categoria_compra',
    'descricao_compra',
    'valor_compra',
  ];
  dataSource = new MatTableDataSource<Compra>([]);
  constructor(
    public controleService: ControleService,
    public compraService: CompraService,
    public faturaService: FaturaService,
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
  ngOnInit(): void {
    if(!this.controleService.token()){
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
  formatarParaReal = formatarParaReal.bind(this);
  formatarStringParaReal = formatarStringParaReal.bind(this);
  formatarParaData = formatarTimestampParaData.bind(this);
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
}
