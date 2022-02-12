import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.css']
})
export class TodoFilterComponent implements OnInit {

  form!: FormGroup;
  @Output() onSubmit:EventEmitter<Date> = new EventEmitter<Date>();
  constructor(private readonly _fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.form = this._fb.group({
      createdDate: [null],
    })
  }

  submit(){
    this.onSubmit.emit(this.form.get('createdDate')?.value);
  }

}
