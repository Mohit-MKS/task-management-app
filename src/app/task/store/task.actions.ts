import { createAction, props } from '@ngrx/store';
import { ITask } from '../models/task.interfaces';

export const addTask = createAction(
  '[Task] Add Task',
  props<{ task: ITask }>()
);

export const loadTasks = createAction('[Task] Load Tasks');
export const tasksLoaded = createAction(
  '[Task] Tasks Loaded',
  props<{ tasks: ITask[] }>()
);
