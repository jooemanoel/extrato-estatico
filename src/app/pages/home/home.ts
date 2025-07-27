import { Component, EventEmitter, Output } from '@angular/core';
import { Header } from '../../components/header/header';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-home',
  imports: [Header, MatCardModule, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  @Output() alternarMenu = new EventEmitter();
  alternar() {
    this.alternarMenu.emit();
  }
}
