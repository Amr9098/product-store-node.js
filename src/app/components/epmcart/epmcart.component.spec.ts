import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpmcartComponent } from './epmcart.component';

describe('EpmcartComponent', () => {
  let component: EpmcartComponent;
  let fixture: ComponentFixture<EpmcartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpmcartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpmcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
