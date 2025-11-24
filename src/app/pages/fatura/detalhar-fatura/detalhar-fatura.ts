import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CompraService } from '../../../services/compra-service';
import { Fatura } from '../../../shared/models/classes/fatura';
import { FaturaService } from '../fatura-service';

@Component({
  selector: 'app-detalhar-fatura',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './detalhar-fatura.html',
  styleUrl: './detalhar-fatura.css',
})
export class DetalharFatura {
  faturaService = inject(FaturaService);
  compraService = inject(CompraService);
  router = inject(Router);
  location = inject(Location);

  editarFatura() {
    this.router.navigateByUrl('editar-fatura');
  }

  apagarFatura() {
    this.faturaService.apagarFatura(this.faturaService.fatura().codigo_fatura);
    if (
      this.faturaService.faturaAtiva().codigo_fatura ===
      this.faturaService.fatura().codigo_fatura
    ) {
      this.faturaService.faturaAtiva.set(Fatura.fromDTO());
      this.compraService.listarCompras();
    }
    this.location.back();
  }

  selecionarFatura() {
    this.faturaService.faturaAtiva.set(this.faturaService.fatura());
    this.compraService.listarCompras();
    this.router.navigateByUrl('dashboard');
  }
}
