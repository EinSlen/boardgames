import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MorpionPage } from './morpion.page';

describe('MorpionPage', () => {
  let component: MorpionPage;
  let fixture: ComponentFixture<MorpionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MorpionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
