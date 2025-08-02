import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { DetalharCompra } from './pages/detalhar-compra/detalhar-compra';
import { EditarCompra } from './pages/editar-compra/editar-compra';
import { InserirCompra } from './pages/inserir-compra/inserir-compra';
import { Extrato } from './pages/extrato/extrato';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'extrato', component: Extrato },
  { path: 'inserir-compra', component: InserirCompra },
  { path: 'detalhar-compra', component: DetalharCompra },
  { path: 'editar-compra', component: EditarCompra },
  { path: 'login', component: Login },
  { path: 'cadastro', component: Cadastro },
];
