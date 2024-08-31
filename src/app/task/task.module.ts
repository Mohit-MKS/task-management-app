import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { StoreModule } from '@ngrx/store';
import { taskReducer } from './store/task.reducer';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [TaskListComponent, AddTaskComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    StoreModule.forFeature('tasks', taskReducer),
    SharedModule
  ]
})
export class TaskModule { }
