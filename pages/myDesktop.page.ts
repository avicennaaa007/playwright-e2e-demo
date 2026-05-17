import { type Locator, type Page } from '@playwright/test';

export class MenuPage {
  readonly quickTransferLink: Locator;
  readonly transferReceiverSelect: Locator;
  readonly transferAmountInput: Locator;
  readonly transferTitleInput: Locator;
  readonly transferButton: Locator;
  readonly phoneTopUpLink: Locator;
  readonly topUpReceiverSelect: Locator;
  readonly topUpAmountInput: Locator;
  readonly topUpAgreementCheckbox: Locator;
  readonly topUpAgreementCheckboxControl: Locator;
  readonly topUpPhoneButton: Locator;
  readonly topUpReceiverError: Locator;
  readonly topUpAmountError: Locator;
  readonly topUpAgreementError: Locator;
  readonly closeButton: Locator;
  readonly logoutButton: Locator;

  constructor(private readonly page: Page) {
    this.quickTransferLink = page.getByRole('navigation').getByRole('link', { name: 'szybki przelew' });
    this.transferReceiverSelect = page.locator('#widget_1_transfer_receiver');
    this.transferAmountInput = page.locator('#widget_1_transfer_amount');
    this.transferTitleInput = page.locator('#widget_1_transfer_title');
    this.transferButton = page.getByRole('button', { name: 'wykonaj' });
    this.phoneTopUpLink = page.getByRole('link', { name: 'doładowanie telefonu' });
    this.topUpReceiverSelect = page.locator('#widget_1_topup_receiver');
    this.topUpAmountInput = page.locator('#widget_1_topup_amount');
    this.topUpAgreementCheckbox = page.locator('#widget_1_topup_agreement');
    this.topUpAgreementCheckboxControl = page.locator('#uniform-widget_1_topup_agreement > span');
    this.topUpPhoneButton = page.locator('#execute_btn');
    this.topUpReceiverError = page.getByTestId('error-widget-1-topup-receiver');
    this.topUpAmountError = page.getByTestId('error-widget-1-topup-amount');
    this.topUpAgreementError = page.getByTestId('error-widget-1-topup-agreement');
    this.closeButton = page.getByTestId('close-button');
    this.logoutButton = page.getByTestId('logout-button');
  }

  async openQuickTransfer() {
    await this.quickTransferLink.click();
  }

  async selectTransferReceiver(receiver: string) {
    await this.transferReceiverSelect.selectOption(receiver);
  }

  async fillTransferAmount(amount: string) {
    await this.transferAmountInput.fill(amount);
  }

  async fillTransferTitle(title: string) {
    await this.transferTitleInput.fill(title);
  }

  async submitTransfer() {
    await this.transferButton.click();
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

  async closeConfirmation() {
    await this.closeButton.click();
  }

  async logout() {
    await this.logoutButton.click();
  }
}
