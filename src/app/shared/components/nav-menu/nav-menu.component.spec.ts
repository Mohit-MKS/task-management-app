import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMenuComponent } from './nav-menu.component';
import { By } from '@angular/platform-browser';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

@Component({
  template: ''
})
class DummyComponent { }

const routes: Routes = [
  { path: 'dashboard', component: DummyComponent },
  { path: 'task', component: DummyComponent }
];

describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavMenuComponent],
      imports: [RouterTestingModule.withRoutes(routes)]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should render the navigation menu items', () => {
    const navItems = fixture.debugElement.queryAll(By.css('.nav-item'));
    expect(navItems.length).toBe(2);
    expect(navItems[0].nativeElement.textContent).toContain('Dashboard');
    expect(navItems[1].nativeElement.textContent).toContain('Tasks');
  });

  it('should apply "active" class to the correct link when the route is active', async () => {
    await router.navigate(['/dashboard']);
    fixture.detectChanges();
    await fixture.whenStable();
    const activeNavLink = fixture.debugElement.query(By.css('a.active'));
    expect(activeNavLink).toBeTruthy();
    expect(activeNavLink.nativeElement.textContent).toContain('Dashboard');

  });

  it('should not have "active" class on the other link when one link is active', async () => {
    await router.navigate(['/dashboard']);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const inactiveNavLink = fixture.debugElement.query(By.css('a:not(.active)'));
      expect(inactiveNavLink.nativeElement.textContent).toContain('Tasks');
    });
  });
});
