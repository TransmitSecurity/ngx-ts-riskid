import { Inject, Injectable } from '@angular/core';
import type { ActionEventOptions, TSAccountProtection as TSAPType } from '../types/web_sdk';
import { SdkLoader } from './sdk-loader';

/**
 * Configuration object for the Transmit Security Account Protection SDK
 */
export interface RiskidSdkConfig {
  /**
   * Your AccountProtection client identifier
   */
  clientId: string;

  /**
   * Alternative URL to load the SDK from for 1st-party integration
   * This option overrides the {@link RiskidSdkConfig#sdkVersion} option
   */
  sdkLoadUrl?: string;

  /**
   * Version of the AccountProtection SDK to load (this setting is ignored if {@link RiskidSdkConfig#sdkLoadUrl} is set)
   * Default: latest
   */
  sdkVersion?: string;

  /**
   * A base URL to use for submission of device telemetry and actions, used for 1st-party integration
   * Default: https://collect.riskid.security
   */
  serverUrl?: string;

  /**
   * Opaque identifier of the user in your system
   * To be provided if the SDK is loaded in a context of an already authenticated user
   */
  userId?: string;

  /**
   * a callback to be called in case of unexpected errors originating from the library
   * @param error the exception object caught be the library
   */
  onError?: (error: unknown) => void;
}

export const RISKID_SDK_CONFIG = 'RiskidSdkConfig';

export interface ActionResponse {
  actionToken?: string;
}
declare let TSAccountProtection: any;

// @dynamic
@Injectable()
export class NgxTsRiskidService {
  private clientId!: string;
  private userId?: string;
  private sdkVersion!: string;
  private serverUrl!: string;
  private onError!: (err: any) => void;

  private myRiskID: TSAPType;
  public static readonly ACTION_TYPES = {
    LOGIN: 'login',
    LOGOUT: 'logout',
    REGISTER: 'register',
    TRANSACTION: 'transaction',
    PASSWORD_RESET: 'password_reset'
  };

  private initialized = false;
  private readonly RISKID_SDK_SCRIPT = 'riskid_sdk_script';

  private static readonly CONFIG_PROMISE_ERR = 'Error in the resolving the provided config promise';
  private static readonly SDK_LOAD_ERR = 'Error in loading sdk for this version provided';
  private static readonly SDK_INIT_ERR = 'Error initializing riskid sdk';
  private static readonly SDK_TRIGGER_ACTION_ERR = 'Error sending action event';
  private static readonly SDK_IDENTIFY_ERR = 'Error sending identify event';
  private static readonly SDK_UNIDENTIFY_ERR = 'Error sending unidentify event';

  /**
   * @param config A `RiskidSdkConfig` object or a `Promise` that resolves to a `RiskidSdkConfig` object
   */
  constructor(
    @Inject(RISKID_SDK_CONFIG)
    config: RiskidSdkConfig | Promise<RiskidSdkConfig>,
    private sdkLoader: SdkLoader,
  ) {
    if (config instanceof Promise) {
      config.then((conf) => {
        this.initialize(conf);
      }).catch((err) => {
        console.log(
          this.buildSdkError(err, NgxTsRiskidService.CONFIG_PROMISE_ERR)
        );
      });
    } else {
      this.initialize(config);
    }
  }

  private buildSdkError(err: any, message: string) {
    return {
      message,
      err
    };
  }

  private async initialize(config: RiskidSdkConfig) {
    if(!this.initialized) {
      this.clientId = config.clientId;
      if(config.userId) { this.userId = config.userId; }
      this.sdkVersion = config.sdkVersion || 'latest';
      this.serverUrl = config.serverUrl || 'https://collect.riskid.security/';
      const { onError = console.error } = config;
      this.onError = onError;

      try {
        await this.sdkLoader.loadSdk(this.RISKID_SDK_SCRIPT, this.sdkVersion, config.sdkLoadUrl);
        this.myRiskID = new TSAccountProtection(this.clientId, { serverPath: this.serverUrl } );
        try {
          await this.myRiskID.init({ userId: this.userId});
        } catch(err) {
          this.onError(
            this.buildSdkError(err, NgxTsRiskidService.SDK_INIT_ERR)
          );
        }
      } catch(err) {
        this.onError(
          this.buildSdkError(err, NgxTsRiskidService.SDK_LOAD_ERR)
        );
      }
      this.initialized = true;
    }
    return true;
  }

  /**
   * Reports a user action event to the SDK
   * @param actionType Type of user action event that was predefined in the Transmit Security server
   * @returns An object containing the `actionToken` response if call succeeded or `null` otherwise
   */
  async triggerAction(actionType: string, options?: ActionEventOptions): Promise<ActionResponse | null> {
    if (this.initialized) {
      try {
        return await this.myRiskID?.triggerActionEvent(actionType, options);
      } catch(err) {
        this.onError(
          this.buildSdkError(err, NgxTsRiskidService.SDK_TRIGGER_ACTION_ERR)
        );
      }
    }
    return null;
  }

  /**
   * Sets the user context for all subsequent events in the browser session (or until the user is explicitly cleared)
   * It should be set only after you've fully authenticated the user (including, for example, any 2FA that was required)
   * @param userId Opaque identifier of the user in your system
   * @param options Reserved for future use
   * @returns Boolean indication if the call succeeded
   */
  async identify(userId?: string, options?: {}): Promise<boolean> {
    if (this.initialized) {
      try {
        return await this.myRiskID.setAuthenticatedUser(userId, options);
      } catch(err) {
        this.onError(
          this.buildSdkError(err, NgxTsRiskidService.SDK_IDENTIFY_ERR)
        );
      }
    }
    return false;
  }

  /**
   * Clears the user context for all subsequent events in the browser session
   * @param options Reserved for future use
   * @returns Boolean indication if the call succeeded
   */
  async unidentify(options?: {}): Promise<boolean> {
    if (this.initialized) {
      try {
        return await this.myRiskID.clearUser(options);
      } catch(err) {
        this.onError(
          this.buildSdkError(err, NgxTsRiskidService.SDK_UNIDENTIFY_ERR)
        );
      }
    }
    return false;
  }
}
