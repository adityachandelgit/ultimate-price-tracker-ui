import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {StoreConfig} from "./models/StoreConfig";
import {of, tap} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  private http: HttpClient;
  private storeConfig: StoreConfig[] | undefined

  constructor(http: HttpClient) {
    this.http = http
  }

  getStoresConfig() {
    if (this.storeConfig) {
      return of(this.storeConfig);
    } else {
      return this.http.get<StoreConfig[]>(environment.apiUrl + '/config/store').pipe(
        tap(x => this.storeConfig = x)
      );
    }
  }
}
