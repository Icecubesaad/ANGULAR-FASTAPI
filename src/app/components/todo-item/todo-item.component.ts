import { Component, EventEmitter, Input,Output,OnInit } from '@angular/core';
import { Todo } from '../../../interfaces/Todo';
import { ServerTodos } from '../../../interfaces/ServerTodos';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  @Input() data:ServerTodos={title:"",desc:"",id:"",isDone:false,createdAt:"",updatedAt:""};
  @Output() updateTodo:EventEmitter<string> = new EventEmitter()
  @Output() deleteTodo:EventEmitter<string> = new EventEmitter()
  @Output() isDoneTodo:EventEmitter<string> = new EventEmitter()
  delete(id:string){
    this.deleteTodo.emit(id)
  }
  update(id:string){
    this.updateTodo.emit(id)
  }
  isDone(id:string){
    this.isDoneTodo.emit(id)
  }
}
