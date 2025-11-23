// app.ts
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { filter } from 'rxjs';
import { Erro } from './components/erro/erro';
import { Header } from './components/header/header';
import { SideMenu } from './components/side-menu/side-menu';
import { UsuarioService } from './pages/usuario/usuario-service';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    Header,
    SideMenu,
    MatSidenavModule,
    MatSnackBarModule,
    Erro,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private swUpdate = inject(SwUpdate);
  private snackBar = inject(MatSnackBar);
  private usuarioService = inject(UsuarioService);
  @ViewChild(MatSidenav) drawer!: MatSidenav;
  ngOnInit(): void {
    this.checkForUpdates();
    this.usuarioService.validarToken();
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
