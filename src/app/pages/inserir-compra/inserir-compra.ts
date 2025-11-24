import { Component, inject, LOCALE_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import moment from 'moment';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CompraService } from '../../services/compra-service';
import { CategoriaCompra } from '../../shared/models/classes/categoria-compra';
import { ICompra } from '../../shared/models/classes/compra';
import { Currency } from '../../shared/models/classes/currency';
import { Timestamp } from '../../shared/models/classes/timestamp';
import { BR_DATE_FORMATS } from '../../shared/utils/mock';

@Component({
  selector: 'app-inserir-compra',
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
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [LOCALE_ID, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: BR_DATE_FORMATS },
  ],
  templateUrl: './inserir-compra.html',
  styleUrl: './inserir-compra.css',
})
export class InserirCompra {
  private compraService = inject(CompraService);
  private router = inject(Router);

  CategoriaCompra = CategoriaCompra;

  form = new FormGroup({
    fitid: new FormControl(''),
    trntype: new FormControl('PAYMENT'),
    descricao_compra: new FormControl(''),
    valor_compra: new FormControl(),
    data_compra: new FormControl(new Date()),
    codigo_categoria_compra: new FormControl(0),
    codigo_fatura: new FormControl(0),
  });

  adicionar() {
    const compra: ICompra = {
      fitid: '',
      trntype: 'PAYMENT',
      descricao_compra: (this.form.value.descricao_compra ?? '').toUpperCase(),
      data_compra: Timestamp.fromDate(
        moment(this.form.value.data_compra).toDate()
      ).toDateString(),
      valor_compra: Currency.formatValue(this.form.value.valor_compra),
      codigo_categoria_compra: Number(this.form.value.codigo_categoria_compra),
      codigo_fatura: Number(this.form.value.codigo_fatura),
    };
    this.compraService.inserirCompra(compra);
    this.router.navigateByUrl('extrato');
  }
}
