import { HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ControleService {
  snackBar = inject(MatSnackBar);

  readonly API = 'http://localhost:8080';
  // readonly API = 'https://extrato-api-express.vercel.app';

  carregando = signal(0);
  erro = signal('');
  token = signal('');
  headers = computed(
    () =>
      new HttpHeaders({
        Authorization: `Bearer ${this.token()}`,
      })
  );

  showMessage(message = '', action = '') {
    return this.snackBar.open(message, action, { duration: 3000 });
  }

  showErrorMessage(message = 'Erro desconhecido', action = '') {
    this.erro.set(message);
    return this.showMessage(message, action);
  }

  load() {
    this.carregando.update((x) => x + 1);
  }

  unload() {
    this.carregando.update((x) => x - 1);
  }

  limparToken() {
    this.token.set('');
    localStorage.removeItem('extrato-estatico-token');
  }
}
