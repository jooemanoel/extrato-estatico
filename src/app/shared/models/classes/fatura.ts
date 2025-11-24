import { Timestamp } from './timestamp';

export interface IFatura {
  codigo_fatura: number;
  nome_fatura: string;
  data_abertura_fatura: string;
  data_fechamento_fatura: string;
}

export class Fatura {
  constructor(
    readonly codigo_fatura = 0,
    readonly nome_fatura = '',
    readonly data_abertura_fatura = new Timestamp(),
    readonly data_fechamento_fatura = new Timestamp()
  ) {}

  toDTO(): IFatura {
    return {
      codigo_fatura: this.codigo_fatura,
      nome_fatura: this.nome_fatura,
      data_abertura_fatura: this.data_abertura_fatura.toString(),
      data_fechamento_fatura: this.data_fechamento_fatura.toString(),
    };
  }

  static fromDTO(fatura: Partial<IFatura> = {}) {
    return new Fatura(
      fatura.codigo_fatura,
      fatura.nome_fatura,
      new Timestamp(fatura.data_abertura_fatura),
      new Timestamp(fatura.data_fechamento_fatura)
    );
  }

  static faturaAvulsa(): Fatura {
    return new Fatura(
      0,
      'SEM FATURA',
      Timestamp.fromDate(new Date(0)),
      Timestamp.fromDate(new Date(0))
    );
  }
}
