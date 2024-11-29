import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByPostalCodeComponent } from './by-postal-code.component';

describe('ByPostalCodeComponent', () => {
  let component: ByPostalCodeComponent;
  let fixture: ComponentFixture<ByPostalCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ByPostalCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByPostalCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
