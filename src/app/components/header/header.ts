import { Location } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ControleService } from '../../services/controle-service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Output() alternarMenu = new EventEmitter();
  constructor(
    private controleService: ControleService,
    private router: Router,
    private location: Location
  ) {}
  pagina = signal('');
  get titulo() {
    return this.controleService.titulosPorPagina[this.pagina()];
  }
  ngOnInit() {
    this.router.events.pipe(filter(x => x instanceof NavigationEnd)).subscribe((x) => {
      this.pagina.set(x.urlAfterRedirects.replace('/', ''))
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
