import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ControleService } from '../../services/controle-service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Output() alternarMenu = new EventEmitter();
  constructor(private controleService: ControleService) {}
  get titulo() {
    return this.controleService.titulo;
  }
  alternar() {
    this.alternarMenu.emit();
  }
}
