import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'todo', component: TodoComponent }
];

export const routing = RouterModule.forRoot(routes);
