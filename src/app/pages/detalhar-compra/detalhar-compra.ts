import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CompraService } from '../../services/compra-service';

@Component({
  selector: 'app-detalhar-compra',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './detalhar-compra.html',
  styleUrl: './detalhar-compra.css',
})
export class DetalharCompra {
  constructor(
    public compraService: CompraService,
    private router: Router,
    private location: Location
  ) {}
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
  categoriaCompra(codigo: number) {
    return this.compraService.categoriaCompra[codigo];
  }
  editarCompra() {
    this.router.navigateByUrl('editar-compra');
  }
  apagarCompra() {
    this.compraService.apagarCompra(
      this.compraService.compra().codigo_compra
    );
    this.location.back();
  }
}
