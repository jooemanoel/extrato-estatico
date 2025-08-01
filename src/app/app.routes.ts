import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { DetalharCompra } from './pages/detalhar-compra/detalhar-compra';
import { EditarCompra } from './pages/editar-compra/editar-compra';
import { InserirCompra } from './pages/inserir-compra/inserir-compra';
import { Extrato } from './pages/extrato/extrato';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'extrato', component: Extrato },
  { path: 'inserir-compra', component: InserirCompra },
  { path: 'detalhar-compra', component: DetalharCompra },
  { path: 'editar-compra', component: EditarCompra },
];
