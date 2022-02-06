import {Component, Input} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Observable} from "rxjs";
import {Category} from "../../../add-expenditure/interfaces/category";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categories$: Observable<Category[]>;
  @Input() categoryFormControl!: FormControl;
  @Input() multiple: boolean = false;
  constructor(private readonly _categoryService: CategoryService) {
    this.categories$ = this._categoryService.getCategories();
  }
}
