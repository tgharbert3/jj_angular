import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccCreatedComponent } from './acc-created.component';

describe('AccCreatedComponent', () => {
  let component: AccCreatedComponent;
  let fixture: ComponentFixture<AccCreatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccCreatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
