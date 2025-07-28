import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { Home } from './pages/home/home';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SideMenu } from './components/side-menu/side-menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [Home, SideMenu, MatSidenavModule, MatSnackBarModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  @ViewChild(MatSidenav) drawer!: MatSidenav;
  constructor(private updates: SwUpdate, private _snackBar: MatSnackBar) {}
  ngOnInit(): void {
    if (this.updates.isEnabled) {
      this.updates.versionUpdates
        .pipe(filter((evt) => evt.type === 'VERSION_READY'))
        .subscribe(() => {
          this._snackBar
            .open('Nova versão disponível', 'Atualizar')
            .onAction()
            .subscribe(() => {
              this.updates
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
