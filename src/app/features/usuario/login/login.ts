import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { ControleService } from '../../../services/controle-service';
import { UsuarioEntrada } from '../../../shared/models/interfaces/usuario-entrada';
import { normalizar } from '../../../shared/utils/functions';
import { UsuarioService } from '../usuario-service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  controleService = inject(ControleService);
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  hide = true;
  formLogin = new FormGroup({
    nome_usuario: new FormControl(''),
    senha_usuario: new FormControl(''),
  });

  login() {
    this.formLogin.controls.nome_usuario.setValue(
      normalizar(this.formLogin.value.nome_usuario ?? '')
    );
    this.usuarioService.login(this.formLogin.value as UsuarioEntrada);
  }
  cadastrar() {
    this.router.navigateByUrl('cadastro');
  }
}
