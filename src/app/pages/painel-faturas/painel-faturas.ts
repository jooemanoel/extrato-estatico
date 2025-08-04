import { Component, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { ControleService } from '../../services/controle-service';
import { FaturaService } from '../../services/fatura-service';
import { Fatura } from '../../shared/models/interfaces/fatura';
import { formatarTimestampParaData } from '../../shared/utils/functions';

@Component({
  selector: 'app-painel-faturas',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './painel-faturas.html',
  styleUrl: './painel-faturas.css',
})
export class PainelFaturas {
  displayedColumns: string[] = ['nome_fatura', 'chevron'];
  dataSource = new MatTableDataSource<Fatura>([]);
  constructor(
    private faturaService: FaturaService,
    private controleService: ControleService,
    private router: Router
  ) {
    effect(() => {
      this.dataSource.data = this.faturaService.faturas();
    });
  }
  get carregando() {
    return this.controleService.carregando;
  }
  get fatura() {
    return this.faturaService.fatura;
  }
  get faturaAtiva() {
    return this.faturaService.faturaAtiva;
  }
  detalhar(element: Fatura) {
    this.faturaService.fatura.set(element);
    this.router.navigateByUrl('detalhar-fatura');
  }
  formatarParaData = formatarTimestampParaData.bind(this);
}
