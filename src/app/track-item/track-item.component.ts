import {AfterViewInit, Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {ApiConfigService} from "../api-config.service";
import {StoreConfig} from "../models/StoreConfig";
import {NgIf} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ItemOptions, NewItemInfo, SizePrices} from "../models/NewItemInfo";
import {ItemService} from "../item.service";
import {DialogModule} from "primeng/dialog";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {AddItem} from "../models/AddItem";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-track-item',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    RippleModule,
    NgIf,
    DialogModule,
    ToastModule
  ],
  templateUrl: './track-item.component.html',
  styleUrl: './track-item.component.scss'
})
export class TrackItemComponent implements AfterViewInit {

  storeConfigs!: StoreConfig[];
  newItemInfo!: NewItemInfo;
  hasColorSize!: boolean;

  addItemForm = new FormGroup({
    store: new FormControl<StoreConfig | null>(null, Validators.required),
    itemId: new FormControl<string | null>(null, Validators.required),
    color: new FormControl<ItemOptions | null>(null),
    size: new FormControl<SizePrices | null>(null),
    price: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(10),
      Validators.max(10000),
      Validators.pattern("^[0-9]+$")
    ]),
  });

  constructor(private apiConfigService: ApiConfigService, private itemService: ItemService,
              private ref: DynamicDialogRef, private messageService: MessageService) {
  }

  ngAfterViewInit(): void {
    this.apiConfigService.getStoresConfig().subscribe((storeConfigs: StoreConfig[]) => {
      this.storeConfigs = storeConfigs;
    });
  }

  trackItem() {
    const addItem: AddItem = {
      externalId: this.addItemForm.controls.itemId.value as string,
      desiredPrice: this.addItemForm.controls.price.value as number,
      store: (this.addItemForm.controls.store.value as StoreConfig).enumName as string,
      metadata: this.addItemForm.controls.color.value == null || this.addItemForm.controls.size.value == null ? null : {
        color: {
          id: this.addItemForm.controls.color.value?.color.id,
          name: this.addItemForm.controls.color.value?.color.name
        },
        size: {
          id: this.addItemForm.controls.size.value?.size.id,
          name: this.addItemForm.controls.size.value?.size.name
        }
      }
    };

    this.itemService.addItem(addItem).subscribe(
      {
        next: (v) => {
        },
        error: (e) => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to track item'});
          this.ref.close();
        },
        complete: () => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Successfully tracked item'});
          this.ref.close();
        }
      })

  }

  getNewItemInfo() {
    let store = this.addItemForm.controls.store.value as StoreConfig;
    this.itemService.getNewItemInfo(store.enumName, this.addItemForm.controls.itemId.value as string).subscribe(
      {
        next: (newItemInfo) => {
          this.newItemInfo = newItemInfo;
          this.hasColorSize = newItemInfo.options != null;
        },
        error: (e) => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to search item'});
        },
        complete: () => {

        }
      }

    );
  }

  getSizes() {
    let itemOptions = this.addItemForm.controls.color.value;
    return this.newItemInfo.options
      .filter(x => x.color.id == itemOptions?.color.id)
      .flatMap(y => y.sizePrices);
  }

  shouldShowPriceInput() {
    return this.newItemInfo?.imageUrl != null && (!this.hasColorSize || (this.addItemForm.controls.color.value != null && this.addItemForm.controls.size.value != null))
  }

  onStoreChange() {
    this.addItemForm.controls.itemId.reset()
    this.addItemForm.controls.size.reset()
    this.addItemForm.controls.color.reset()
    this.addItemForm.controls.price.reset()
    this.hasColorSize = false;
    this.newItemInfo.imageUrl = null;
  }

  getimageUrl() {
    return this.newItemInfo.imageUrl
  }
}
