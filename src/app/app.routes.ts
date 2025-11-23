import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { DetalharCompra } from './pages/detalhar-compra/detalhar-compra';
import { EditarCompra } from './pages/editar-compra/editar-compra';
import { Extrato } from './pages/extrato/extrato';
import { CriarFatura } from './pages/fatura/criar-fatura/criar-fatura';
import { DetalharFatura } from './pages/fatura/detalhar-fatura/detalhar-fatura';
import { EditarFatura } from './pages/fatura/editar-fatura/editar-fatura';
import { PainelFaturas } from './pages/fatura/painel-faturas/painel-faturas';
import { InserirArquivo } from './pages/inserir-arquivo/inserir-arquivo';
import { InserirCompra } from './pages/inserir-compra/inserir-compra';
import { Cadastro } from './pages/usuario/cadastro/cadastro';
import { Login } from './pages/usuario/login/login';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'extrato', component: Extrato },
  { path: 'inserir-compra', component: InserirCompra },
  { path: 'detalhar-compra', component: DetalharCompra },
  { path: 'editar-compra', component: EditarCompra },
  { path: 'cadastro', component: Cadastro },
  { path: 'painel-faturas', component: PainelFaturas },
  { path: 'criar-fatura', component: CriarFatura },
  { path: 'detalhar-fatura', component: DetalharFatura },
  { path: 'editar-fatura', component: EditarFatura },
  { path: 'inserir-arquivo', component: InserirArquivo },
];
