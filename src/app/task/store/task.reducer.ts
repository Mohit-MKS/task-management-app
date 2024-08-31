import { createReducer, on } from '@ngrx/store';
import { addTask, tasksLoaded } from './task.actions';
import { ITask } from '../models/task.interfaces';

export const initialState: ITask[] = [];

const _taskReducer = createReducer(
  initialState,
  on(addTask, (state, { task }) => [...state, task]),
  on(tasksLoaded, (state, { tasks }) => [...tasks])
);

export function taskReducer(state: any, action: any) {
  return _taskReducer(state, action);
}
