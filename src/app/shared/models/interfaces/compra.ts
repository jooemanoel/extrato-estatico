import { Currency } from "../classes/currency";
import { Timestamp } from "../classes/timestamp";

export interface ICompra {
  codigo_compra: number;
  descricao_compra: string;
  valor_compra: number;
  data_compra: string;
  codigo_categoria_compra: number;
}

export class Compra {
  codigo_compra = 0;
  descricao_compra = '';
  valor_compra = new Currency(0);
  data_compra = new Timestamp();
  codigo_categoria_compra = 0;
  constructor(compra: Partial<ICompra> = {}) {
    if (compra.codigo_compra) {
      this.codigo_compra = compra.codigo_compra;
    }
    if (compra.descricao_compra) {
      this.descricao_compra = compra.descricao_compra;
    }
    if (compra.valor_compra) {
      this.valor_compra.setValue(compra.valor_compra);
    }
    if (compra.data_compra) {
      this.data_compra = new Timestamp(compra.data_compra);
    }
    if (compra.codigo_categoria_compra) {
      this.codigo_categoria_compra = compra.codigo_categoria_compra;
    }
  }
}