import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  form!: FormGroup;
  @Output() onSubmit:EventEmitter<object> = new EventEmitter<object>();
  constructor(private readonly _fb: FormBuilder) { }

  ngOnInit(): void {
  this.initForm();
  }

  initForm(){
    this.form = this._fb.group({
      category: [[]],
      startDate: [null],
      endDate: [null]
    })
  }

  submit(){
    this.onSubmit.emit({categoryIds:this.form.get('category')?.value,
    startDate: this.form.get('startDate')?.value,
      endDate: this.form.get('endDate')?.value
    })
  }
}
