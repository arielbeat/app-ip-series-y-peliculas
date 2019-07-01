import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerrorPage } from './terror.page';

describe('TerrorPage', () => {
  let component: TerrorPage;
  let fixture: ComponentFixture<TerrorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerrorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerrorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
