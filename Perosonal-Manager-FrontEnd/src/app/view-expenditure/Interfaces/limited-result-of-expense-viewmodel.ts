import {ExpenseList} from "./expense-list";

export class LimitedResultOfExpenseViewModel{
  expenses!: ExpenseList[];
  total!: number;
  pageIndex: number = 0;
  pageSize: number = 5;
}
