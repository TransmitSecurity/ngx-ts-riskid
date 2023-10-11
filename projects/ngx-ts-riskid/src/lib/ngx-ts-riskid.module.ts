import { NgModule, ModuleWithProviders, Optional, SkipSelf, } from '@angular/core';
import { NgxTsRiskidService, RiskidSdkConfig, RISKID_SDK_CONFIG } from './ngx-ts-riskid.service';
import { SdkLoader } from './sdk-loader';

/**
 * The main module of RiskID SDK wrapper
 */

@NgModule({
    imports: [],
    providers: [
        NgxTsRiskidService,
        SdkLoader
    ]
})
export class NgxTsRiskidModule {
    public static initialize(config: RiskidSdkConfig): ModuleWithProviders<NgxTsRiskidModule> {
        return {
            ngModule: NgxTsRiskidModule,
            providers: [
                SdkLoader,
                NgxTsRiskidService,
                {
                    provide: RISKID_SDK_CONFIG,
                    useValue: config
                }
            ]
        };
    }

    constructor(@Optional() @SkipSelf() parentModule: NgxTsRiskidModule) {
        if (parentModule) {
            throw new Error(
                'NgxTsRiskidModule is already loaded. Import it in the AppModule only');
        }
    }
}
