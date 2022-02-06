import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TodoRequest} from "../../add-todo/interfaces/todo-request";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly headers: HttpHeaders;
  private backendBaseUrl: string = "http://localhost:5010/ToDoList";
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  public add(request: TodoRequest): Observable<number>{
    return this.http.post<number>(`${this.backendBaseUrl}/AddTodoItem`, request, {headers: this.headers})
  }
}
