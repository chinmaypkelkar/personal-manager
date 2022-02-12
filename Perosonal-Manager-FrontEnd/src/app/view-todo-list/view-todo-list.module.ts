import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewTodoListRoutingModule } from './view-todo-list-routing.module';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFilterComponent } from './components/todo-filter/todo-filter.component';
import { ViewComponent } from './components/view/view.component';
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatNativeDateModule} from "@angular/material/core";
import {MatListModule} from "@angular/material/list";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    TodoListComponent,
    TodoFilterComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    ViewTodoListRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    SharedModule,
  ]
})
export class ViewTodoListModule { }
