import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Texut22Component } from './texut22.component';

describe('Texut22Component', () => {
  let component: Texut22Component;
  let fixture: ComponentFixture<Texut22Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Texut22Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Texut22Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
