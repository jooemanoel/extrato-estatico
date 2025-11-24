import { Location } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  @Output() alternarMenu = new EventEmitter();
  private router = inject(Router);
  private location = inject(Location);
  pagina = signal('');
  titulosPorPagina: Record<string, string> = {
    dashboard: 'Painel',
    'inserir-compra': 'Nova Compra',
    'detalhar-compra': 'Detalhar Compra',
    'editar-compra': 'Editar Compra',
    extrato: 'Extrato',
    '': 'Bem vindo ao Extrato!',
    cadastro: 'Cadastro',
    'painel-faturas': 'Minhas Faturas',
    'criar-fatura': 'Criar Fatura',
    'detalhar-fatura': 'Detalhar Fatura',
    'editar-fatura': 'Editar Fatura',
    'inserir-arquivo': 'Inserir Arquivo',
  };
  titulo = computed(() => this.titulosPorPagina[this.pagina()]);
  ngOnInit() {
    this.router.events
      .pipe(filter((x) => x instanceof NavigationEnd))
      .subscribe((x) => {
        this.pagina.set(x.urlAfterRedirects.replace('/', ''));
      });
  }
  alternar() {
    this.alternarMenu.emit();
  }
  voltar() {
    this.location.back();
  }
  novaCompra() {
    this.router.navigateByUrl('inserir-compra');
  }
}
