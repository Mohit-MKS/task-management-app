import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { StoreModule } from '@ngrx/store';
import { taskReducer } from '../task/store/task.reducer';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgApexchartsModule,
    StoreModule.forFeature('tasks', taskReducer),
  ]
})
export class DashboardModule { }
