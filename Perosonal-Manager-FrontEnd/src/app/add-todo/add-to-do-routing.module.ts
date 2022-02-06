import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddToDoComponent} from "./components/add-to-do/add-to-do.component";

const routes: Routes = [
  {
    path:'',
    component: AddToDoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddToDoRoutingModule { }
