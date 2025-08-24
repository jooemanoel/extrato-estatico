import { Fatura, IFatura } from './fatura';

export class ListaFaturas {
  faturas: Fatura[] = [];
  faturaAtiva: Fatura = Fatura.fromDTO();
  constructor(faturas: IFatura[] = []) {
    this.faturas = faturas.map((x) => Fatura.fromDTO(x));
  }
}
