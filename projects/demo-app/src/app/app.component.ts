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
    const actionResponse = await this.riskidService.triggerAction(
      NgxTsRiskidService.ACTION_TYPES.LOGIN, {
        correlationId: (Math.random() + 1).toString(36).substring(2)
      }
    );
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

  async checkoutTriggered() {
    const actionResponse = await this.riskidService.triggerAction(NgxTsRiskidService.ACTION_TYPES.CHECKOUT);
    const actionToken = actionResponse.actionToken;
      // Add code here to send the action and the received actionToken to your backend
  }

  async accountChangeTriggered() {
    const actionResponse = await this.riskidService.triggerAction(NgxTsRiskidService.ACTION_TYPES.ACCOUNT_DETAILS_CHANGE);
    const actionToken = actionResponse.actionToken;
      // Add code here to send the action and the received actionToken to your backend
  }

  async accountAuthChangeTriggered() {
    const actionResponse = await this.riskidService.triggerAction(NgxTsRiskidService.ACTION_TYPES.ACCOUNT_AUTH_CHANGE);
    const actionToken = actionResponse.actionToken;
      // Add code here to send the action and the received actionToken to your backend
  }

  async withdrawTriggered() {
    const actionResponse = await this.riskidService.triggerAction(NgxTsRiskidService.ACTION_TYPES.WITHDRAW);
    const actionToken = actionResponse.actionToken;
      // Add code here to send the action and the received actionToken to your backend
  }

  async creditsChangeTriggered() {
    const actionResponse = await this.riskidService.triggerAction(NgxTsRiskidService.ACTION_TYPES.CREDITS_CHANGE);
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
