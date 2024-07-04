import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MinesweeperPage } from './minesweeper.page';

describe('MinesweeperPage', () => {
  let component: MinesweeperPage;
  let fixture: ComponentFixture<MinesweeperPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MinesweeperPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
