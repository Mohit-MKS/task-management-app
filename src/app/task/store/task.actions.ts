import { createAction, props } from '@ngrx/store';
import { ITask } from '../models/task.interfaces';

const addTask = createAction(
  '[Task] Add Task',
  props<{ task: ITask }>()
);

const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ taskId: string }>()
);

const updateTask = createAction(
  '[Task] Edit Task',
  props<{ task: ITask }>()
);

export { addTask, deleteTask, updateTask }



