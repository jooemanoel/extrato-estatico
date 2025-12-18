import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { CompraService } from '../../services/compra-service';
import { ControleService } from '../../services/controle-service';
import { ICompra } from '../../shared/models/classes/compra';
import {
  OfxData,
  OfxTransacao,
} from '../../shared/models/interfaces/dados.ofx';
import { FaturaService } from '../fatura/fatura-service';

type XmlJson =
  | string // valor de texto
  | null // sem conteúdo
  | { [key: string]: XmlJson | XmlJson[] }; // objeto com filhos

@Component({
  selector: 'app-inserir-arquivo',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  templateUrl: './inserir-arquivo.html',
  styleUrl: './inserir-arquivo.css',
})
export class InserirArquivo {
  controleService = inject(ControleService);
  faturaService = inject(FaturaService);
  compraService = inject(CompraService);
  http = inject(HttpClient);
  router = inject(Router);

  codigo_fatura = new FormControl(0);
  excluir_compras_anteriores = new FormControl(true);

  resposta: string | null = null;

  xmlToJson(node: Node): XmlJson {
    // Nó de texto
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.nodeValue?.trim() ?? '';
      return text === '' ? null : text;
    }

    const obj: Record<string, XmlJson | XmlJson[]> = {};
    let hasElementChildren = false;

    for (const child of Array.from(node.childNodes)) {
      // Texto direto dentro de um elemento → retorna string simples
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.nodeValue?.trim() ?? '';
        if (text !== '') {
          return text; // agora sim retorna da função inteira
        }
        continue;
      }

      hasElementChildren = true;
      const name = child.nodeName;
      const value = this.xmlToJson(child);

      if (value === null || value === '') continue;

      if (obj[name]) {
        if (!Array.isArray(obj[name])) {
          obj[name] = [obj[name]];
        }
        (obj[name] as XmlJson[]).push(value);
      } else {
        obj[name] = value;
      }
    }

    return hasElementChildren ? obj : null;
  }

  async lerArquivo(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const text = await input.files[0].text();

    const xmlString = '<OFX>'.concat(text.split('<OFX>')[1]);

    const dom = new DOMParser().parseFromString(xmlString, 'text/xml');

    if (dom.getElementsByTagName('parsererror').length > 0) {
      this.resposta =
        '⚠ OFX contém erros estruturais, revise o XML gerado.\n\n' + xmlString;
      return;
    }

    const json = this.xmlToJson(dom.documentElement) as unknown as OfxData;

    const compras: OfxTransacao[] =
      json?.CREDITCARDMSGSRSV1?.CCSTMTTRNRS?.CCSTMTRS?.BANKTRANLIST?.STMTTRN ||
      [];

    const comprasParaInserir: ICompra[] = compras
      .filter((compra) => !compra.MEMO?.startsWith('PGTO'))
      .map((transacao) => this.criarCompra(transacao));

    console.log('comprasParaInserir', comprasParaInserir);

    this.resposta = JSON.stringify(comprasParaInserir, null, 2);

    if (this.excluir_compras_anteriores.value) this.apagarComprasFatura();

    this.compraService.inserirCompras(comprasParaInserir);
    this.router.navigateByUrl('dashboard');
  }

  criarCompra(ofxTransacao: OfxTransacao) {
    const compra: ICompra = {
      fitid: String(ofxTransacao.FITID),
      trntype: String(ofxTransacao.TRNTYPE),
      descricao_compra: String(ofxTransacao.MEMO),
      valor_compra: Math.round(Number(ofxTransacao.TRNAMT) * 100),
      data_compra: this.formatarData(String(ofxTransacao.DTPOSTED)),
      codigo_categoria_compra: 0,
      codigo_fatura: Number(this.codigo_fatura.value),
    };
    return compra;
  }

  formatarData(dt: string) {
    const clean = dt.replace(/[[\]-].*$/, '');
    return `${clean.substring(0, 4)}-${clean.substring(4, 6)}-${clean.substring(
      6,
      8
    )}`;
  }

  apagarComprasFatura() {
    const codigo_fatura = Number(this.codigo_fatura.value);
    this.compraService.apagarComprasPorFatura(codigo_fatura);
  }
}
