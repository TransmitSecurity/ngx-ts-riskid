# NgxTsRiskid

An [Angular](https://angular.io/) wrapper for the RiskID SDK

### Install via npm/yarn

```sh
npm i @transmitsecurity/ngx-ts-riskid
```

or

```sh
yarn add @transmitsecurity/ngx-ts-riskid
```

### Import the module

1. In your `AppModule`, import the `NgxTsRiskidModule`
2. Provide values for RISKID_SDK_CONFIG like the example below

```javascript
import { NgxTsRiskidModule, RiskidSdkConfig, RISKID_SDK_CONFIG } from '@transmitsecurity/ngx-ts-riskid';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, NgxTsRiskidModule],
  providers: [
    {
      provide: RISKID_SDK_CONFIG,
      useValue: {
        clientId: 'abc.123.demo-tenant.riskid.dev',
        userId: 'demo-user-id', // optional, in case the userId is known
        sdkVersion: 'latest', // or use a strict version provided by RiskID
        serverUrl: 'https://collect.riskid.security/',
        onError: (err: Error) => {
          console.log(err);
        }
      } as RiskidSdkConfig,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

### Using RiskID SDK service in your components:

```javascript

import { Component } from '@angular/core';
import { NgxTsRiskidService } from '@transmitsecurity/ngx-ts-riskid';

@Component({
  selector: 'app-root-demo',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isSignedIn = false;

  constructor(private riskidService: NgxTsRiskidService) {}

  async registerTriggered() {
      const actionResponse = await this.riskidService.triggerAction(NgxTsRiskidService.ACTION_TYPES.REGISTER);
      const actionToken = actionResponse.actionToken;
      // Add code here to send the action and the received actionToken to your backend
  }

  async loginTriggered() {
    const actionResponse = await this.riskidService.triggerAction(NgxTsRiskidService.ACTION_TYPES.LOGIN);
    const actionToken = actionResponse.actionToken;
      // Add code here to send the action and the received actionToken to your backend
  }

  async logoutTriggered() {
    const actionResponse = await this.riskidService.triggerAction(NgxTsRiskidService.ACTION_TYPES.LOGOUT);
    const actionToken = actionResponse.actionToken;
      // Add code here to send the action and the received actionToken to your backend
  }

  async transactionTriggered() {
    const actionResponse = await this.riskidService.triggerAction(NgxTsRiskidService.ACTION_TYPES.TRANSACTION);
    const actionToken = actionResponse.actionToken;
      // Add code here to send the action and the received actionToken to your backend
  }

  async passwordResetTriggered() {
    const actionResponse = await this.riskidService.triggerAction(NgxTsRiskidService.ACTION_TYPES.PASSWORD_RESET);
    const actionToken = actionResponse.actionToken;
      // Add code here to send the action and the received actionToken to your backend
  }

  async identifyUser(userId: string) {
      await this.riskidService.identify(userId); // invoked after successful authentication
      this.isSignedIn = true;
  }

  async unidentify() {
      await this.riskidService.unidentify(); // invoked after successful logout
      this.isSignedIn = false;
  }
}
```
