import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ControleService } from '../../services/controle-service';
import { CompraService } from '../../services/compra-service';
import { Compra } from '../../shared/models/interfaces/compra';

@Component({
  selector: 'app-inserir-compra',
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './inserir-compra.html',
  styleUrl: './inserir-compra.css'
})
export class InserirCompra {
  formCompra = new FormGroup({
    codigo_compra: new FormControl(0),
    descricao_compra: new FormControl('', Validators.required.bind(this)),
    valor_compra: new FormControl(undefined, Validators.required.bind(this)),
    timestamp_compra: new FormControl(),
    codigo_categoria_compra: new FormControl(1)
  });
  constructor(private compraService: CompraService, private controleService: ControleService) {}
  formatter = new Intl.DateTimeFormat('pt-BR', {
  timeZone: 'America/Sao_Paulo',
  dateStyle: 'full',
  timeStyle: 'long',
});
formatDateForPostgres(date = new Date()) {
  const pad = (n: number) => String(n).padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // meses começam do zero
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
  adicionar() {
    this.compraService.inserirCompra({...this.formCompra.value as Compra, timestamp_compra: this.formatDateForPostgres()});
    this.controleService.navegar('dashboard');
  }
}
