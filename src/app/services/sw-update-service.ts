// src/app/sw-update.service.ts
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SwUpdateService {
  private _snackBar = inject(MatSnackBar);
  constructor(private updates: SwUpdate, ) {
    if (updates.isEnabled) {
      updates.versionUpdates
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
}
