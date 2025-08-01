import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CompraService } from '../../services/compra-service';
import { Compra } from '../../shared/models/interfaces/compra';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-compra',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    CurrencyMaskModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './editar-compra.html',
  styleUrl: './editar-compra.css',
})
export class EditarCompra {
  formCompra = new FormGroup({
    codigo_compra: new FormControl(0),
    descricao_compra: new FormControl(''),
    valor_compra: new FormControl(),
    data_compra: new FormControl(new Date()),
    codigo_categoria_compra: new FormControl(1),
  });
  constructor(
    private compraService: CompraService,
    private router: Router
  ) {}
  get compra() {
    return this.compraService.compra;
  }
  ngOnInit() {
    this.formCompra.setValue({
      codigo_compra: this.compra().codigo_compra ?? 0,
      descricao_compra: this.compra().descricao_compra,
      valor_compra: this.compra().valor_compra,
      data_compra: new Date(this.compra().data_compra.slice(0, 19)),
      codigo_categoria_compra: this.compra().codigo_categoria_compra,
    });
  }
  getDataFormatada(data: Date = new Date()) {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }
  atualizar() {
    const compra: Compra = {
      codigo_compra: this.formCompra.value.codigo_compra ?? 0,
      descricao_compra: (
        this.formCompra.value.descricao_compra ?? ''
      ).toUpperCase(),
      data_compra: this.getDataFormatada(
        this.formCompra.value.data_compra ?? new Date()
      ),
      valor_compra: `${this.formCompra.value.valor_compra ?? 0}`,
      codigo_categoria_compra:
        this.formCompra.value.codigo_categoria_compra ?? 1,
    };
    this.compraService.editarCompra(compra);
    this.router.navigateByUrl('extrato');
  }
  codigosCategoriaCompra() {
    return Object.keys(this.compraService.categoriaCompra).map((x) =>
      parseInt(x)
    );
  }
  categoriaCompra(codigo: number) {
    return this.compraService.categoriaCompra[codigo];
  }
}
