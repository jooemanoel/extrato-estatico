// app.ts
import { Component, effect, Injector, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { filter } from 'rxjs';
import { Header } from './components/header/header';
import { SideMenu } from './components/side-menu/side-menu';
import { CompraService } from './services/compra-service';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    Header,
    SideMenu,
    MatSidenavModule,
    MatSnackBarModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  @ViewChild(MatSidenav) drawer!: MatSidenav;
  constructor(
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar,
    private compraService: CompraService,
    private injector: Injector
  ) {}
  ngOnInit(): void {
    this.checkForUpdates();
    this.checkLoadingFailed();
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
  checkLoadingFailed() {
    effect(
      () => {
        if (this.compraService.openReloadSnack()) {
          this.snackBar
            .open('Erro no carregamento.', 'Recarregar')
            .onAction()
            .subscribe(() => {
              this.compraService.listarCompras();
            });
        }
      },
      { injector: this.injector }
    );
  }
  alternarMenu() {
    this.drawer?.toggle();
  }
  closeMenu() {
    this.drawer?.close();
  }
}
