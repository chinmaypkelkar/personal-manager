import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewExpenditureRoutingModule } from './view-expenditure-routing.module';
import { FilterComponent } from './components/filter/filter.component';
import { TableComponent } from './components/table/table.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { ViewComponent } from './components/view/view.component';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatTableModule} from "@angular/material/table";
import {GoogleChartsModule} from "angular-google-charts";
import {HighchartsChartModule} from "highcharts-angular";
import {ChartModule} from "angular-highcharts";


@NgModule({
  declarations: [
    FilterComponent,
    TableComponent,
    PieChartComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    ViewExpenditureRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    ChartModule

  ]
})
export class ViewExpenditureModule { }
