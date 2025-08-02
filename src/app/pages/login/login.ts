import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ControleService } from '../../services/controle-service';
import { UsuarioEntrada } from '../../shared/models/interfaces/usuario-entrada';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  hide = true;
  formCompra = new FormGroup({
    nome_usuario: new FormControl(''),
    senha_usuario: new FormControl(''),
  });
  constructor(
    private controleService: ControleService,
    private router: Router
  ) {}
  login() {
    this.formCompra.controls.nome_usuario.setValue(
      this.formCompra.value.nome_usuario?.toUpperCase() ?? ''
    );
    this.controleService.login(this.formCompra.value as UsuarioEntrada);
  }
  cadastrar() {
    this.router.navigateByUrl('cadastro');
  }
}
