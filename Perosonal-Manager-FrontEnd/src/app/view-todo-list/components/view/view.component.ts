import { Component, OnInit } from '@angular/core';
import {TodoService} from "../../../shared/services/todo.service";
import {catchError, Observable, tap} from "rxjs";
import {LoadingService} from "../../../shared/services/loading.service";
import {ToastService} from "../../../shared/services/toast.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit{

  todoList$!: Observable<string[]>;
  loading$!: Observable<boolean>;
  constructor(private readonly _todoService: TodoService,
              private readonly _loadingService: LoadingService,
              private readonly _toastService: ToastService,) {

  }

  ngOnInit(): void {
    this.loading$ = this._loadingService.loading$;
  }

  onSubmit(createdDate: Date){
    this._loadingService.setLoader(true);
    this.todoList$ = this._todoService.getFilteredTodoList(createdDate).pipe(
      tap(() =>  this._loadingService.setLoader(false)),
      catchError((e) => {
        this._toastService.open('Error in sending request');
        this._loadingService.setLoader(false);
        throw e;
      })
    );
  }



}
