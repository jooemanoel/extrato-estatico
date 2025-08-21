import { Component, effect, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { ControleService } from '../../services/controle-service';
import { FaturaService } from '../../services/fatura-service';
import { IFatura } from '../../shared/models/interfaces/fatura';

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
  displayedColumns: string[] = ['nome_fatura', 'chevron'];
  dataSource = new MatTableDataSource<IFatura>([]);
  faturaService = inject(FaturaService);
  controleService = inject(ControleService);
  private router = inject(Router);
  constructor() {
    effect(() => {
      this.dataSource.data = this.faturaService.faturas();
    });
  }
  ngOnInit() {
    if (!this.controleService.token()) {
      this.router.navigateByUrl('');
    }
  }
  detalhar(element: IFatura) {
    this.faturaService.fatura.set(element);
    this.router.navigateByUrl('detalhar-fatura');
  }
  formatarParaData(timestamp: string) {
    const [ano, mes, dia] = timestamp.slice(0, 10).split('-');
    return `${dia}/${mes}/${ano}`;
  }
}
