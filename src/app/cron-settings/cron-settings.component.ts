import {Component, OnInit} from '@angular/core';
import {CronService} from "../cron.service";
import {Cron} from "../models/Cron";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-cron-settings',
  standalone: true,
  imports: [
    TableModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    RippleModule,
    NgIf
  ],
  templateUrl: './cron-settings.component.html',
  styleUrl: './cron-settings.component.scss'
})
export class CronSettingsComponent implements OnInit {

  crons!: Cron[];
  clonedCrons: { [s: string]: Cron } = {};

  constructor(public cronService: CronService) {
  }

  ngOnInit(): void {
    this.cronService.getCrons().subscribe((crons: Cron[]) => {
      this.crons = crons;
    })
  }

  getCronEnabledOptions() {
    return [true, false]
  }

  onRowEditInit(cron: Cron) {
    this.clonedCrons[cron.jobName as string] = {...cron};
  }

  onRowEditSave(cron: Cron, index: number) {
    this.cronService.saveCron(cron).subscribe(
      {
        error: (e) => {
          this.crons[index] = this.clonedCrons[cron.jobName as string];
          delete this.clonedCrons[cron.jobName as string];
          this.crons = this.crons.slice();
        },
        complete: () => {
          delete this.clonedCrons[cron.jobName as string];
        }
      }
    );
  }

  onRowEditCancel(cron: Cron, index: number) {
    this.crons[index] = this.clonedCrons[cron.jobName as string];
    delete this.clonedCrons[cron.jobName as string];
  }

}
