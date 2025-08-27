import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { ControleService } from '../../services/controle-service';
import { FaturaService } from '../../features/fatura/fatura-service';

@Component({
  selector: 'app-side-menu',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatListModule],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.css',
})
export class SideMenu {
  @Output() closeMenu = new EventEmitter();
  private router = inject(Router);
  private controleService = inject(ControleService);
  private faturaService = inject(FaturaService);
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
    this.controleService.limparToken();
    this.faturaService.limparFaturaAtiva();
    this.navegar('');
  }
}
