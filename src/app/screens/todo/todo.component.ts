import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../../../interfaces/Todo';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from "../../components/todo-item/todo-item.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { ServerTodos } from '../../../interfaces/ServerTodos';
@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, NavbarComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  todos:ServerTodos[]=[]
  loading:Boolean = true;
  error:Boolean = false;
  errorMsg:string = ""
  constructor(private http: HttpClient) {}
  ngOnInit():void{
    this.fetchTodos()
  }
  isDone(id:string):void{
    this.todos.map(e=>{
      if(e.id == id){
        e.isDone = true
      }
    })
  }
  update(id:string):void{
    
  }
  delete(id:string):void{
    const newArray = this.todos.filter(e=>e.id!=id)
    this.todos = newArray
  }
  fetchTodos():void{
    this.http.get<{data:ServerTodos[],success:Boolean}>('http://localhost:3000/api/get/getTodos')
      .subscribe(
        (response) => {
          if(response.success){
            this.loading = false;
            this.todos = response.data; // Assign the fetched todos to the array
          }
          else{
            this.error = true;
            this.loading = false;
            this.errorMsg = 'Failed to fetch todos. Please try again later.'; // Handle any errors
          }
        },
        (error) => {
          this.errorMsg = 'Failed to fetch todos. Please try again later.'; // Handle any errors
          this.error = true;
          this.loading = false;
          console.error('Error fetching todos:', error);
        }
      );
  }
}
