import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ITask, ITaskState } from 'src/app/task/models/task.interfaces';
import { IDashBoardChartOptions } from '../../models/dashboard.interfaces';
import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('taskChart', { static: true }) taskChart: ChartComponent;

  storeSubscription: Subscription

  taskCount: { [key: string]: number } = { 'completed': 0, 'in-progress': 0, 'pending': 0 };
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
    tasks.forEach((task) => {
      this.totalCount++;
      this.taskCount[task.status]++;

    })
    this.renderChart()
  }

  renderChart() {
    let chartData = []
    Object.entries(this.taskCount).forEach(([key, value]) => {
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
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -10,
        offsetX: 0,
      },
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
          right: 10,
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
          formatter: function (value) {
            return value.toFixed(0); // Force labels to show as integers
          }
        },
      },
    };
  }

}
