import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Cron} from "./models/Cron";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CronService {

  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getCrons() {
    return this.http.get<Cron[]>(environment.apiUrl + '/cron');
  }

  saveCron(cron: Cron) {
    return this.http.put<Cron[]>(environment.apiUrl + '/cron', cron);
  }

}
