# Automation Exercise – Playwright Test Suite

End-to-end UI automation for [automationexercise.com](https://automationexercise.com) built with **Playwright + TypeScript**, following the Page Object Model.

## Tech stack

- [Playwright Test](https://playwright.dev/) (TypeScript)
- Allure + Playwright HTML reports
- GitHub Actions CI

## Getting started

```bash
npm ci
npx playwright install chromium
npm test
```

## Running tests

| Command | Description |
|---|---|
| `npm test` | Run all tests (chromium) |
| `npm run test:headed` | Run in headed mode |
| `npm run test:smoke` | Smoke tests (`@smoke`) |
| `npm run test:regression` | Regression tests (`@regression`) |
| `npm run test:account` / `contact` / `navigation` / `products` / `subscription` / `cart` / `ecommerce` / `extra` | Run a feature group by tag |
| `npm run test:allure` | Run with the Allure reporter |
| `npm run allure:report` | Generate and open the Allure report |

Run a single test case by its tag, e.g. `npx playwright test --grep @TC14`.

### Configuration

| Variable | Purpose | Default |
|---|---|---|
| `BASE_URL` | Target application URL | `https://automationexercise.com` |
| `ALL_BROWSERS` | Set to any value to also run Firefox and WebKit | chromium only |

Example (PowerShell): `$env:ALL_BROWSERS=1; npm test`

## Project structure

```
tests/
├─ *.spec.ts          Test specs, tagged by test case (@TC01…@TC26) and feature
├─ fixtures.ts        Playwright fixtures (page objects, components, flows, test user)
├─ testData.ts        Test data and data factories
├─ pages/             Page Objects (*.page.ts)
├─ components/        Shared UI components (header, footer)
└─ flows/             Reusable business workflows (account, ecommerce)
```

| Layer | Responsibility |
|---|---|
| Specs | Describe business scenarios and expected behavior |
| Pages / Components | Locators and UI interactions |
| Flows | Multi-page workflows (register, checkout and pay, …) |
| Fixtures | Inject pages, flows, and a fresh unique user into each test |
| testData | Static data and factories (e.g. unique email per run) |

Coding conventions are documented in [.github/copilot-instructions.md](.github/copilot-instructions.md).

## Covered scenarios

Test cases 1–26 from the Automation Exercise test-case list: registration, login/logout, contact form, products, search, subscription, cart, checkout, invoice download, category/brand filters, reviews, recommended items, and scroll behavior. Extra validation tests live in `additional-filters.spec.ts`.

## Reports

- Playwright HTML report: `playwright-report/` (`npx playwright show-report`)
- Allure results: `allure-results/` (`npm run allure:report`)

Failure screenshots and videos are kept automatically; traces are captured on the first retry.

## CI

[`.github/workflows/playwright.yml`](.github/workflows/playwright.yml) runs the suite on chromium for every push and pull request to `main`/`master` and uploads the HTML report as an artifact.
