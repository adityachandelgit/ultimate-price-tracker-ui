import {Component, OnDestroy, OnInit} from '@angular/core';
import {AvatarModule} from "primeng/avatar";
import {MenuItem, MessageService, SharedModule} from "primeng/api";
import {ToolbarModule} from "primeng/toolbar";
import {TrackItemComponent} from "../track-item/track-item.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {SpeedDialModule} from "primeng/speeddial";
import {CronSettingsComponent} from "../cron-settings/cron-settings.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    AvatarModule,
    SharedModule,
    ToolbarModule,
    SpeedDialModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnDestroy, OnInit {

  ref: DynamicDialogRef | undefined;
  items!: MenuItem[];

  constructor(public dialogService: DialogService, public messageService: MessageService) {
  }

  ngOnInit(): void {
    this.items = [
      {
        icon: 'pi pi-pencil',
        command: () => {
          this.ref = this.dialogService.open(CronSettingsComponent, {
            header: 'Cron Settings:',
            width: '700px',
            height: '400px',
            contentStyle: {overflow: 'auto'}
          });
        }
      },
      {
        icon: 'pi pi-external-link',
        target: '_blank',
        url: 'http://angular.io'
      }
    ];
  }

  show() {
    this.ref = this.dialogService.open(TrackItemComponent, {
      header: 'Select a Product',
      width: '580px',
      height: '450px',
      contentStyle: {overflow: 'auto'},
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      }
    });
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }



}
