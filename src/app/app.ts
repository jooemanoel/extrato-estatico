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
import { ControleService } from './services/controle-service';
import { FaturaService } from './services/fatura-service';
import { UsuarioService } from './services/usuario-service';

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
  @ViewChild(MatSidenav) drawer!: MatSidenav;
  private swUpdate = inject(SwUpdate);
  private snackBar = inject(MatSnackBar);
  private usuarioService = inject(UsuarioService);
  private faturaService = inject(FaturaService);
  private controleService = inject(ControleService);
  get erro() {
    return this.controleService.erro;
  }
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
