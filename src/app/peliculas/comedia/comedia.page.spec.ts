import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComediaPage } from './comedia.page';

describe('ComediaPage', () => {
  let component: ComediaPage;
  let fixture: ComponentFixture<ComediaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComediaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComediaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
