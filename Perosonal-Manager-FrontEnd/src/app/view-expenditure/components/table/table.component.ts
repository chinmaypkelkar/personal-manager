import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PageEvent} from "@angular/material/paginator/paginator";
import {LimitedResultOfExpenseViewModel} from "../../Interfaces/limited-result-of-expense-viewmodel";
import {LocalFilterParameters} from "../../Interfaces/local-filter-parameters";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent{
  @Input() limitedResultOfExpenseViewModel!: LimitedResultOfExpenseViewModel;
  @Output() pageChange: EventEmitter<LocalFilterParameters> = new EventEmitter<LocalFilterParameters>();
  columns: string[] = ['expense', 'amount', 'createdDate'];

  onPageChange(page: PageEvent){
    this.pageChange.emit({pageIndex: page.pageIndex, pageSize: page.pageSize})
  }
}
