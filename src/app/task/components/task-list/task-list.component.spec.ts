import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { ITask } from '../../models/task.interfaces';
import { By } from '@angular/platform-browser';
import { deleteTask } from '../../store/task.actions';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Constants } from 'src/app/shared/utils/constants';

const mockStore = {
  select: jasmine.createSpy('select').and.returnValue(of([{ id: '1', title: 'Task 1', description: 'Description 1', status: 'pending', dueDate: new Date() },
  { id: '2', title: 'Task 2', description: 'Description 2', status: 'in-progress', dueDate: new Date() }])),
  dispatch: jasmine.createSpy('dispatch')
};

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [
        StoreModule.forRoot({}, { runtimeChecks: { strictStateImmutability: false, strictActionImmutability: false } })
      ],
      providers: [
        { provide: Store, useValue: mockStore }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should set delete task ID on delete icon click', () => {
    const task: ITask = { id: '1', title: 'Task 1', description: 'Description 1', status: 'pending', dueDate: new Date() };
    component.setDeleteTaskId(task);
    expect(component.deleteTaskId).toBe('1');
  });

  it('should call deleteTask on confirm delete button click', fakeAsync(() => {
    const task: ITask = { id: '1', title: 'Task 1', description: 'Description 1', status: 'pending', dueDate: new Date() };
    component.setDeleteTaskId(task);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const confirmButton = fixture.debugElement.query(By.css('.btn-success')).nativeElement;
    confirmButton.click();

    expect(mockStore.dispatch).toHaveBeenCalledWith(deleteTask({ taskId: '1' }));
  }));

});
