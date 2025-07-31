export interface ActionResponse {
  /** The token return by the SDK when the action was reported */
  actionToken?: string;
}
export interface InitOptions {
  /** Opaque identifier of the user in your system */
  userId?: string;
}
/**
 * Initial parameters for SDK
 */
export interface ConstructorOptions {
  /** Print logs to console */
  verbose?: boolean;
  /**
   * Your server URL
   *
   * Default value is https://collect.riskid.security
   */
  serverPath?: string;
}
export interface ActionEventOptions {
  /** Any ID that could help relate the action with external context or session */
  correlationId?: string;
  /**
   * User ID of the not yet authenticated user, used to enhance risk and
   * trust assessments. Once the user is authenticated,
   * {@link TSAccountProtection.setAuthenticatedUser} should be called.
   */
  claimedUserId?: string;
}

export declare class TSAccountProtection {
  /**
   *
   * Creates a new Account Protection SDK instance with your client context
   * @param clientId Your AccountProtection client identifier
   * @param options SDK configuration options
   */
  constructor(clientId: string, options?: ConstructorOptions);
  /**
   * Initializes the AccountProtection SDK, which starts automatically tracking and submitting info of the user journey
   * @param options Init options
   * @returns Indicates if the call succeeded
   */
  init(options?: InitOptions): Promise<boolean>;
  /**
   * Reports a user action event to the SDK
   * @param actionType Type of user action event that was predefined in the Transmit Security server
   * @returns Indicates if the call succeeded
   */
  triggerActionEvent(
    actionType: string,
    options?: ActionEventOptions
  ): Promise<ActionResponse>;
  /**
   * Sets the user context for all subsequent events in the browser session (or until the user is explicitly cleared)
   * It should be set only after you've fully authenticated the user (including, for example, any 2FA that was required)
   * @param userId Opaque identifier of the user in your system
   * @param options Reserved for future use
   * @returns Indicates if the call succeeded
   */
  setAuthenticatedUser(userId: string, options?: {}): Promise<boolean>;
  /**
   * Clears the user context for all subsequent events in the browser session
   * @param options Reserved for future use
   * @returns Indicates if the call succeeded
   */
  clearUser(options?: {}): Promise<boolean>;
}
