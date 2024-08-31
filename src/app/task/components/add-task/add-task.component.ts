import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  taskForm = this._fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    dueDate: ['', Validators.required],
    status: ['pending', Validators.required]
  });

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
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
