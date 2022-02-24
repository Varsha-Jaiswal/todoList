import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  newTodo = '';

  todoList: any = [];
  onGoingList: any = [];
  doneList: any = [];

  ngOnInit() {
    if (localStorage.getItem('todoList')) {
      this.todoList = localStorage.getItem('todoList')?.split(',');
    }
    if (localStorage.getItem('onGoingList')) {
      this.onGoingList = localStorage.getItem('onGoingList')?.split(',');
    }
    if (localStorage.getItem('doneList')) {
      this.doneList = localStorage.getItem('doneList')?.split(',');
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    localStorage.setItem('todoList', this.todoList);
    localStorage.setItem('onGoingList', this.onGoingList);
    localStorage.setItem('doneList', this.doneList);
  }

  addNewTodo() {
    if (this.newTodo.length) {
      this.todoList.push(this.newTodo);
      this.newTodo = '';
      localStorage.setItem('todoList', this.todoList);
    }
  }
}
