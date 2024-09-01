import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ITask, ITaskState } from 'src/app/task/models/task.interfaces';
import { IDashBoardChartOptions } from '../../models/dashboard.interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, OnDestroy {

  storeSubscription: Subscription

  taskCountByStatus = { 'completed': 0, 'in-progress': 0, 'pending': 0 };
  taskCountByDueDate = { 'due-today': 0, 'over-due': 0 };
  totalCount = 0;

  chartOptions: Partial<IDashBoardChartOptions>;


  constructor(private _store: Store<ITaskState>) { }

  ngOnInit(): void {
    this.initializeChart();
    this.storeSubscription = this._store.select('tasks').subscribe((tasks) => {
      this.calculateStatusWiseCount(tasks)
    })
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }

  calculateStatusWiseCount(tasks: ITask[]) {
    const today = new Date();
    today.setHours(5, 30, 0, 0);
    tasks.forEach((task) => {
      this.totalCount++;
      this.taskCountByStatus[task.status]++;
      const dueDate = new Date(task.dueDate)
      if (dueDate.getTime() === today.getTime()) {
        this.taskCountByDueDate['due-today']++
      }
      else if (dueDate.getTime() <= today.getTime()) {
        this.taskCountByDueDate['over-due']++
      }

    })
    this.renderChart()
  }

  renderChart() {
    let chartData = []
    Object.entries(this.taskCountByStatus).forEach(([key, value]) => {
      if (key === 'completed') {
        chartData.push({ x: key, y: value, fillColor: '#25b578' })
      }
      else if (key === 'pending') {
        chartData.push({ x: key, y: value, fillColor: '#d12020' })
      }
      else {
        chartData.push({ x: key, y: value, fillColor: '#ffa532' })

      }
    })
    this.chartOptions.series = [{ data: chartData }]

  }

  initializeChart() {
    this.chartOptions = {
      series: [],

      chart: {
        height: 320,
        type: 'bar',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
      },
      title: {
        text: 'Tasks',
        align: 'left',
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        width: 2,
        curve: 'smooth',
      },

      grid: {
        padding: {
          top: 20,
          right: 0,
          bottom: 0,
          left: 15,
        },
      },
      xaxis: {
        labels: { show: true },
        title: {
          text: 'Task Status',
        },
      },

      yaxis: {
        title: {
          text: 'Number of Tasks',
        },
        labels: {
          minWidth: 20,
          formatter: (value) => {
            return value.toFixed(0);
          }
        },
      },
    };
  }

}
