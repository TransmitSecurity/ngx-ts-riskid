/**
 * The token return by the SDK when the action was reported
 */
export declare class ActionResponse {
    actionToken?: string;
}
export declare class RiskID {
    /**
     *
     Creates a new RiskID instance with your client context
     @param serverPath Your server URL
     @param clientId Your RiskID client identifier
     @param options Additional SDK configuration options
     */
    constructor(serverPath: string, clientId: string, bindIdPath?: string, options?: {
        verbose?: boolean;
    });
    /**
     * @ignore
     * @returns List of loaded actions that can be invoked
     */
    get actions(): string[];
    /**
     * Initializes the RiskID SDK, which starts automatically tracking and submitting info of the user journey
     * @param userId Opaque identifier of the user in your system
     * @returns Indicates if the call succeeded
     */
    init(userId?: string): Promise<boolean>;
    /**
     * Reports a user action event to the SDK
     * @param actionType Type of user action event that was predefined in the RiskID server
     * @returns Indicates if the call succeeded
     */
    triggerActionEvent(actionType: string): Promise<ActionResponse>;
    /**
     * @ignore
     */
    identifyUser(userId: string): Promise<boolean>;
    /**
     * @ignore
     */
    unidentifiedUser(): Promise<boolean>;
    /**
     * Sets the user context for all subsequent events in the browser session (or until the user is explicitly cleared)
     * @param userId Opaque identifier of the user in your system
     * @returns Indicates if the call succeeded
     */
    setUser(userId: string): Promise<boolean>;
    /**
     * Clears the user context for all subsequent events in the browser session
     * @returns Indicates if the call succeeded
     */
    clearUser(): Promise<boolean>;
}
