import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteesComponent } from './voluntees.component';

describe('VolunteesComponent', () => {
  let component: VolunteesComponent;
  let fixture: ComponentFixture<VolunteesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolunteesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
