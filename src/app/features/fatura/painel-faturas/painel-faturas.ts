import { Component, effect, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { ControleService } from '../../../services/controle-service';
import { Fatura } from '../../../shared/models/classes/fatura';
import { FaturaService } from '../fatura-service';

@Component({
  selector: 'app-painel-faturas',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './painel-faturas.html',
  styleUrl: './painel-faturas.css',
})
export class PainelFaturas implements OnInit {
  faturaService = inject(FaturaService);
  controleService = inject(ControleService);
  private router = inject(Router);

  displayedColumns: string[] = ['nome_fatura', 'chevron'];
  dataSource = new MatTableDataSource<Fatura>([]);

  detectarListaFaturas = effect(() => {
    this.dataSource.data = this.faturaService.listaFaturas();
  });

  ngOnInit() {
    if (!this.controleService.token()) {
      this.router.navigateByUrl('');
    }
  }
  detalhar(element: Fatura) {
    this.faturaService.fatura.set(element);
    this.router.navigateByUrl('detalhar-fatura');
  }
}
