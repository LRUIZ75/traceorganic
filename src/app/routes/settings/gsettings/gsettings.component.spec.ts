import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { SettingsGsettingsComponent } from './gsettings.component';

describe('GsettingsComponent', () => {
  let component: SettingsGsettingsComponent;
  let fixture: ComponentFixture<SettingsGsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsGsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsGsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
