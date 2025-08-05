import { Routes } from '@angular/router';
import { Cadastro } from './pages/cadastro/cadastro';
import { CriarFatura } from './pages/criar-fatura/criar-fatura';
import { Dashboard } from './pages/dashboard/dashboard';
import { DetalharCompra } from './pages/detalhar-compra/detalhar-compra';
import { DetalharFatura } from './pages/detalhar-fatura/detalhar-fatura';
import { EditarCompra } from './pages/editar-compra/editar-compra';
import { EditarFatura } from './pages/editar-fatura/editar-fatura';
import { Extrato } from './pages/extrato/extrato';
import { InserirCompra } from './pages/inserir-compra/inserir-compra';
import { Login } from './pages/login/login';
import { PainelFaturas } from './pages/painel-faturas/painel-faturas';

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
];
