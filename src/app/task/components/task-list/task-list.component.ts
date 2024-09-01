import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ITask, ITaskState, } from '../../models/task.interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})

export class TaskListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) taskTablePaginator!: MatPaginator;

  taskTableColumns: string[] = ['id', 'title', 'description', 'status', 'dueDate', 'action'];
  taskTableDataSource = new MatTableDataSource<ITask>([]);

  selectedTask: ITask;

  constructor(private _taskService: TaskService, private _store: Store<ITaskState>) { }

  ngOnInit() {
    this._store.select('tasks').subscribe((tasks) => {
      this.taskTableDataSource.data = tasks
    })
  }

  ngAfterViewInit(): void {
    this.taskTableDataSource.paginator = this.taskTablePaginator
  }

  deleteTask(taskId: string) {
    this._taskService.deleteTask(taskId);
  }


  editTask(task: ITask) {
    this.selectedTask = task
  }

}
