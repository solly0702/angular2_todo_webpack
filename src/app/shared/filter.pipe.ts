import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(todos: string[], term: string): any {
    if(term === undefined) return todos;
    return _.filter(todos, (todo) => {
      return _.includes(_.toLower(todo.name), _.toLower(term));
    })
  }
}
