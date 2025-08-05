import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { CompraService } from '../../services/compra-service';
import { ControleService } from '../../services/controle-service';
import { FaturaService } from '../../services/fatura-service';
import { formatarTimestampParaData, formatarParaReal } from '../../shared/utils/functions';

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
    private faturaService: FaturaService,
    private controleService: ControleService,
    private router: Router
  ) {}
  get carregando() {
    return this.controleService.carregando;
  }
  get faturaAtiva() {
    return this.faturaService.faturaAtiva;
  }
  ngOnInit(): void {
    if(!this.controleService.token()){
      this.router.navigateByUrl('');
    }
    this.compraService.codigo_categoria_compra.set(0);
  }
  formatarParaReal = formatarParaReal.bind(this);
  formatarParaData = formatarTimestampParaData.bind(this);
  codigosCategoriaCompra() {
    return Object.keys(this.compraService.categoriaCompra).map((x) =>
      parseInt(x)
    );
  }
  categoriaCompra(codigo: number) {
    return this.compraService.categoriaCompra[codigo];
  }
  somaCategoria(categoria: number) {
    return this.compraService.somaCategoria(categoria);
  }
  navegarExtrato(codigo_categoria_compra: number) {
    this.compraService.codigo_categoria_compra.set(codigo_categoria_compra);
    this.router.navigateByUrl('extrato');
  }
  navegarPainelFaturas() {
    this.router.navigateByUrl('painel-faturas');
  }
}
