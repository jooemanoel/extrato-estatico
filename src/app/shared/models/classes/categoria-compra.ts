export class CategoriaCompra {
  private constructor(
    readonly codigo: number,
    readonly nome: string,
    readonly icon: string
  ) {}

  static readonly MERCADO = new CategoriaCompra(1, 'MERCADO', 'shopping_cart');
  static readonly SAUDE = new CategoriaCompra(2, 'SAÚDE', 'local_hospital');
  static readonly TRANSPORTE = new CategoriaCompra(3, 'TRANSPORTE', 'directions_bus');
  static readonly LAZER = new CategoriaCompra(4, 'LAZER', 'mood');
  static readonly VARIEDADES = new CategoriaCompra(5, 'VARIEDADES', 'shopping_bag');
  static readonly EDUCACAO = new CategoriaCompra(6, 'EDUCAÇÃO', 'school');
  static readonly INTERNET = new CategoriaCompra(7, 'INTERNET', 'wifi_calling_bar_3');

  static readonly values = [
    CategoriaCompra.MERCADO,
    CategoriaCompra.SAUDE,
    CategoriaCompra.TRANSPORTE,
    CategoriaCompra.LAZER,
    CategoriaCompra.VARIEDADES,
    CategoriaCompra.EDUCACAO,
    CategoriaCompra.INTERNET,
  ];

  static fromCodigo(codigo: number): CategoriaCompra {
    return this.values.find(c => c.codigo === codigo) 
      ?? new CategoriaCompra(0, 'DESCONHECIDO', 'help');
  }

  equals(other: CategoriaCompra): boolean {
    return this.codigo === other.codigo;
  }
}