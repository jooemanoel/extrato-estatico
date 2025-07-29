import { Compra } from '../models/interfaces/compra';

export class Mock {
  static compraVazia(): Compra {
    return {
      codigo_compra: 0,
      descricao_compra: '',
      timestamp_compra: '',
      codigo_categoria_compra: 0,
    };
  }
}
