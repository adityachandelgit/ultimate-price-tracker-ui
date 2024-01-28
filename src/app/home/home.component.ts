import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {ItemService} from "../item.service";
import {StoreConfig} from "../models/StoreConfig";
import {ApiConfigService} from "../api-config.service";
import {Item} from "../models/Item";
import {DatePipe, SlicePipe} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {ImageModule} from "primeng/image";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ItemPriceHistoryComponent} from "../item-price-history/item-price-history.component";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TableModule,
    DatePipe,
    SlicePipe,
    ToastModule,
    ImageModule,
    FormsModule,
    InputTextModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  items!: Item[];
  storeConfigs!: StoreConfig[];
  itemService: ItemService;
  apiConfigService: ApiConfigService;
  ref: DynamicDialogRef | undefined;
  protected readonly parseInt = parseInt;


  constructor(itemService: ItemService, apiConfigService: ApiConfigService, public dialogService: DialogService, public messageService: MessageService) {
    this.apiConfigService = apiConfigService;
    this.itemService = itemService;
  }

  ngOnInit(): void {
    this.apiConfigService.getStoresConfig().subscribe((storeConfigs: StoreConfig[]) => {
      this.storeConfigs = storeConfigs;
    });
    this.itemService.getItems().subscribe((items: Item[]) => {
      this.items = items;
    });
  }

  showPriceHistory(item: Item) {
    this.ref = this.dialogService.open(ItemPriceHistoryComponent, {
      data: item,
      showHeader: false,
      closable: true,
      dismissableMask: true
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

  goToLink(item: Item) {
    window.open(item.url, "_blank");
  }

  saveNewPrice($event: any, item: Item) {
    console.log(item)
    let newPrice = ($event.target as HTMLInputElement).value;
    if (!isNaN(Number(newPrice))) {
      this.itemService.updatePrice(item.id, newPrice).subscribe(
        {
          next: (v: Item) => {
            console.log(v)
            let indexToUpdate = this.items.findIndex(i => i.id === item.id)
            this.items[indexToUpdate] = v;
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Successfully updated item price'});
          },
          error: (e) => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to update item price'});
          }
        }
      )
    } else {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'New price must be a number'});
    }
  }


}
