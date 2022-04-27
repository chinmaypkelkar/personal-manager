import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'
import {SignInComponent} from "./registration/components/sign-in/sign-in.component";
import {SignUpComponent} from "./registration/components/sign-up/sign-up.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'logout',
    component: SignInComponent
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
