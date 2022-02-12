import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

  @Input() toDoList!: string[];
  columns: string[] = ["To Do List"];

  testList: string[] = ["tete","afdf","asasd"];
}
