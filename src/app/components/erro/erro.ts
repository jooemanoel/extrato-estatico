import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ControleService } from '../../services/controle-service';

@Component({
  selector: 'app-erro',
  imports: [MatCardModule, MatProgressSpinnerModule, MatIconModule],
  templateUrl: './erro.html',
  styleUrl: './erro.css',
})
export class Erro {
  constructor(public controleService: ControleService) {}
  recarregar() {
    document.location.reload();
  }
}
