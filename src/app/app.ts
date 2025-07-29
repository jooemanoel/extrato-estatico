// app.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { filter } from 'rxjs';
import { SideMenu } from './components/side-menu/side-menu';
import { Home } from './pages/home/home';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [Header, Home, SideMenu, MatSidenavModule, MatSnackBarModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  @ViewChild(MatSidenav) drawer!: MatSidenav;
  constructor(
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.checkForUpdates();
  }
  checkForUpdates() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates
        .pipe(filter((evt) => evt.type === 'VERSION_READY'))
        .subscribe(() => {
          this.snackBar
            .open('Nova versão disponível', 'Atualizar')
            .onAction()
            .subscribe(() => {
              this.swUpdate
                .activateUpdate()
                .then(() => document.location.reload());
            });
        });
    }
  }
  alternarMenu() {
    this.drawer?.toggle();
  }
  closeMenu() {
    this.drawer?.close();
  }
}
