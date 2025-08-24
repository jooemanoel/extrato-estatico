import { CategoriaCompra } from './categoria-compra';
import { Currency } from './currency';
import { Timestamp } from './timestamp';

export interface ICompra {
  codigo_compra: number;
  descricao_compra: string;
  valor_compra: number;
  data_compra: string;
  codigo_categoria_compra: number;
}

export class Compra {
  constructor(
    readonly codigo_compra = 0,
    readonly descricao_compra = '',
    readonly valor_compra = new Currency(0),
    readonly data_compra = new Timestamp(),
    readonly categoria_compra = CategoriaCompra.fromCodigo(0)
  ) {}
  static fromDTO(compra: Partial<ICompra> = {}) {
    return new Compra(
      compra.codigo_compra ?? 0,
      compra.descricao_compra ?? '',
      new Currency(compra.valor_compra ?? 0),
      compra.data_compra ? new Timestamp(compra.data_compra) : new Timestamp(),
      CategoriaCompra.fromCodigo(compra.codigo_categoria_compra ?? 0)
    );
  }
}
