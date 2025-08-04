import { Compra } from '../models/interfaces/compra';
import { Fatura } from '../models/interfaces/fatura';

export class Mock {
  static compraVazia(): Compra {
    return {
      codigo_compra: 0,
      descricao_compra: '',
      valor_compra: '',
      data_compra: '',
      codigo_categoria_compra: 0,
    };
  }
  static faturaVazia(): Fatura {
    return {
      codigo_fatura: 0,
      nome_fatura: '',
      data_abertura_fatura: '',
      data_fechamento_fatura: '',
    };
  }
}

import { MatDateFormats } from '@angular/material/core';

export const BR_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
