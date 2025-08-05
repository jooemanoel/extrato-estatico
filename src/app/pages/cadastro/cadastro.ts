import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ControleService } from '../../services/controle-service';
import { UsuarioService } from '../../services/usuario-service';
import { UsuarioEntrada } from '../../shared/models/interfaces/usuario-entrada';
import { normalizar } from '../../shared/utils/functions';

@Component({
  selector: 'app-cadastro',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  hide = true;
  formCadastro = new FormGroup({
    nome_usuario: new FormControl(''),
    senha_usuario: new FormControl(''),
  });
  confirmar_senha_usuario = new FormControl('');
  constructor(
    public controleService: ControleService,
    private usuarioService: UsuarioService
  ) {}
  compararSenhas() {
    return (
      this.formCadastro.value.senha_usuario ===
      this.confirmar_senha_usuario.value
    );
  }
  cadastrar() {
    if (!this.compararSenhas()) {
      this.controleService.showMessage('As senhas não são iguais');
      return;
    }
    this.formCadastro.controls.nome_usuario.setValue(
      normalizar(this.formCadastro.value.nome_usuario ?? '')
    );
    this.usuarioService.cadastrar(this.formCadastro.value as UsuarioEntrada);
  }
}
