import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ITask } from '../../models/task.interfaces';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnChanges {

  @Input() task: ITask

  taskForm = this._fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    dueDate: ['', Validators.required],
    status: ['pending', Validators.required]
  });

  constructor(private _fb: FormBuilder) { }

  ngOnChanges(): void {
  }

  addTask() {
    if (this.taskForm.valid) {
      const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      tasks.push(this.taskForm.value);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      this.taskForm.reset();
      alert('Task added successfully!');
    }
  }

}
