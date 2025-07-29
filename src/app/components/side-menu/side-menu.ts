import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { ControleService } from '../../services/controle-service';

@Component({
  selector: 'app-side-menu',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatListModule],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.css',
})
export class SideMenu {
  @Output() closeMenu = new EventEmitter();
  constructor(private controleService: ControleService) {}
  navegar(pagina: string) {
    this.controleService.navegar(pagina);
    this.close();
  }
  close() {
    this.closeMenu.emit();
  }
}
