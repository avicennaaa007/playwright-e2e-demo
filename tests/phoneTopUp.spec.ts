import { type Page } from '@playwright/test';
import { expect, test, type LoginToBankApp } from '../fixtures/bank.fixture';
import { MenuPage } from '../pages/menu.page';
import { users } from '../test-data/users';

const topUpReceiver = '500 xxx xxx';
const topUpAmount = '45';
const requiredFieldMessage = 'pole wymagane';

async function loginAndOpenPhoneTopUp(page: Page, loginToBankApp: LoginToBankApp) {
  const menuPage = new MenuPage(page);

  await loginToBankApp(users.phoneTopUpUser);
  await menuPage.openPhoneTopUp();

  return menuPage;
}

test('1. Tops up mobile phone - positive scenario', async ({ page, loginToBankApp }) => {
  const menuPage = await loginAndOpenPhoneTopUp(page, loginToBankApp);

  await menuPage.selectTopUpReceiver(topUpReceiver);
  await menuPage.fillTopUpAmount(topUpAmount);
  await menuPage.acceptTopUpAgreement();
  await menuPage.submitPhoneTopUp();
  await page.getByTestId('close-button').click();
  await page.getByTestId('logout-button').click();
});

test('2. Shows error when phone number is not selected', async ({ page, loginToBankApp }) => {
  const menuPage = await loginAndOpenPhoneTopUp(page, loginToBankApp);

  await menuPage.fillTopUpAmount(topUpAmount);
  await menuPage.acceptTopUpAgreement();
  await menuPage.submitPhoneTopUp();

  await expect(menuPage.topUpReceiverError).toHaveText(requiredFieldMessage);
});

test('3. Shows error when top-up amount is not provided', async ({ page, loginToBankApp }) => {
  const menuPage = await loginAndOpenPhoneTopUp(page, loginToBankApp);

  await menuPage.selectTopUpReceiver(topUpReceiver);
  await menuPage.acceptTopUpAgreement();
  await menuPage.submitPhoneTopUp();

  await expect(menuPage.topUpAmountError).toHaveText(requiredFieldMessage);
});

test('4. Shows error when top-up agreement checkbox is not checked', async ({ page, loginToBankApp }) => {
  const menuPage = await loginAndOpenPhoneTopUp(page, loginToBankApp);

  await menuPage.selectTopUpReceiver(topUpReceiver);
  await menuPage.fillTopUpAmount(topUpAmount);
  await menuPage.submitPhoneTopUp();

  await expect(menuPage.topUpAgreementError).toHaveText(requiredFieldMessage);
});
