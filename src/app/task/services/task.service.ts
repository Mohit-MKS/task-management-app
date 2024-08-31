


import { Injectable } from '@angular/core';
import { ITask } from '../models/task.interfaces';
import { StorageService } from 'src/app/shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private storageKey = 'tasks';

  constructor() { }

  getTasks(): ITask[] {
    const tasks = StorageService.getItem(this.storageKey);
    return tasks ?? [];
  }

  saveTasks(tasks: ITask[]) {
    StorageService.setItem(this.storageKey, JSON.stringify(tasks));
  }

  createTask(task: ITask) {
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasks(tasks);
  }

  updateTask(task: ITask) {
    const tasks = this.getTasks();
    const index = tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
      this.saveTasks(tasks);
    }
  }

  deleteTask(taskId: string) {
    let tasks = this.getTasks();
    tasks = tasks.filter(task => task.id !== taskId);
    this.saveTasks(tasks);
  }
}

