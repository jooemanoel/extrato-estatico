import { Component, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
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
    RouterModule,
  ],
  templateUrl: './painel-faturas.html',
  styleUrl: './painel-faturas.css',
})
export class PainelFaturas {
  displayedColumns: string[] = ['nome_fatura', 'chevron'];
  dataSource = new MatTableDataSource<Fatura>([]);
  constructor(
    public faturaService: FaturaService,
    public controleService: ControleService,
    private router: Router
  ) {
    effect(() => {
      this.dataSource.data = this.faturaService.faturas();
    });
  }
  ngOnInit() {
    if (!this.controleService.token()) {
      this.router.navigateByUrl('');
    }
  }
  detalhar(element: Fatura) {
    this.faturaService.fatura.set(element);
    this.router.navigateByUrl('detalhar-fatura');
  }
  formatarParaData = formatarTimestampParaData.bind(this);
}
