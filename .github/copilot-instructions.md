# Copilot instructions for this repo

## Project shape

- This repo is a Playwright-based E2E and API test suite for OrangeHRM. The main config is in `playwright.config.ts` and the suite lives under `tests/`.
- UI page objects live under `pages/`, grouped by feature (admin, pim, leave, myInfo, components). They all extend `BasePage` (`pages/BasePage.ts`), which provides `goto()` and the `url` contract.
- Reusable UI sub-components extend `BaseComponent` and are exposed via page fixtures in `fixtures/PageManager.ts`.
- API layer is split into `api/clients/*` (thin HTTP wrappers) and `api/services/*` (assertion-oriented helpers). `api/clients/baseApiClient.ts` centralizes `get/post/delete/put` calls against `API_BASE_URL` from `playwright.config.ts`.
- Domain models live in `models/`, factory helpers in `tests/factorys/`, and seeded test data fixtures in `fixtures/`.

## End-to-end test architecture

- Most specs import `test` from a feature fixture, not raw `@playwright/test`. Example: `tests/admin/job/job-titles-page.spec.ts` uses `import { test } from '../../../fixtures/jobTitle';` and `fixtures/jobTitle.ts` creates a temporary job title via `JobTitlesService` before the test and deletes it afterward.
- `fixtures/PageManager.ts` is the central page-object registry. If a new page object is added, register it there and type it in `TestOptions` so specs can destructure it directly (`{ loginPage }`, `{ jobTitlesPage }`, etc.).
- Authentication is handled by `tests/setup/auth.setup.ts`: it logs in with `ADMIN_USERNAME` / `ADMIN_PASSWORD`, waits for the dashboard, then saves storage state to `playwright/.auth/user.json`.
- `helpers/apiContext.helper.ts` creates an API request context with the same saved auth state, so API tests can reuse the logged-in admin session without duplicating auth logic.

## Conventions to follow

- Prefer page-object locators built with Playwright role/text locators (`getByRole`, `getByText`, `getByLabel`) instead of CSS selectors when possible. The project does this consistently in files like `pages/loginPage.ts` and `pages/admin/job/job-titles.page.ts`.
- Keep page URLs in the `url` getter and use `goto()` from `BasePage`; do not hardcode route strings in tests unless necessary.
- When testing CRUD flows, prefer a service-layer helper for API setup/cleanup (`JobTitlesService` in `api/services/jobTitlesService.ts`) and keep the spec focused on UI assertions.
- Data is often created with factory functions such as `createRandomJobTitle()` and then validated through a page or API client.
- Use `expect` from Playwright and keep assertions close to the action being verified, as in the job-title specs.

## Execution workflow

- Required environment variables: `ADMIN_USERNAME` and `ADMIN_PASSWORD` must be set (read in `tests/setup/auth.setup.ts` and `dotenv` is included in dev dependencies but not currently auto-loaded in config).
- Run a focused test with Playwright, typically: `npx playwright test tests/admin/job/job-titles-page.spec.ts --project=chromium`.
- Run the auth setup project first when needed: `npx playwright test --project=setup` or let the browser project depend on it via `playwright.config.ts`.
- Reports are generated with the HTML reporter configured in `playwright.config.ts`; output is under `playwright-report/`.

## Specific examples to mirror

- `pages/admin/job/job-titles.page.ts` defines the page object and all stable locators; tests assert against `pageHeader`, `rows`, `addButton`, and table headers.
- `api/clients/jobTitlesApiClient.ts` and `api/services/jobTitlesService.ts` show the pattern: client does raw requests, service normalizes IDs and assertions, tests consume the service.
- `tests/admin/job/job-titles-page.spec.ts` demonstrates the repo’s expected pattern for end-to-end flows: open page, perform action, assert visible elements, and clean up created records in a `finally` block when needed.

## Important gotchas

- This repo has a few naming inconsistencies (for example, `AddSystenUserPage`, `PageManager.ts`, and mixed casing in file imports). Follow the surrounding code style rather than “correcting” names across the repo.
- Some tests depend on the authenticated admin session stored in `playwright/.auth/user.json`; do not assume UI tests can run without the setup project.
- The suite targets the OrangeHRM demo environment from `baseURL` in `playwright.config.ts`; keep test data unique by using `Date.now()` or factory-generated values when creating records.
