import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ExpenseList} from "../../Interfaces/expense-list";
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnChanges {

  @Input() expenseList!: ExpenseList[];
  public chart!: Chart;
  private _chartData = [] as any;



  ngOnChanges(changes: SimpleChanges): void {
    const extractedCategoryInformation = this.expenseList?.map((expense) => {
      let obj: { [category: string]: number} = {};
      obj[expense.category] = +expense.amount;
      return obj;
    });

    const groupBy: { [category: string]: number} = {};
    extractedCategoryInformation?.forEach((item) => {
      let key = Object.keys(item)[0];
      let value = item[Object.keys(item)[0]];
      if(!groupBy.hasOwnProperty(key)){
        groupBy[key] = value;
      }else{
        groupBy[key] = groupBy[key] + value;
      }
    });


    for(let key in groupBy){
      let array = [key, groupBy[key]];
      this._chartData.push(array);
      this._loadChart();
    }

  }

  private _loadChart() {
    this.chart = new Chart({
      chart: {
        type: 'pie',
        backgroundColor: 'transparent',
        height: 400,
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          showInLegend: true,
          dataLabels: {
            enabled: true,
            format: '{point.val}<br />{point.percentage:.1f} %',
          },
        },
      },
      series: [
        {
          name: 'Category',
          data: this._chartData,
          type: "pie"
        },
      ],
    });
  }
}
