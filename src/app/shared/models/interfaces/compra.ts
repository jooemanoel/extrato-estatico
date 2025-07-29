export interface Compra extends Record<string, unknown> {
  codigo_compra?: number;
  descricao_compra: string;
  valor_compra: string;
  data_compra: string;
  codigo_categoria_compra: number;
}

export interface CategoriaCompra extends Record<string, string> {
  codigo_categoria_compra: string;
  nome_categoria_compra: string;
}