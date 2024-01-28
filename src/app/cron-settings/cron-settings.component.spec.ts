import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CronSettingsComponent } from './cron-settings.component';

describe('CronSettingsComponent', () => {
  let component: CronSettingsComponent;
  let fixture: ComponentFixture<CronSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CronSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CronSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
