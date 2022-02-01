import {Component, Input} from '@angular/core';
import {ExpenseList} from "../../Interfaces/expense-list";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent{

  @Input() expenseList!: ExpenseList[];
  columns: string[] = ['expense', 'amount', 'createdDate'];
}
