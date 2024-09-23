import { Routes } from '@angular/router';
import { MainComponent } from './screens/main/main.component';
import { LoginComponent } from './screens/login/login.component';
import { RegisterComponent } from './screens/register/register.component';
import { AppComponent } from './app.component';
import { TodoComponent } from './screens/todo/todo.component';
export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'home', component: MainComponent },
  { path: 'home/Todo', component: TodoComponent },
  {
    path: 'login', component: LoginComponent,
  },
  { path: 'register', component: RegisterComponent, 
  }
];
