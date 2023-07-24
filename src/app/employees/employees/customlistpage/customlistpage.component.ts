import { Component, OnInit, inject } from '@angular/core';
import { CustomlistpageBaseComponent } from '@baseapp/employees/employees/customlistpage/customlistpage.base.component';
import { EmployeesService } from '@baseapp/employees/employees/employees.service';
//import  Chart from 'chart.js/auto';

declare const Chart: any
@Component({
  selector: 'app-customlistpage',
  templateUrl: './customlistpage.component.html',
  styleUrls: ['./customlistpage.scss']
})
export class CustomlistpageComponent extends CustomlistpageBaseComponent implements OnInit {

  chart: any;
  piechart: any;
  radarchart: any;

  loadChart() {
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
        datasets: [
          {
            label: "Sales",
            data: ['467', '576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }

  loadPieChart() {
    this.piechart = new Chart("MyPieChart", {
      type: 'pie', //this denotes tha type of chart
      data: {
        datasets: [{
          data: [10, 20, 30]
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'Red',
          'Yellow',
          'Blue'
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Pie Chart'
          }
        }
      }

    });
  }

  loadRadarChart() {
    this.radarchart = new Chart("MyRadarChart", {
      type: 'radar', //this denotes tha type of chart

      data: {
        labels: [
          'Eating',
          'Drinking',
          'Sleeping',
          'Designing',
          'Coding',
          'Cycling',
          'Running'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 90, 81, 56, 55, 40],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
          label: 'My Second Dataset',
          data: [28, 48, 40, 19, 96, 27, 100],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
      },
      options: {
        responsive: true,
        elements: {
          line: {
            borderWidth: 3
          }
        }
      }

    });
  }

  ngAfterViewInit(): void {
    this.onAfterViewInit();
    this.loadChart();
    this.loadPieChart();
    this.loadRadarChart();
  }

  ngOnInit(): void {
    super.onInit();
  }

}
