import {Component, OnDestroy} from '@angular/core';
import {AvatarModule} from "primeng/avatar";
import {MessageService, SharedModule} from "primeng/api";
import {ToolbarModule} from "primeng/toolbar";
import {RouterLink} from "@angular/router";
import {TrackItemComponent} from "../track-item/track-item.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    AvatarModule,
    SharedModule,
    ToolbarModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnDestroy {

  constructor(public dialogService: DialogService, public messageService: MessageService) {}

  ref: DynamicDialogRef | undefined;

  show() {
    this.ref = this.dialogService.open(TrackItemComponent, {
      header: 'Select a Product',
      width: '580px',
      height: '450px',
      contentStyle: { overflow: 'auto' },
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
