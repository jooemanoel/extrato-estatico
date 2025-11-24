import { Component, inject, LOCALE_ID, OnInit } from '@angular/core';
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
import { FaturaService } from '../fatura/fatura-service';

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
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [LOCALE_ID, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: BR_DATE_FORMATS },
  ],
  templateUrl: './editar-compra.html',
  styleUrl: './editar-compra.css',
})
export class EditarCompra implements OnInit {
  router = inject(Router);
  compraService = inject(CompraService);
  faturaService = inject(FaturaService);

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

  ngOnInit() {
    this.form.setValue({
      fitid: this.compraService.compra().fitid,
      trntype: this.compraService.compra().trntype,
      descricao_compra: this.compraService.compra().descricao_compra,
      valor_compra: this.compraService.compra().valor_compra.value / 100,
      data_compra: this.compraService.compra().data_compra,
      codigo_categoria_compra:
        this.compraService.compra().categoria_compra.codigo,
      codigo_fatura: this.compraService.compra().codigo_fatura,
    });
  }

  atualizar() {
    console.log('editar-compra-component', this.form.value);
    const compra: ICompra = {
      fitid: String(this.form.value.fitid),
      trntype: String(this.form.value.trntype),
      descricao_compra: (this.form.value.descricao_compra ?? '').toUpperCase(),
      data_compra: Timestamp.fromDate(
        moment(this.form.value.data_compra).toDate()
      ).toDateString(),
      valor_compra: Currency.formatValue(this.form.value.valor_compra),
      codigo_categoria_compra: Number(this.form.value.codigo_categoria_compra),
      codigo_fatura: Number(this.form.value.codigo_fatura),
    };
    this.compraService.editarCompra(compra);
    this.router.navigateByUrl('extrato');
  }
}
