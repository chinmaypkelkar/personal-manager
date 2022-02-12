import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/add-expense',
    pathMatch: 'full'
  },
  {
    path: 'add-expense',
    loadChildren: () => import('./add-expenditure/add-expenditure.module').then(m=>m.AddExpenditureModule)
  },
  {
    path: 'view-expense',
    loadChildren: () => import('./view-expenditure/view-expenditure.module').then(m=>m.ViewExpenditureModule)
  },
  {
    path: 'add-todo',
    loadChildren: () => import('./add-todo/add-to-do.module').then(m=>m.AddToDoModule)
  },
  {
    path: 'view-todo',
    loadChildren: () => import('./view-todo-list/view-todo-list.module').then(m=>m.ViewTodoListModule)
  }
]


@NgModule({
  imports :[
    RouterModule.forRoot(routes),
  ],
  exports:[RouterModule]
})
export class AppRoutingModule{}
