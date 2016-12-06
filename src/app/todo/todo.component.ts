import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TodoCollection } from './todo.model'
import { ApiService } from "../shared";


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit {
  errorMsg: string;
  todos: TodoCollection[]
  mode = 'Observable';

  constructor(private route: ActivatedRoute, private ApiService: ApiService) {}

  ngOnInit() {
    // this.fetchTodo();
    this.getPromise();
  }

  fetchTodo() {
    this.ApiService.fetchTodo()
                    .subscribe(
                      data => this.todos = data,
                      error => this.errorMsg = <any>error);
    // this.ApiService.fbGetData(this.todos);
  }

  addTodo (name: string, color: string, dueDate: string) {
    if (!name || !color || !dueDate) { return; }
    this.ApiService.addTodo(name, color, dueDate)
                     .subscribe(
                       data  => this.todos.push(data),
                       error =>  this.errorMsg = <any>error);
    // this.ApiService.fbPostData(name, belt);
  }

  getPromise() {
    this.ApiService.getPromise().then(data => this.todos = data);
  }

  addPromise(name: string, color: string, dueDate: string) {
    this.ApiService.addPromise(name, color, dueDate);
  }

  deletePromise(name: string) {
    this.ApiService.deletePromise(name);
  }

}
