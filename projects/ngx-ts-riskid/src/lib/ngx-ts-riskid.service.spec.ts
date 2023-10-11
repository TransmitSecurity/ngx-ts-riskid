import { TestBed } from '@angular/core/testing';
import { NgxTsRiskidService, RiskidSdkConfig, RISKID_SDK_CONFIG } from './ngx-ts-riskid.service';
import { SdkLoader } from './sdk-loader';

describe('NgxTsRiskidService establishment', () => {
    let service: NgxTsRiskidService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SdkLoader,
                NgxTsRiskidService,
                {
                    provide: RISKID_SDK_CONFIG,
                    useValue: {
                        clientId: 'abc.123.demo-tenant.riskid.dev',
                        userId: 'demo-user-id',
                    } as RiskidSdkConfig,
                }
            ]
        });

        service = TestBed.inject(NgxTsRiskidService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
