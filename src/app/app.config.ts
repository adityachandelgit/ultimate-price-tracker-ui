import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
import {TrackItemComponent} from "./track-item/track-item.component";
import {DialogService} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import 'chartjs-adapter-moment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    TrackItemComponent,
    DialogService,
    MessageService
  ]
};
