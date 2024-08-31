import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../models/task.interfaces';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  displayedColumns: string[] = ['title', 'description', 'status', 'dueDate', 'action'];

  tasks: ITask[] = [];

  data: ITask[] = [
    { title: 'Task 1', description: 'Description 1', status: 'pending', dueDate: new Date('2024-09-01') },
    { title: 'Task 2', description: 'Description 2', status: 'in-progress', dueDate: new Date('2024-09-05') },
    { title: 'Task 3', description: 'Description 3', status: 'completed', dueDate: new Date('2024-09-10') },
  ];

  taskTableDataSource = new MatTableDataSource<ITask>(this.data);


  constructor(private _taskService: TaskService) { }

  ngOnInit() {
    this.tasks = this._taskService.getTasks();
  }

  deleteTask(taskId: string) {
    this._taskService.deleteTask(taskId);
    this.tasks = this._taskService.getTasks();
  }


  editTask(taskId: string) { }

}
