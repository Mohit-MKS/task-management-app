import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { taskReducer } from 'src/app/task/store/task.reducer';
import { StoreModule } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { ITask } from 'src/app/task/models/task.interfaces';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Constants } from 'src/app/shared/utils/constants';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        StoreModule.forRoot({}, {}),
        StoreModule.forFeature('tasks', taskReducer)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    StorageService.deleteItem(Constants.TasksKey)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should calculate status-wise count correctly and update chart', () => {
    const mockTasks = [
      { status: 'completed', dueDate: new Date() },
      { status: 'in-progress', dueDate: new Date() },
      { status: 'pending', dueDate: new Date() } // more than 1 day ago
    ];

    component.calculateStatusWiseCount(mockTasks as unknown as ITask[]);
    expect(component.taskCountByStatus['completed']).toBe(1);
    expect(component.taskCountByStatus['in-progress']).toBe(1);
    expect(component.taskCountByStatus['pending']).toBe(1);
    expect(component.taskCountByDueDate['due-today']).toBe(0);
    expect(component.taskCountByDueDate['over-due']).toBe(3);
    expect(component.totalCount).toBe(3);

    const expectedChartData = [
      { x: 'completed', y: 1, fillColor: '#25b578' },
      { x: 'in-progress', y: 1, fillColor: '#ffa532' },
      { x: 'pending', y: 1, fillColor: '#d12020' }
    ];

    expect(component.chartOptions.series[0].data).toEqual(expectedChartData);
  });

  it('should unsubscribe from store on ngOnDestroy', () => {
    spyOn(component.storeSubscription, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(component.storeSubscription.unsubscribe).toHaveBeenCalled();
  });

  it('should update card values correctly', () => {
    component.taskCountByStatus = { 'completed': 5, 'in-progress': 2, 'pending': 3 };
    component.taskCountByDueDate = { 'due-today': 4, 'over-due': 1 };
    component.totalCount = 10;
    fixture.detectChanges();

    const totalCard = fixture.debugElement.query(By.css('.card')).nativeElement.querySelector('.fw-bold.fs-3');
    const completedCard = fixture.debugElement.queryAll(By.css('.card'))[1].nativeElement.querySelector('.fw-bold.fs-3');
    const inProgressCard = fixture.debugElement.queryAll(By.css('.card'))[2].nativeElement.querySelector('.fw-bold.fs-3');
    const pendingCard = fixture.debugElement.queryAll(By.css('.card'))[3].nativeElement.querySelector('.fw-bold.fs-3');
    const dueTodayCard = fixture.debugElement.queryAll(By.css('.card'))[4].nativeElement.querySelector('.fw-bold.fs-3');
    const overDueCard = fixture.debugElement.queryAll(By.css('.card'))[5].nativeElement.querySelector('.fw-bold.fs-3');

    expect(totalCard.textContent).toContain('10');
    expect(completedCard.textContent).toContain('5');
    expect(inProgressCard.textContent).toContain('2');
    expect(pendingCard.textContent).toContain('3');
    expect(dueTodayCard.textContent).toContain('4');
    expect(overDueCard.textContent).toContain('1');
  });

});
