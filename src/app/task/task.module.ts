import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AddTaskComponent } from './components/add-task/add-task.component';


@NgModule({
  declarations: [TaskListComponent, AddTaskComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class TaskModule { }
