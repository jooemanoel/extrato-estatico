import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { CompraService } from '../../services/compra-service';
import { ControleService } from '../../services/controle-service';
import { FaturaService } from '../../services/fatura-service';
import { CategoriaCompra } from '../../shared/models/classes/categoria-compra';

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
export class Dashboard implements OnInit {
  controleService = inject(ControleService);
  private compraService = inject(CompraService);
  faturaService = inject(FaturaService);
  private router = inject(Router);

  CategoriaCompra = CategoriaCompra;

  ngOnInit(): void {
    if (!this.controleService.token()) {
      this.router.navigateByUrl('');
    }
    this.compraService.limparCategoria();
  }
  somaCategoria(categoria: number) {
    return this.compraService.somaCategoria(categoria);
  }
  navegarExtrato(categoria: CategoriaCompra = CategoriaCompra.fromCodigo(0)) {
    this.compraService.categoria_compra.set(categoria);
    this.router.navigateByUrl('extrato');
  }
  navegarPainelFaturas() {
    this.router.navigateByUrl('painel-faturas');
  }
}
