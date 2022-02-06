import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddToDoRoutingModule } from './add-to-do-routing.module';
import { AddToDoComponent } from './components/add-to-do/add-to-do.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {SharedModule} from "../shared/shared.module";
import {MatNativeDateModule} from "@angular/material/core";


@NgModule({
  declarations: [
    AddToDoComponent
  ],
  imports: [
    CommonModule,
    AddToDoRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SharedModule
  ]
})
export class AddToDoModule { }
