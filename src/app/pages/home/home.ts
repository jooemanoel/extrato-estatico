import { Component, OnInit } from '@angular/core';
import { Dashboard } from '../dashboard/dashboard';
import { InserirCompra } from '../inserir-compra/inserir-compra';
import { ControleService } from '../../services/controle-service';
import { DetalharCompra } from '../detalhar-compra/detalhar-compra';

@Component({
  selector: 'app-home',
  imports: [Dashboard, InserirCompra, DetalharCompra],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private controleService: ControleService) {}
  get pagina() {
    return this.controleService.pagina;
  }
}
