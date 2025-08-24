import { Compra, ICompra } from './compra';
import { Currency } from './currency';

export class ListaCompras {
  compras: Compra[] = [];
  valorTotal = new Currency(0);
  constructor(compras: ICompra[] = []) {
    this.compras = compras.map((compra) => Compra.fromDTO(compra));
  }
  calcularValorTotal() {
    this.valorTotal.setValue(
      this.compras.reduce((acc, compra) => acc + compra.valor_compra.value, 0)
    );
    return this.valorTotal.toBrl();
  }
  somaCategoria(codigo_categoria_compra: number) {
    return new Currency(
      this.compras
        .filter(
          (compra) =>
            !codigo_categoria_compra ||
            compra.categoria_compra.codigo === codigo_categoria_compra
        )
        .reduce((acc, compra) => acc + compra.valor_compra.value, 0)
    ).toBrl();
  }
  listarPorCategoria(codigo_categoria_compra: number) {
    return this.compras.filter(
      (compra) =>
        !codigo_categoria_compra ||
        compra.categoria_compra.codigo === codigo_categoria_compra
    );
  }
}
