import { Component, LOCALE_ID } from '@angular/core';
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
import { Compra } from '../../shared/models/interfaces/compra';
import { formatarDateParaString } from '../../shared/utils/functions';
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
  formCompra = new FormGroup({
    codigo_compra: new FormControl(0),
    descricao_compra: new FormControl(''),
    valor_compra: new FormControl(),
    data_compra: new FormControl(new Date()),
    codigo_categoria_compra: new FormControl(1),
  });
  constructor(private compraService: CompraService, private router: Router) {}
  adicionar() {
    const compra: Compra = {
      codigo_compra: 0,
      descricao_compra: (
        this.formCompra.value.descricao_compra ?? ''
      ).toUpperCase(),
      data_compra: formatarDateParaString(
        moment(this.formCompra.value.data_compra).toDate()
      ),
      valor_compra: `${this.formCompra.value.valor_compra ?? 0}`,
      codigo_categoria_compra:
        this.formCompra.value.codigo_categoria_compra ?? 1,
    };
    this.compraService.inserirCompra(compra);
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
