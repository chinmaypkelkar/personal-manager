import { Component } from '@angular/core';
import {TabItem} from "./tab-item";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public tabs: TabItem[];

  constructor() {
    this.tabs = [{
      label : 'Add Expense',
      route : '/add-expense'
    },
      {
        label : 'View Expenses',
        route : '/view-expense'
      }]
  }
}
