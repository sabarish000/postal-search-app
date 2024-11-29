import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByAddressComponent } from './by-address.component';

describe('ByAddressComponent', () => {
  let component: ByAddressComponent;
  let fixture: ComponentFixture<ByAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ByAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
