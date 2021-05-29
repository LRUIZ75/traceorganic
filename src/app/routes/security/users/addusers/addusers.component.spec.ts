import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddusersComponent } from './addusers.component';

describe('AddusersComponent', () => {
  let component: AddusersComponent;
  let fixture: ComponentFixture<AddusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddusersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
