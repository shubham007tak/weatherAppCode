
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  chart = []; // This will hold our chart info
  private cityName: any;
  allIspsData: any;
  isps: any;
  humidity: any;
  precipitation: any;
  subscribers: any;
  views: any;
  public temperature: any;
  grade: any;
  video: any;
  searchKey: string;
  public responseArray: any;
  parameters: any = [];
  tempMax: any;
  tempMin: any;
  weatherDesc: any;
  datesAll = [];
  dataCombined = [];
  cityDate: any;
  windSpeed: any;
  constructor(public appService: AppService,
    public router: Router,
    private toastr: ToastrService,
  ) { }

  listData: any;
  title: string;

  ngOnInit() {

    // this.getAllIsps();
  }

  public getAllIsps() {
    this.appService.getAllIsps(this.title)
      .subscribe((response) => {
        this.responseArray = response.list;
        this.temperature = response.list[0].main.temp;
        this.humidity = response.list[0].main.humidity;
        this.tempMax = response.list[0].main.temp_max;
        this.tempMin = response.list[0].main.temp_min;
        this.weatherDesc = response.list[0].weather[0].description;
        this.cityName = response.city.name;
        this.windSpeed = response.list[0].wind.speed;
        this.cityDate = response.list[0].dt_txt;

        const temperatures = response['list'].map(response1 => response1.main.temp);
        const dates = response['list'].map(response1 => response1.dt);


        dates.forEach((response1) => {
          const jsdate = new Date(response1 * 1000);
          this.datesAll.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }));
        });
        temperatures.forEach((response2) => {
          this.dataCombined.push(response2);
        });

        const temp_max = response['list'].map(response1 => response1.main.temp_max);
        const temp_min = response['list'].map(response1 => response1.main.temp_min);

        const alldates = response['list'].map(response1 => response1.dt);

        const humidity1 = response['list'].map(response1 => response1.main.humidity);

        const weatherDates = [];
        alldates.forEach((response1) => {


          const jsdate = new Date(response1 * 1000);
          weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }));

          this.chart = new Chart('canvas', {
            type: 'line',
            data: {
              labels: weatherDates,
              datasets: [
                {
                  data: temp_max,
                  borderColor: '#3cba9f',
                  fill: false
                },
                {
                  data: temp_min,
                  borderColor: '#ffcc00',
                  fill: false
                },
                {
                  data: humidity1,
                  borderColor: '#FF0000',
                  fill: false
                }
              ]
            },
            options: {
              legend: {
                display: false
              },
              scales: {
                xAxes: [{
                  display: true
                }],
                yAxes: [{
                  display: true
                }],
              }
            }
          });
        });
      }, (error) => {
        this.toastr.error('something went wrong');
      });
  }






}
