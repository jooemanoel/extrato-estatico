import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { Router } from '@angular/router';
import { ControleService } from '../../services/controle-service';

@Component({
  selector: 'app-side-menu',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatListModule],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.css',
})
export class SideMenu {
  @Output() closeMenu = new EventEmitter();
  constructor(private router: Router, private controleService: ControleService) {}
  get usuarioLogado() {
    return !!this.controleService.token();
  }
  navegar(pagina: string) {
    this.router.navigateByUrl(pagina);
    this.close();
  }
  close() {
    this.closeMenu.emit();
  }
  logout() {
    this.controleService.token.set('');
    localStorage.removeItem('extrato-estatico-token');
    localStorage.removeItem('extrato-estatico-fatura');
    this.navegar('login');
  }
}
