import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'empresa/:id',
    loadChildren: () => import('./empresa/empresa.module').then( m => m.EmpresaPageModule)
  },
  {
    path: 'empresa/add',
    loadChildren: () => import('./create-or-update/create-or-update.module').then( m => m.CreateOrUpdatePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
