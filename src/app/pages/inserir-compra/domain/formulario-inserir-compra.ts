import { FormControl, FormGroup } from '@angular/forms';
import moment from 'moment';
import { ICompra } from '../../../shared/models/classes/compra';
import { Currency } from '../../../shared/models/classes/currency';
import { Timestamp } from '../../../shared/models/classes/timestamp';

export class FormularioInserirCompra {
  formGroup = new FormGroup({
    fitid: new FormControl(''),
    descricao_compra: new FormControl(''),
    valor_compra: new FormControl(),
    data_compra: new FormControl(new Date()),
    codigo_categoria_compra: new FormControl(1),
    codigo_fatura: new FormControl(0),
  });

  valorFormulario(): ICompra {
    return {
      fitid: String(this.formGroup.value.fitid),
      trntype: 'PAYMENT',
      descricao_compra: String(
        this.formGroup.value.descricao_compra
      ).toUpperCase(),
      data_compra: Timestamp.fromDate(
        moment(this.formGroup.value.data_compra).toDate()
      ).toDateString(),
      valor_compra: Currency.formatValue(this.formGroup.value.valor_compra),
      codigo_categoria_compra: Number(
        this.formGroup.value.codigo_categoria_compra
      ),
      codigo_fatura: Number(this.formGroup.value.codigo_fatura),
    };
  }
}
