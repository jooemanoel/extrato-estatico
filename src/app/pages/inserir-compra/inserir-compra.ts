import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CompraService } from '../../services/compra-service';
import { ControleService } from '../../services/controle-service';
import { Compra } from '../../shared/models/interfaces/compra';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-inserir-compra',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    NgxMaskDirective,
  ],
  providers: [provideNativeDateAdapter(), provideNgxMask()],
  templateUrl: './inserir-compra.html',
  styleUrl: './inserir-compra.css',
})
export class InserirCompra {
  formCompra = new FormGroup({
    codigo_compra: new FormControl(0),
    descricao_compra: new FormControl(''),
    valor_compra: new FormControl(),
    data_compra: new FormControl(new Date()),
    codigo_categoria_compra: new FormControl(1),
  });
  constructor(
    private compraService: CompraService,
    private controleService: ControleService
  ) {
    this.formCompra.controls.data_compra.valueChanges.subscribe((x) =>
      console.log(x)
    );
  }
  getDataFormatada(data: Date = new Date()) {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }
  adicionar() {
    const compra: Compra = {
      descricao_compra: this.formCompra.value.descricao_compra ?? '',
      data_compra: this.getDataFormatada(
        this.formCompra.value.data_compra ?? new Date()
      ),
      valor_compra: `${this.formCompra.value.valor_compra ?? 0}`,
      codigo_categoria_compra:
        this.formCompra.value.codigo_categoria_compra ?? 1,
    };
    console.log(compra);
    this.compraService.inserirCompra(compra);
    this.controleService.navegar('dashboard');
  }
}
