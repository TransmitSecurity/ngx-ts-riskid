# Changelog

## Version 2.0.0

1. Upgrade to Angular 13

## Version 1.2.2

1. Align recommended action types to all basic DRS action types from the [documentation](https://developer.transmitsecurity.com/guides/risk/quick_start_web/#:~:text=event%20handler%29.%20The-,%5BACTION_TYPE%5D,-can%20be%20either)

## Version 1.2.1

1. Introduce a new optional config element `onInit`, which behaves as a callback to allow executing logic when the service and Account Protection SDK are initialized

## Version 1.2.0

**Note:** this version requires SDK >= `1.40.0`

1. Update wrapper interface to expose SDK method options, e.g. `triggerAction`'s `correlationId`

## Version 1.1.8

1. Update package license to MIT
1. Setup upload to npmjs as public package

## Version 1.1.7

1. Add `RiskidSdkConfig#sdkLoadUrl` to allow first party integration with custom URL for SDK loading

## Version 1.0.6

1. Fix an issue were `await`ing on `identify` and `unifentify` would not really await the event that is sent to RiskID backend systems

## Version 1.0.5

1. Use production CDN to load SDK
1. Default SDK's `serverUrl` to the production URL (`'https://collect.riskid.security/'`)
1. Default SDK's `version` to `'latest'`
1. Changed `RiskidSdkConfig.tenantId` to `RiskidSdkConfig.clientId` to align with SDK interface

### Upgrade guide

When bootstrapping the angular module:

1. Remove the `version` and `serverUrl` entities from the `RISKID_SDK_CONFIG` provider value
1. Change the `tenantId` entity to `clientId` (this is a good time to ensure you are using an up to date ClientID)
1. If you have CSP headers configured:
   1. Update the `scriptSrc` header to include `https://cdn.riskid.security/`
   1. Update the `connectSrc` header to include `https://collect.riskid.security/`

You should end up with something like the following:

```javascript
import { NgxTsRiskidModule, RiskidSdkConfig, RISKID_SDK_CONFIG } from '@transmitsecurity/ngx-ts-riskid';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, NgxTsRiskidModule],
  providers: [
    {
      provide: RISKID_SDK_CONFIG,
      useValue: {
        clientId: '<your-client-id-here>',
        userId: 'demo-user-id', // optional, in case the userId is known
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
