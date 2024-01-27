import {Component} from '@angular/core';
import {AvatarModule} from "primeng/avatar";
import {ToolbarModule} from "primeng/toolbar";
import {SharedModule} from "primeng/api";
import {SplitButtonModule} from "primeng/splitbutton";
import {InputTextModule} from "primeng/inputtext";
import {HeaderComponent} from "./header/header.component";
import {TrackItemComponent} from "./track-item/track-item.component";
import {HomeComponent} from "./home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AvatarModule, ToolbarModule, SharedModule, SplitButtonModule, InputTextModule, HeaderComponent, TrackItemComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ultimate-price-tracker-ui';
}
