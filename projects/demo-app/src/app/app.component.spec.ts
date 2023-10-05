import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeAll(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [ AppModule ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
  }));

  it('should create the component', () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('app signedIn status should be false', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.isSignedIn).toEqual(false);
  });

  it('should render title in h2 tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('SDK Demo App');
  });
});
