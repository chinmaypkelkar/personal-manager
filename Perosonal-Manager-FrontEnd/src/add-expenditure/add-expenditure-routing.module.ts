import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddExpenseFormComponent} from "./components/add-expense-form/add-expense-form.component";

const routes: Routes = [
  {
    path:'',
  component: AddExpenseFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddExpenditureRoutingModule { }
