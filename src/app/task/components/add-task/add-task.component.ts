import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ITask } from '../../models/task.interfaces';
import { Store } from '@ngrx/store';
import { addTask, updateTask } from '../../store/task.actions';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnChanges {

  @Input('task') inputTask: ITask

  taskForm = this._fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    dueDate: ['', Validators.required],
    status: ['pending', Validators.required]
  });

  constructor(private _fb: FormBuilder, private _store: Store) { }

  ngOnChanges(): void {
    if (this.inputTask) {
      this.taskForm.patchValue(this.inputTask)
    }
  }

  resetForm() {
    this.taskForm.reset();
  }


  addorEditTask(): void {
    if (this.taskForm.valid) {
      const task = this.taskForm.value
      if (this.inputTask) {
        this.updateTask(task)
      }
      else {
        this._store.dispatch(addTask({ task }));
      }
    }
    this.resetForm()
  }


  updateTask(task: ITask): void {
    task.id = this.inputTask.id
    this._store.dispatch(updateTask({ task }));
  }

}
