import { Component, effect } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CompraService } from '../../services/compra-service';
import { Compra } from '../../shared/models/interfaces/compra';
import { ControleService } from '../../services/controle-service';

@Component({
  selector: 'app-tabela-compras',
  imports: [
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './tabela-compras.html',
  styleUrl: './tabela-compras.css',
})
export class TabelaCompras {
  displayedColumns: string[] = ['descricao_compra', 'valor_compra'];
  dataSource = new MatTableDataSource<Compra>([]);
  constructor(private compraService: CompraService, private controleService: ControleService) {
    effect(() => {
      this.dataSource.data = this.compraService.compras();
    });
  }
  get carregando() {
    return this.compraService.carregando;
  }
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
  detalhar(element: Compra){
    this.compraService.compra.set(element);
    this.controleService.navegar('detalhar-compra');
  }
}
