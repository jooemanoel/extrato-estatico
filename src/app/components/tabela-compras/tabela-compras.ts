import { AfterViewInit, Component, effect, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CompraService } from '../../services/compra-service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Compra } from '../../shared/models/interfaces/compra';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-tabela-compras',
  imports: [MatCardModule, MatTableModule, MatSortModule, MatProgressSpinnerModule],
  templateUrl: './tabela-compras.html',
  styleUrl: './tabela-compras.css'
})
export class TabelaCompras {
  displayedColumns: string[] = ['descricao_compra', 'valor_compra'];
  dataSource = new MatTableDataSource<Compra>([]);
  constructor(private compraService: CompraService) {
    effect(() => {
      this.dataSource.data = this.compraService.compras();
    });
  }
  get carregando() {
    return this.compraService.carregando;
  }
  formatarParaReal(valor: string): string {
  return parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
  data(timestamp: string){
    return new Date(timestamp).toLocaleDateString('pt-br');
  }
}
