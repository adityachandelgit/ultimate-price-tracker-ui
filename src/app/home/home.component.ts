import {AfterViewInit, Component} from '@angular/core';
import {TableModule} from "primeng/table";
import {ItemService} from "../item.service";
import {StoreConfig} from "../models/StoreConfig";
import {ApiConfigService} from "../api-config.service";
import {Item} from "../models/Item";
import {DatePipe, SlicePipe} from "@angular/common";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TableModule,
    DatePipe,
    SlicePipe,
    ToastModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {

  items!: Item[];
  storeConfigs!: StoreConfig[];
  itemService: ItemService;
  apiConfigService: ApiConfigService;

  constructor(itemService: ItemService, apiConfigService: ApiConfigService) {
    this.apiConfigService = apiConfigService;
    this.itemService = itemService;
  }

  ngAfterViewInit(): void {
    this.apiConfigService.getStoresConfig().subscribe((storeConfigs: StoreConfig[]) => {
      this.storeConfigs = storeConfigs;
    });
    this.itemService.getItems().subscribe((items: Item[]) => {
      this.items = items;
    });
  }

  statusIconMapping(item: Item) {
    return this.storeConfigs.find(s => s.enumName == item.store)?.iconUrl;
  }

  getIcon(item: Item) {
    if (item.priceTrend == 'UP') {
      return 'pi pi-chevron-up'
    } else if (item.priceTrend == 'DOWN') {
      return 'pi pi-chevron-down'
    } else {
      return 'pi pi-circle'
    }
  }

  getStyle(element: Item) {
    if (element.priceTrend == 'UP') {
      return 'font-size: 0.6rem; color: red'
    } else if (element.priceTrend == 'DOWN') {
      return 'font-size: 0.6rem; color: green'
    } else {
      return 'font-size: 0.6rem; color: orange'
    }
  }

  calculatePercentage(element: Item) {
    return Math.round(((element.latestPrice - element.desiredPrice) / element.latestPrice) * 100);
  }

  protected readonly parseInt = parseInt;

  goToLink(item: Item) {
    window.open(item.url, "_blank");
  }
}
