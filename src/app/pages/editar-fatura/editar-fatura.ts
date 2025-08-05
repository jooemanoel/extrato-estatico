import { Component, LOCALE_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import moment from 'moment';
import { ControleService } from '../../services/controle-service';
import { FaturaService } from '../../services/fatura-service';
import { Fatura } from '../../shared/models/interfaces/fatura';
import { formatarDateParaString } from '../../shared/utils/functions';
import { BR_DATE_FORMATS } from '../../shared/utils/mock';
import { CompraService } from '../../services/compra-service';

@Component({
  selector: 'app-editar-fatura',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [LOCALE_ID, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: BR_DATE_FORMATS },
  ],
  templateUrl: './editar-fatura.html',
  styleUrl: './editar-fatura.css',
})
export class EditarFatura {
  formFatura = new FormGroup({
    codigo_fatura: new FormControl(0),
    nome_fatura: new FormControl(''),
    data_abertura_fatura: new FormControl(),
    data_fechamento_fatura: new FormControl(),
  });
  constructor(
    private controleService: ControleService,
    private faturaService: FaturaService,
    private compraService: CompraService,
    private router: Router
  ) {}
  get carregando() {
    return this.controleService.carregando;
  }
  ngOnInit() {
    this.formFatura.setValue({
      codigo_fatura: this.faturaService.fatura().codigo_fatura,
      nome_fatura: this.faturaService.fatura().nome_fatura,
      data_abertura_fatura: new Date(
        this.faturaService.fatura().data_abertura_fatura.slice(0, 19)
      ),
      data_fechamento_fatura: new Date(
        this.faturaService.fatura().data_fechamento_fatura.slice(0, 19)
      ),
    });
  }
  atualizar() {
    const data_abertura_fatura = moment(
      this.formFatura.value.data_abertura_fatura
    ).toDate();
    const data_fechamento_fatura = moment(
      this.formFatura.value.data_fechamento_fatura
    ).toDate();
    if (data_abertura_fatura.getTime() > data_fechamento_fatura.getTime()) {
      this.controleService.showMessage(
        'A data de abertura não pode ser maior do que a data de fechamento!'
      );
      return;
    }
    const fatura: Fatura = {
      codigo_fatura: this.formFatura.value.codigo_fatura ?? 0,
      nome_fatura: (this.formFatura.value.nome_fatura ?? '').toUpperCase(),
      data_abertura_fatura: formatarDateParaString(data_abertura_fatura),
      data_fechamento_fatura: formatarDateParaString(data_fechamento_fatura),
    };
    this.faturaService.editarFatura(fatura);
    if (this.faturaService.faturaAtiva().codigo_fatura === fatura.codigo_fatura) {
      this.faturaService.faturaAtiva.set(fatura);
      this.compraService.listarCompras();
    }
    this.router.navigateByUrl('painel-faturas');
  }
}
