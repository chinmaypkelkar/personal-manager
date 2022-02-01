import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddExpenditureRoutingModule } from './add-expenditure-routing.module';
import { AddExpenseFormComponent } from './components/add-expense-form/add-expense-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    AddExpenseFormComponent
  ],
  imports: [
    CommonModule,
    AddExpenditureRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatProgressSpinnerModule,
    SharedModule
  ]
})
export class AddExpenditureModule { }
