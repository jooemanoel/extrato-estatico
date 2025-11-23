import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ControleService } from '../../services/controle-service';
import { OfxResponse } from '../../shared/models/interfaces/dados.ofx';

@Component({
  selector: 'app-inserir-arquivo',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './inserir-arquivo.html',
  styleUrl: './inserir-arquivo.css',
})
export class InserirArquivo {
  http = inject(HttpClient);
  controleService = inject(ControleService);
  resposta: string | null = null;

  lerArquivo(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const form = new FormData();
    form.append('file', input.files[0]);

    console.log('Arquivo dentro do FormData:', form.get('file'));

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
