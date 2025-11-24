import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ControleService } from '../../services/controle-service';
import { OfxResponse } from '../../shared/models/interfaces/dados.ofx';
import { FaturaService } from '../fatura/fatura-service';

@Component({
  selector: 'app-inserir-arquivo',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './inserir-arquivo.html',
  styleUrl: './inserir-arquivo.css',
})
export class InserirArquivo {
  controleService = inject(ControleService);
  faturaService = inject(FaturaService);
  http = inject(HttpClient);

  codigo_fatura = new FormControl(0);

  resposta: string | null = null;

  lerArquivo(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const form = new FormData();
    form.append('file', input.files[0]);
    form.append('codigo_fatura', Number(this.codigo_fatura.value).toString());

    console.log('Arquivo dentro do FormData:', form.get('file'));

    this.resposta = null;

    this.http
      .post<OfxResponse>('http://localhost:8080/ofx', form, {
        headers: this.controleService.headers(),
      })
      .subscribe({
        next: (data) => {
          this.resposta = JSON.stringify(data, null, 2);
          console.log(data);
        },
        error: (err) => console.error(err),
      });
  }
}
