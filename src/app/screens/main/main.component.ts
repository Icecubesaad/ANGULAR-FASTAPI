import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Todo } from '../../../interfaces/Todo';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  payload: Todo = {
    title: '',
    desc: '',
  };
  error: Boolean = false;
  success: Boolean = false;
  errorMsg: string = '';
  @Output() submit: EventEmitter<Todo> = new EventEmitter();

  constructor(private http: HttpClient) {} // Ensure HttpClient is injected here

  changePayload(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const name = inputElement.name as keyof typeof this.payload;
    this.payload[name] = inputElement.value;
  }

  submitPayload(): void {
    console.log('hehe', this.payload);
    this.submit.emit(this.payload);

    this.http
      .post<{ data: Todo; success: boolean }>(
        'http://localhost:8000/api/post/AddInTodos',
        this.payload
      )
      .subscribe(
        (response) => {
          if (response.success) {
            this.payload = {
              title: '',
              desc: '',
            };
            this.success = true;
            setTimeout(() => {
              this.success = false;
            }, 3000);
          }
        },
        (error) => {
          this.errorMsg = `Error adding todo : ${error}`;
          console.error('Error adding todo:', error);
          this.error = true;
          setTimeout(() => {
            this.error = false;
          }, 3000);
        }
      );
  }
}
