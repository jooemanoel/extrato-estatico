import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FaturaService } from '../../services/fatura-service';
import { CompraService } from '../../services/compra-service';

@Component({
  selector: 'app-detalhar-fatura',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './detalhar-fatura.html',
  styleUrl: './detalhar-fatura.css',
})
export class DetalharFatura {
  constructor(
    private faturaService: FaturaService,
    private compraService: CompraService,
    private router: Router,
    private location: Location
  ) {}
  get fatura() {
    return this.faturaService.fatura;
  }
  formatarParaData(timestamp: string) {
    const [ano, mes, dia] = timestamp.slice(0, 10).split('-');
    return `${dia}/${mes}/${ano}`;
  }
  editarFatura() {
    this.router.navigateByUrl('editar-fatura');
  }
  apagarFatura() {
    this.faturaService.apagarFatura(this.faturaService.fatura().codigo_fatura);
    this.location.back();
  }
  selecionarFatura() {
    this.faturaService.faturaAtiva.set(this.faturaService.fatura());
    this.compraService.listarCompras();
    localStorage.setItem('extrato-estatico-fatura', JSON.stringify(this.faturaService.faturaAtiva()));
    this.router.navigateByUrl('dashboard');
  }
}
