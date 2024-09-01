import { Action, createReducer, on } from '@ngrx/store';
import { addTask, deleteTask, updateTask, } from './task.actions';
import { ITask } from '../models/task.interfaces';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Constants } from 'src/app/shared/utils/constants';

const generateUniqueId = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString(); // Generates an 8-digit random number
}

const initialState: ITask[] = StorageService.getItem(Constants.TasksKey) ?? [];

const _taskReducer = createReducer(
  initialState,
  on(addTask, (state, { task }) => {
    const newTask = { ...task, id: generateUniqueId() }
    const updatedTasks = [...state, newTask];
    StorageService.setItem(Constants.TasksKey, updatedTasks);
    return updatedTasks;
  }),
  on(deleteTask, (state, { taskId }) => {
    const updatedTasks = state.filter(task => task.id !== taskId);
    StorageService.setItem(Constants.TasksKey, updatedTasks);
    return updatedTasks;
  }),
  on(updateTask, (state, { task }) => {
    const updatedTasks = state.map(t => t.id === task.id ? task : t);
    StorageService.setItem(Constants.TasksKey, updatedTasks);
    return updatedTasks;
  })
);

export function taskReducer(state: ITask[] | undefined, action: Action) {
  return _taskReducer(state, action);
}

