import { type Locator, type Page } from '@playwright/test';

export class MenuPage {
  readonly phoneTopUpLink: Locator;
  readonly topUpReceiverSelect: Locator;
  readonly topUpAmountInput: Locator;
  readonly topUpAgreementCheckbox: Locator;
  readonly topUpAgreementCheckboxControl: Locator;
  readonly topUpPhoneButton: Locator;
  readonly topUpReceiverError: Locator;
  readonly topUpAmountError: Locator;
  readonly topUpAgreementError: Locator;

  constructor(private readonly page: Page) {
    this.phoneTopUpLink = page.getByRole('link', { name: 'doładowanie telefonu' });
    this.topUpReceiverSelect = page.locator('#widget_1_topup_receiver');
    this.topUpAmountInput = page.locator('#widget_1_topup_amount');
    this.topUpAgreementCheckbox = page.locator('#widget_1_topup_agreement');
    this.topUpAgreementCheckboxControl = page.locator('#uniform-widget_1_topup_agreement > span');
    this.topUpPhoneButton = page.locator('#execute_btn');
    this.topUpReceiverError = page.getByTestId('error-widget-1-topup-receiver');
    this.topUpAmountError = page.getByTestId('error-widget-1-topup-amount');
    this.topUpAgreementError = page.getByTestId('error-widget-1-topup-agreement');
  }

  async openPhoneTopUp() {
    await this.phoneTopUpLink.click();
  }

  async selectTopUpReceiver(receiver: string) {
    await this.topUpReceiverSelect.selectOption(receiver);
  }

  async fillTopUpAmount(amount: string) {
    await this.topUpAmountInput.fill(amount);
  }

  async acceptTopUpAgreement() {
    await this.topUpAgreementCheckboxControl.click();
  }

  async submitPhoneTopUp() {
    await this.topUpPhoneButton.click();
  }
}
