import { Component, inject, input, InputSignal, OnChanges, OnInit, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { ColorService } from '../../services/color-service';
import { ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart-percent',
  imports: [
    BaseChartDirective
  ],
  templateUrl: './pie-chart-percent.html',
  styleUrl: './pie-chart-percent.css',
})
export class PieChartPercent implements OnInit, OnChanges{
  public accuracyType: InputSignal<"goodHigh" | "goodLow" | "customColor">= input.required();
  public accuracyFloat: InputSignal<number>= input.required();
  public accuracyColor: InputSignal<string>= input('aqua');


  private color: ColorService= inject(ColorService);


  public pieChartData: WritableSignal<ChartData<'pie', Array<number>>>= signal({
    datasets: [{
      borderColor: 'transparent',
      borderWidth: 0,
      rotation: 90,
      data: [90, 10],
      backgroundColor: [
        this.color.tc1_500_rgb(),
        'transparent'
      ],
      hoverBackgroundColor: [
        this.color.tc1_600_rgb(),
        'transparent'
      ]
    }]
  });


  ngOnInit(): void {
    this.updateStats();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.updateStats();
  }




  private updateGoodHigh(): void{
    const limitGreen: number= 0.8;
    const limitLightRed: number= 0.6;


    if( limitGreen<=this.accuracyFloat() ){
      this.pieChartData.update(value=>({
        ...value,
        datasets: [{
          borderWidth: 0,
          rotation: 90,
          data: [
            this.accuracyFloat()*100,
            100-(this.accuracyFloat()*100)
          ],
          backgroundColor: [
            this.color.tc1_500_rgb(),
            'transparent'
          ],
          hoverBackgroundColor: [
            this.color.tc1_600_rgb(),
            'transparent'
          ],
        }]
      }));
    }else if( limitLightRed<=this.accuracyFloat() ){
      this.pieChartData.update(value=>({
        ...value,
        datasets: [{
          borderWidth: 0,
          rotation: 90,
          data: [
            this.accuracyFloat()*100,
            100-(this.accuracyFloat()*100)
          ],
          backgroundColor: [
            this.color.tc3_700_rgb(),
            'transparent'
          ],
          hoverBackgroundColor: [
            this.color.tc3_800_rgb(),
            'transparent'
          ],
        }]
      }));
    }else{
      this.pieChartData.update(value=>({
        ...value,
        datasets: [{
          borderWidth: 0,
          rotation: 90,
          data: [
            this.accuracyFloat()*100,
            100-(this.accuracyFloat()*100)
          ],
          backgroundColor: [
            this.color.tc3_500_rgb(),
            'transparent'
          ],
          hoverBackgroundColor: [
            this.color.tc3_600_rgb(),
            'transparent'
          ],
        }]
      }));
    }
  }
  private updateGoodLow(): void{
    const limitGreen: number= 0.6;
    const limitLightRed: number= 0.8;


    if( this.accuracyFloat()<=limitGreen ){
      this.pieChartData.update(value=>({
        ...value,
        datasets: [{
          borderWidth: 0,
          rotation: 90,
          data: [
            this.accuracyFloat()*100,
            100-(this.accuracyFloat()*100)
          ],
          backgroundColor: [
            this.color.tc1_500_rgb(),
            'transparent'
          ],
          hoverBackgroundColor: [
            this.color.tc1_600_rgb(),
            'transparent'
          ],
        }]
      }));
    }else if( this.accuracyFloat()<=limitLightRed ){
      this.pieChartData.update(value=>({
        ...value,
        datasets: [{
          borderWidth: 0,
          rotation: 90,
          data: [
            this.accuracyFloat()*100,
            100-(this.accuracyFloat()*100)
          ],
          backgroundColor: [
            this.color.tc3_700_rgb(),
            'transparent'
          ],
          hoverBackgroundColor: [
            this.color.tc3_800_rgb(),
            'transparent'
          ],
        }]
      }));
    }else{
      this.pieChartData.update(value=>({
        ...value,
        datasets: [{
          borderWidth: 0,
          rotation: 90,
          data: [
            this.accuracyFloat()*100,
            100-(this.accuracyFloat()*100)
          ],
          backgroundColor: [
            this.color.tc3_500_rgb(),
            'transparent'
          ],
          hoverBackgroundColor: [
            this.color.tc3_600_rgb(),
            'transparent'
          ],
        }]
      }));
    }
  }
  private updateStats(): void{
    if( this.accuracyType()=="goodHigh" ){
      this.updateGoodHigh();


    }else if( this.accuracyType()=="goodLow" ){
      this.updateGoodLow();


    }else{
      this.pieChartData.update(value=>({
        ...value,
        datasets: [{
          borderWidth: 0,
          rotation: 90,
          data: [
            this.accuracyFloat()*100,
            100-(this.accuracyFloat()*100)
          ],
          backgroundColor: [
            this.accuracyColor(),
            'transparent'
          ],
          hoverBackgroundColor: [
            this.accuracyColor(),
            'transparent'
          ],
        }]
      }));
    }
  }
}
