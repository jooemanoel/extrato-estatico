import { Routes } from '@angular/router';
import { CriarFatura } from './features/fatura/criar-fatura/criar-fatura';
import { DetalharFatura } from './features/fatura/detalhar-fatura/detalhar-fatura';
import { EditarFatura } from './features/fatura/editar-fatura/editar-fatura';
import { PainelFaturas } from './features/fatura/painel-faturas/painel-faturas';
import { Cadastro } from './features/usuario/cadastro/cadastro';
import { Login } from './features/usuario/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { DetalharCompra } from './pages/detalhar-compra/detalhar-compra';
import { EditarCompra } from './pages/editar-compra/editar-compra';
import { Extrato } from './pages/extrato/extrato';
import { InserirCompra } from './pages/inserir-compra/inserir-compra';

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
