import {AfterViewInit, Component} from '@angular/core';
import {NgChartsModule} from "ng2-charts";
import {ChartConfiguration, ChartType} from "chart.js";
import {TrackItem} from "../models/TrackItem";
import {ItemHistory} from "../models/Item-History";
import {ItemService} from "../item.service";
import {DynamicDialogConfig} from "primeng/dynamicdialog";

@Component({
  selector: 'app-item-price-history',
  standalone: true,
  imports: [
    NgChartsModule
  ],
  templateUrl: './item-price-history.component.html',
  styleUrl: './item-price-history.component.scss'
})
export class ItemPriceHistoryComponent implements AfterViewInit {

  public chartType: ChartType = 'scatter';
  public chartData!: ChartConfiguration['data'];
  public chartOptions: ChartConfiguration['options'];
  public trackItem: TrackItem;

  constructor(public itemService: ItemService, public dynamicDialogConfig: DynamicDialogConfig) {
    this.trackItem = dynamicDialogConfig.data as TrackItem;
  }

  ngAfterViewInit() {
    this.itemService.getItemPriceHistory(this.trackItem.id, this.trackItem.store).subscribe((itemHistory: ItemHistory[]) => {
      let dates = itemHistory.map(x => new Date(x.timestamp * 1000));
      let desiredPrice = itemHistory.map(x => this.trackItem.desiredPrice);
      this.chartData = {
        labels: dates,
        datasets: [
          {
            data: itemHistory.map(x => x.price),
            label: this.trackItem.store + ": " + this.trackItem.name.substring(0, 25),
            showLine: true,
            borderWidth: 1.1,
            borderColor: ['rgba(255,70,120,0.8)'],
            pointStyle: 'crossRot'
          },
          {
            data: desiredPrice,
            label: 'Desired Price',
            showLine: true,
            borderWidth: 2,
            borderColor: 'rgba(300,140,12,0.75)',
            pointStyle: "dash"
          }
        ],
      }
      this.chartOptions = {
        plugins: {
          tooltip: {
            enabled: false
          }
        },
        scales: {
          x: {
            type: "time",
            time: {
              parser: "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
              tooltipFormat: 'll HH:mm',
              unit: "week",
              displayFormats: {
                'day': 'MM/DD/yy'
              }
            },
            ticks: {
              autoSkip: false
            }
          }
        }
      }
    });
  }
}
