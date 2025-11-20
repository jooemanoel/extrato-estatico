import { CategoriaCompra } from './categoria-compra';
import { Currency } from './currency';
import { Data } from './data';

export interface ICompra {
  fitid: string;
  trntype: string;
  descricao_compra: string;
  valor_compra: number;
  data_compra: string;
  codigo_categoria_compra: number;
}

export class Compra {
  constructor(
    readonly fitid = '',
    readonly trntype = '',
    readonly descricao_compra = '',
    readonly valor_compra = new Currency(0),
    readonly data_compra = new Data(),
    readonly categoria_compra = CategoriaCompra.fromCodigo(0)
  ) {}
  static fromDTO(compra: Partial<ICompra> = {}) {
    return new Compra(
      compra.fitid ?? '',
      compra.trntype ?? '',
      compra.descricao_compra ?? '',
      new Currency(compra.valor_compra ?? 0),
      new Data(compra.data_compra),
      CategoriaCompra.fromCodigo(compra.codigo_categoria_compra ?? 0)
    );
  }
}
