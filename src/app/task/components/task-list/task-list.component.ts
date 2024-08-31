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

  taskTableColumns: string[] = ['title', 'description', 'status', 'dueDate', 'action'];

  data: ITask[] = [
    { title: 'Task 1', description: 'Description 1', status: 'pending', dueDate: new Date('2024-09-01') },
    { title: 'Task 2', description: 'Description 2', status: 'in-progress', dueDate: new Date('2024-09-05') },
    { title: 'Task 3', description: 'Description 3', status: 'completed', dueDate: new Date('2024-09-10') },
    { title: 'Task 4', description: 'Description 4', status: 'pending', dueDate: new Date('2024-09-01') },
    { title: 'Task 5', description: 'Description 5', status: 'in-progress', dueDate: new Date('2024-09-05') },
    { title: 'Task 6', description: 'Description 6', status: 'completed', dueDate: new Date('2024-09-10') },
    { title: 'Task 1', description: 'Description 1', status: 'pending', dueDate: new Date('2024-09-01') },
    { title: 'Task 2', description: 'Description 2', status: 'in-progress', dueDate: new Date('2024-09-05') },
    { title: 'Task 3', description: 'Description 3', status: 'completed', dueDate: new Date('2024-09-10') },
    { title: 'Task 4', description: 'Description 4', status: 'pending', dueDate: new Date('2024-09-01') },
    { title: 'Task 5', description: 'Description 5', status: 'in-progress', dueDate: new Date('2024-09-05') },
    { title: 'Task 6', description: 'Description 6', status: 'completed', dueDate: new Date('2024-09-10') },
    { title: 'Task 1', description: 'Description 1', status: 'pending', dueDate: new Date('2024-09-01') },
    { title: 'Task 2', description: 'Description 2', status: 'in-progress', dueDate: new Date('2024-09-05') },
    { title: 'Task 3', description: 'Description 3', status: 'completed', dueDate: new Date('2024-09-10') },
    { title: 'Task 4', description: 'Description 4', status: 'pending', dueDate: new Date('2024-09-01') },
    { title: 'Task 5', description: 'Description 5', status: 'in-progress', dueDate: new Date('2024-09-05') },
    { title: 'Task 6', description: 'Description 6', status: 'completed', dueDate: new Date('2024-09-10') },
    { title: 'Task 1', description: 'Description 1', status: 'pending', dueDate: new Date('2024-09-01') },
    { title: 'Task 2', description: 'Description 2', status: 'in-progress', dueDate: new Date('2024-09-05') },
    { title: 'Task 3', description: 'Description 3', status: 'completed', dueDate: new Date('2024-09-10') },
    { title: 'Task 4', description: 'Description 4', status: 'pending', dueDate: new Date('2024-09-01') },
    { title: 'Task 5', description: 'Description 5', status: 'in-progress', dueDate: new Date('2024-09-05') },
    { title: 'Task 6', description: 'Description 6', status: 'completed', dueDate: new Date('2024-09-10') },
  ];

  taskTableDataSource = new MatTableDataSource<ITask>(this.data);


  constructor(private _taskService: TaskService) { }

  ngOnInit() {
  }

  deleteTask(taskId: string) {
    this._taskService.deleteTask(taskId);
  }


  editTask(taskId: string) { }

}
