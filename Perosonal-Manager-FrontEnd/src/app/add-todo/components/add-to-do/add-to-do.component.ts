import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {catchError, Observable, of} from "rxjs";
import {LoadingService} from "../../../shared/services/loading.service";
import {ToastService} from "../../../shared/services/toast.service";
import {TodoService} from "../../../shared/services/todo.service";
import {TodoRequest} from "../../interfaces/todo-request";

@Component({
  selector: 'app-add-to-do',
  templateUrl: './add-to-do.component.html',
  styleUrls: ['./add-to-do.component.css']
})
export class AddToDoComponent implements OnInit {
  toDoForm!: FormGroup;
  loading$!: Observable<boolean>;
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  constructor(private readonly _loadingService: LoadingService,
              private readonly _toastService: ToastService,
              private readonly _formBuilder: FormBuilder,
              private  readonly _todoService: TodoService) { }

  ngOnInit(): void {
    this.loading$ = this._loadingService.loading$;
    this.initForm();
  }

  initForm(){
    this.toDoForm = this._formBuilder.group({
      name: [null, Validators.required],
      createdDate: ['', Validators.required],
    })
  }

  submit(){
    this._loadingService.setLoader(true);
    let toDoRequest: TodoRequest = {
      name: this.toDoForm.get('name')?.value,
      createdDate: this.toDoForm.get('createdDate')?.value
    }

    this._todoService.addTodoItem(toDoRequest)
      .pipe(
        catchError((err) => {
          this._toastService.open('Error in sending request');
          this._loadingService.setLoader(false);
          setTimeout(() => this.formGroupDirective.resetForm(), 200);
          throw err;
        })
      ).subscribe((value) => {
      if(value){
        this._toastService.open('Success');
        this._loadingService.setLoader(false);
        setTimeout(() => this.formGroupDirective.resetForm(), 200);
      }
    });
  }
}
