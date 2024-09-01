import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskComponent } from './add-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { taskReducer } from '../../store/task.reducer';
import { ITask } from '../../models/task.interfaces';
import { addTask, updateTask } from '../../store/task.actions';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Constants } from 'src/app/shared/utils/constants';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let store: Store;

  const mockTask: ITask = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    dueDate: '2024-09-07' as unknown as Date,
    status: 'pending',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddTaskComponent],
      imports: [ReactiveFormsModule,
        StoreModule.forRoot({}, {}),
        StoreModule.forFeature('tasks', taskReducer)]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    component.inputTask = undefined
    StorageService.deleteItem(Constants.TasksKey)
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should initialize the form with empty values', () => {
    expect(component.taskForm.value).toEqual({
      title: '',
      description: '',
      dueDate: '',
      status: 'pending',
    });
  });

  it('should populate the form with task data when inputTask is provided', () => {
    component.inputTask = mockTask;
    component.ngOnChanges();

    expect(component.taskForm.value).toEqual({
      title: mockTask.title,
      description: mockTask.description,
      dueDate: mockTask.dueDate,
      status: mockTask.status,
    });
  });

  it('should reset the form when resetForm is called', () => {
    component.taskForm.patchValue(mockTask);
    component.resetForm();
    expect(component.taskForm.value).toEqual({
      title: null,
      description: null,
      dueDate: null,
      status: null,
    });
  });

  it('should dispatch addTask action when adding a new task', () => {
    spyOn(store, 'dispatch').and.callThrough();
    component.taskForm.setValue({
      title: 'New Task',
      description: 'Task description',
      dueDate: '2024-09-07' as unknown as Date,
      status: 'pending',
    });
    expect(component.taskForm.valid).toBeTrue();
    const taskForm = component.taskForm.value

    component.addorEditTask();
    expect(store.dispatch).toHaveBeenCalledWith(addTask({ task: taskForm }));
  });

  it('should dispatch updateTask action when editing an existing task', () => {
    spyOn(store, 'dispatch').and.callThrough();
    component.inputTask = mockTask;
    component.ngOnChanges();
    component.addorEditTask();
    expect(store.dispatch).toHaveBeenCalledWith(updateTask({
      task: {
        ...mockTask,
      }
    }));
  });

  it('should disable the Add/Update button when the form is invalid', () => {
    component.taskForm.patchValue({
      title: '',
      description: '',
      dueDate: '',
      status: 'pending',
    });

    fixture.detectChanges();

    const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeTruthy();
  });
});
