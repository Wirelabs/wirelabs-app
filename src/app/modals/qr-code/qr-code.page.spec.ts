import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, IonRouterOutlet } from '@ionic/angular';

import { QrCodePage } from './qr-code.page';

describe('QrCodePage', () => {
  let component: QrCodePage;
  let fixture: ComponentFixture<QrCodePage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [QrCodePage],
        imports: [IonicModule.forRoot(), HttpClient],
        providers: [
          {
            provide: IonRouterOutlet,
            useValue: {
              //add whatever property of IonRouterOutlet you're using in component class
              nativeEl: '',
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(QrCodePage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
