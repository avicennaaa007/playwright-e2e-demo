import { test } from '@fixtures/bank.fixture';
import { MenuPage } from '@pages/myDesktop.page';
import { users } from '@test-data/users';

test('Makes a quick transfer', async ({ page, loginToBankApp }) => {
  const menuPage = new MenuPage(page);

  await loginToBankApp(users.quickTransferUser);
  await menuPage.openQuickTransfer();
  await menuPage.selectTransferReceiver('2');
  await menuPage.fillTransferAmount('1500');
  await menuPage.fillTransferTitle('czynsz');
  await menuPage.submitTransfer();
  await menuPage.closeConfirmation();
  await menuPage.logout();
});
