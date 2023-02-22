import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NgxTsRiskidModule, RiskidSdkConfig, RISKID_SDK_CONFIG } from '@transmitsecurity/ngx-ts-riskid';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxTsRiskidModule],
  providers: [
    {
      provide: RISKID_SDK_CONFIG,
      useValue: {
        clientId: 'abc.123.demo-tenant.riskid.dev',
        // sdkLoadUrl: 'http://127.0.0.1:8888/dist/sdk.iife.js',
        userId: 'demo-user-id',
        onError: (err: Error) => {
          console.log(err);
        }
      } as RiskidSdkConfig,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
