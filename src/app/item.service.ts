import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Item} from "./models/Item";
import {environment} from "../environments/environment";
import {NewItemInfo} from "./models/NewItemInfo";
import {AddItem} from "./models/AddItem";
import {ItemHistory} from "./models/Item-History";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getItems() {
    return this.http.get<Item[]>(environment.apiUrl + '/items');
  }

  addItem(addItem: AddItem) {
    return this.http.post<Item>(environment.apiUrl + '/items', addItem);
  }

  deleteItem(itemId: number) {
    return this.http.delete(environment.apiUrl + '/items/' + itemId);
  }

  getNewItemInfo(store: string, itemId: string) {
    return this.http.get<NewItemInfo>(environment.apiUrl + '/new-item-info/store/' + store + '/item/' + itemId);
  }

  getItemPriceHistory(itemId: number, store: string) {
    return this.http.post<ItemHistory[]>(environment.apiUrl + '/price-history', {
      'itemId': itemId,
      'storeType': store
    });
  }

}
