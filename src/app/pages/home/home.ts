import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Header } from '../../components/header/header';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CompraService } from '../../services/compra-service';
import { TabelaCompras } from '../../components/tabela-compras/tabela-compras';

@Component({
  selector: 'app-home',
  imports: [Header, TabelaCompras, MatCardModule, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  @Output() alternarMenu = new EventEmitter();
  constructor(private comprasService: CompraService) {}
  ngOnInit(): void {
    this.comprasService.listarCompras();
  }
  alternar() {
    this.alternarMenu.emit();
  }
}
