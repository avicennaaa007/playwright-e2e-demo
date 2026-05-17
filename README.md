# Playwright E2E Demo

This is a small end-to-end testing project for a demo banking app:

```text
https://demo-bank.vercel.app/
```

The tests are written in TypeScript with Playwright. They check a few basic flows in the app, like logging in, making a quick transfer, and topping up a phone.

## Project structure

The project is split into a few simple folders:

```text
fixtures/
  bank.fixture.ts
```

This is where we keep reusable Playwright fixtures. Right now it has the login fixture.

```text
pages/
  login.page.ts
  menu.page.ts
```

This folder has page objects. They store locators and methods for actions we repeat in tests.

```text
test-data/
  users.ts
```

This file stores test users used in different scenarios.

```text
tests/
  loginToBank.spec.ts
  quickTransfer.spec.ts
  phoneTopUp.spec.ts
```


## Why Playwright?

I used Playwright because it is good for testing real user flows in the browser. It lets us click buttons, fill inputs, select options, and check what happens on the page.

It is also quite comfortable to use with TypeScript. Another useful thing is that Playwright waits for elements automatically in many cases, so the tests are less flaky than they would be with a lot of manual waiting.


## Why POM?

POM means Page Object Model.

I use it because raw locators inside tests can get messy very quickly. For example, this is not very readable:

```ts
await page.locator('#widget_1_transfer_amount').fill('1500');
```

Instead, we hide that locator inside `MenuPage` and use:

```ts
await menuPage.fillTransferAmount('1500');
```

The test becomes easier to read because it describes what the user is doing, not how the HTML is built.

Another reason is maintenance. If a selector changes in the app, I only need to update it in one place, for example in `menu.page.ts`, instead of searching through all test files.

In this project:

- `LoginPage` handles login page actions
- `MenuPage` handles quick transfer, phone top-up, closing confirmation popups, and logout

## Why login fixture?

Most tests need to start from the same point: user is logged in.

At first we could write the login steps in every test:

```ts
await loginPage.goto();
await loginPage.fillLogin('...');
await loginPage.fillPassword('...');
await loginPage.loginButton.click();
```

But repeating this everywhere is not great. It makes tests longer, and if the login flow changes, we would need to fix many files.

That is why we created `loginToBankApp` in `fixtures/bank.fixture.ts`.

Now a test can just do:

```ts
await loginToBankApp();
```

or pass a specific user:

```ts
await loginToBankApp(users.phoneTopUpUser);
await loginToBankApp(users.quickTransferUser);
```

So the fixture keeps the setup shorter and easier to reuse.

## How to run tests

Install dependencies:

```bash
npm install
```

Run all tests:

```bash
npx playwright test
```

Run one test file:

```bash
npx playwright test tests/phoneTopUp.spec.ts
```

Open Playwright report:

```bash
npx playwright show-report
```

## What is covered now

- login with valid user
- login button disabled when credentials are missing
- quick transfer
- phone top-up
- phone top-up errors when phone number, amount, or checkbox is missing
