import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayModalPage } from './pay-modal.page';

describe('PayModalPage', () => {
  let component: PayModalPage;
  let fixture: ComponentFixture<PayModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
