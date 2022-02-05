import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { CategoriesComponent } from './components/categories/categories.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    LoaderComponent,
    CategoriesComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  exports:[LoaderComponent, CategoriesComponent],
})
export class SharedModule { }
