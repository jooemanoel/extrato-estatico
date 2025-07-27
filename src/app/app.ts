import { Component, signal, ViewChild } from '@angular/core';
import { Home } from './pages/home/home';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [Home, MatSidenavModule , MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  @ViewChild(MatSidenav) drawer!: MatSidenav;
  alternarMenu(){
    this.drawer?.toggle();
  }
}
