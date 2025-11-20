import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
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
  compraService = inject(CompraService);
  private router = inject(Router);
  private location = inject(Location);
  editarCompra() {
    this.router.navigateByUrl('editar-compra');
  }
  apagarCompra() {
    this.compraService.apagarCompra(this.compraService.compra().fitid);
    this.location.back();
  }
}
