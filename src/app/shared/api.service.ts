import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { TodoCollection } from '../todo/todo.model';
import { initializeApp, database } from 'firebase';
import { Observable } from 'rxjs/Observable';
import { promiseData } from '../../public/mock_data'

@Injectable()
export class ApiService {

  private URL = "https://todolist-c5d0a.firebaseio.com/.json";
  private DATA = "./public/mock_data.json"

  constructor(private http: Http) {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyA0KjaMLz-ZbbhjGZJzKihPdI5pw9o1J50",
      authDomain: "todolist-c5d0a.firebaseapp.com",
      databaseURL: "https://todolist-c5d0a.firebaseio.com",
      storageBucket: "todolist-c5d0a.appspot.com",
      messagingSenderId: "940581390484"
    };
    initializeApp(config);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  fetchTodo(): Observable<TodoCollection> {
    return this.http.get(this.DATA)
                    .map(this.extractData)
                    .catch(this.handleError)
  }

  addTodo (name: string, color: string, dueDate: string): Observable<TodoCollection> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.DATA, { name, color, dueDate }, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  fbGetData(default_data: any) {
    database().ref('/').on('child_added', (snapshot) => {
      return default_data.push(snapshot.val())
    })
  }

  fbPostData(name, belt) {
    return database().ref('/').push({name: name, belt: belt});
  }

  getPromise() {
    return Promise.resolve(promiseData)
  }

  addPromise(name: string, color: string, dueDate: string) {
    console.log("hello")
    return promiseData.push({name, color, dueDate});
  }

  deletePromise(name: string) {
    return promiseData.splice(name, 1);
  }
};
