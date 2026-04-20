import { Component, inject, input, InputSignal, OnChanges, OnInit, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ColorService } from '../../services/color-service';

@Component({
  selector: 'app-doughnut-graph',
  imports: [
    BaseChartDirective,
  ],
  templateUrl: './doughnut-graph.html',
  styleUrl: './doughnut-graph.css',
})
export class DoughnutGraph implements OnInit, OnChanges{
  private color: ColorService= inject(ColorService);
  public dataSet: InputSignal<Array<number>>= input.required<Array<number>>();

  protected doughnutChartData: WritableSignal<ChartData<'doughnut'>>= signal({
    labels: [],
    datasets: [
      {
        borderColor: 'transparent',
        borderWidth: 0,
        rotation: 0,
        data: [],
        hoverBackgroundColor: [
            this.color.pc1_300_rgb(),
            this.color.pc1_500_rgb(),
            this.color.pc1_700_rgb(),
            this.color.pc1_900_rgb(),
            this.color.pc3_300_rgb(),
            this.color.pc3_500_rgb(),
            this.color.pc3_700_rgb(),
            this.color.pc2_400_rgb(),
            this.color.pc2_500_rgb(),
            this.color.pc3_700_rgb()
        ],
        backgroundColor: [
            this.color.pc1_200_rgb(),
            this.color.pc1_400_rgb(),
            this.color.pc1_600_rgb(),
            this.color.pc1_800_rgb(),
            this.color.pc3_200_rgb(),
            this.color.pc3_400_rgb(),
            this.color.pc3_600_rgb(),
            this.color.pc2_300_rgb(),
            this.color.pc2_400_rgb(),
            this.color.pc2_600_rgb()
        ]
      },{
        data: [],
        borderWidth: 0,
        backgroundColor: []
      }
    ],
  });


  private provideData2doughnutChart(): void{
    if( 1==this.dataSet().length && 0.0<=this.dataSet()[0] && this.dataSet()[0]<=1.0 ){
      this.doughnutChartData.update(value=>({
        ...value,
        datasets: [
          {
            ...value.datasets[0],
            data: [this.dataSet()[0]*100, 100-this.dataSet()[0]*100],
            hoverBackgroundColor: [
              this.color.pc1_500_rgb(),
              'transparent'
            ],
            backgroundColor: [
              this.color.pc1_300_rgb(),
              'transparent'
            ]
          },
          value.datasets[1]
        ],
      }));


    }else if( 1==this.dataSet().length && this.dataSet()[0]<0.0 && 1.0<this.dataSet()[0] ){
      throw new Error('Incorrect implementation of using app-doughnut-graph on `dataSet` parameter, accuracy must be between 0.0 and 1.0.')
    }else{
      this.doughnutChartData.update(value=>({
        ...value,
        datasets: [
          {
            ...value.datasets[0],
            data: this.dataSet(),
          },
          value.datasets[1]
        ]
      }));
    }
  }
  ngOnInit(): void {
    this.provideData2doughnutChart();
  }
  ngOnChanges(changes: SimpleChanges<DoughnutGraph>): void {
    /*
     * changes.dataSet?.previousValue -- data itself
     * changes.dataSet?.currentValue -- data itself
     * changes.dataSet?.isFirstChange() -- boolean
     * changes.dataSet?.firstChange -- boolean
     * */
    this.provideData2doughnutChart();
  }
}
