import { Component, signal, ViewChild } from '@angular/core';
import { Home } from './pages/home/home';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SideMenu } from './components/side-menu/side-menu';
import { SwUpdateService } from './services/sw-update-service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  imports: [Home, SideMenu, MatSidenavModule, MatSnackBarModule ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private sw: SwUpdateService) {}
  @ViewChild(MatSidenav) drawer!: MatSidenav;
  alternarMenu(){
    this.drawer?.toggle();
  }
  closeMenu(){
    this.drawer?.close();
  }
}
