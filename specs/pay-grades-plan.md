# Pay Grades Test Plan

## Application Overview

Test plan for the OrangeHRM Admin > Pay Grades page, covering page load, creation, validation, edit, deletion, and integrity checks for a logged-in admin user on a fresh environment.

## Test Scenarios

### 1. pay-grades

**Seed:** `tests/seed.spec.ts`

#### 1.1. Page loads and renders the pay grade list

**File:** `specs/pay-grades-plan.md`

**Steps:**
  1. Open the page https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewPayGrades.
  2. Wait for the page to finish loading.
  3. Verify the page header reads 'Pay Grades'.
  4. Check that the Add button is visible and enabled.
  5. Review the table columns and confirm they include Name, Currency, and Actions.
  6. Confirm the list displays the seeded pay grades and a records count is visible.

**Expected Results:**
  - The page loads successfully without errors.
  - The Pay Grades table renders with all expected columns.
  - The Add button is available, and at least one pay grade record is visible in the grid.

#### 1.2. Add a new pay grade with valid data

**File:** `specs/pay-grades-plan.md`

**Steps:**
  1. Open the Pay Grades page.
  2. Click the Add button.
  3. Enter a unique pay grade name, for example a timestamped value such as 'Automation Pay Grade 1712345678901'.
  4. Select a valid currency from the currency dropdown.
  5. Save the pay grade.
  6. Wait for the success confirmation or redirect back to the pay grade list.
  7. Search for the newly created name in the list.

**Expected Results:**
  - The new pay grade is created successfully.
  - A success message or page refresh confirms the save.
  - The new pay grade appears in the table with the selected currency.
  - The application remains stable after save.

#### 1.3. Validation prevents incomplete or invalid pay grade submissions

**File:** `specs/pay-grades-plan.md`

**Steps:**
  1. Open the Pay Grades page.
  2. Click Add.
  3. Attempt to save with the required fields left blank.
  4. Verify the validation feedback for missing name or missing currency.
  5. Attempt to create a record with a duplicate name if the business rule enforces unique names.
  6. Submit again with corrected data to confirm the validation clears only when valid input is provided.

**Expected Results:**
  - The form does not submit with empty or invalid data.
  - Validation messages are visible, clear, and specific to the missing or invalid fields.
  - Duplicate or incomplete submissions are blocked until the user corrects the input.

#### 1.4. Edit an existing pay grade

**File:** `specs/pay-grades-plan.md`

**Steps:**
  1. Open the Pay Grades page.
  2. Select an existing pay grade row and click the Edit action.
  3. Update the pay grade name and/or currency to a valid new value.
  4. Save the changes.
  5. Return to the Pay Grades table and verify the updated row content.

**Expected Results:**
  - The pay grade record updates successfully.
  - The changed values are reflected in the table.
  - The user is returned to the list view and the page remains stable.

#### 1.5. Delete an existing pay grade with confirmation

**File:** `specs/pay-grades-plan.md`

**Steps:**
  1. Open the Pay Grades page.
  2. Choose a pay grade that can be safely removed.
  3. Click the Delete action for that record.
  4. Confirm the delete prompt if a confirmation dialog appears.
  5. Wait for the table to refresh.
  6. Search for the deleted pay grade name.

**Expected Results:**
  - The pay grade is deleted successfully.
  - The user receives confirmation that the record was removed.
  - The deleted record no longer appears in the table after the list refreshes.

#### 1.6. Table actions and data integrity remain consistent

**File:** `specs/pay-grades-plan.md`

**Steps:**
  1. Open the Pay Grades page with the seeded records visible.
  2. Verify each row includes the expected action buttons for edit and delete.
  3. Create or modify a pay grade to ensure the table updates without duplicating rows.
  4. Check that the records count reflects the visible rows after add/edit/delete actions.
  5. Refresh the page and confirm the table content remains consistent.

**Expected Results:**
  - All visible rows maintain the expected action controls.
  - The table updates correctly after CRUD operations without duplication or stale data.
  - The records count matches the rendered pay grade rows after refresh.
