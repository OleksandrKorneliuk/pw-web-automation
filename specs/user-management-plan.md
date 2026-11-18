# User Management Test Plan

## Application Overview

Test plan for the OrangeHRM Admin > User Management page (System Users). Covers page load, search/filtering, user creation, edit, deletion, and validation workflows for a logged-in admin user on a fresh environment.

## Test Scenarios

### 1. Admin User Management

**Seed:** `tests/seed.spec.ts`

#### 1.1. Page loads and renders User Management controls

**File:** `tests/admin/user-management-page.spec.ts`

**Steps:**
  1. Open the OrangeHRM admin user management page at /web/index.php/admin/viewSystemUsers.
  2. Verify the page header reads 'System Users'.
  3. Check that the page contains the Add User button, username search field, employee name filter, role dropdown, status dropdown, and Search button.
  4. Verify the table/list of users is visible or empty-state text is displayed depending on seeded data.

**Expected Results:**
  - The page loads successfully without errors.
  - All primary controls are visible and enabled.
  - The System Users grid/table is rendered in a usable state.

#### 1.2. Search by username returns matching user

**File:** `tests/admin/user-management-page.spec.ts`

**Steps:**
  1. Navigate to User Management.
  2. Use a known valid username from the seeded demo data or newly created admin user.
  3. Enter the username into the Username field.
  4. Click Search.
  5. Wait for the results table to refresh.

**Expected Results:**
  - The result row for the matching username is visible.
  - No unrelated users are shown in the filtered result set.
  - The search does not fail or produce a broken page state.

#### 1.3. Search by employee name uses autocomplete and filter correctly

**File:** `tests/admin/user-management-page.spec.ts`

**Steps:**
  1. Navigate to User Management.
  2. Locate the Employee Name field and type a valid employee name such as a seeded employee full name.
  3. Wait for the type-ahead suggestion to appear.
  4. Select the matching suggestion from the dropdown.
  5. Click Search.
  6. Review the filtered results.

**Expected Results:**
  - The employee name suggestion appears and can be selected reliably.
  - The table displays users associated with that employee.
  - The filter result matches the selected employee name and no invalid record is displayed.

#### 1.4. Add a new system user succeeds with valid data

**File:** `tests/admin/user-management-page.spec.ts`

**Steps:**
  1. Navigate to User Management.
  2. Click Add.
  3. Fill in required fields: User Role, Employee Name, Username, Status, Password, Confirm Password.
  4. Use a unique username and a valid employee name from the system.
  5. Submit the form.
  6. Wait for the success confirmation message or redirect back to System Users list.

**Expected Results:**
  - The new user is created successfully.
  - A success message is displayed or the page confirms the save.
  - The new user appears in the User Management table when searched by username.

#### 1.5. Edit an existing user and change status

**File:** `tests/admin/user-management-page.spec.ts`

**Steps:**
  1. Create or identify an existing user record.
  2. Open the user edit form for that user.
  3. Change the user status from Enabled to Disabled (or vice versa).
  4. Save the changes.
  5. Return to the User Management list and search for the updated user.

**Expected Results:**
  - The status update is saved successfully.
  - The user detail reflects the new status in the edit form and grid/list view.
  - The data remains stable after refresh or re-navigation to the page.

#### 1.6. Delete an existing user is confirmed and removed from the list

**File:** `tests/admin/user-management-page.spec.ts`

**Steps:**
  1. Create or identify a user that can be safely deleted.
  2. Open User Management and search for the username.
  3. Click the delete action for that user.
  4. Confirm the delete prompt.
  5. Refresh or re-run the search for the same username.

**Expected Results:**
  - A confirmation success message is shown after deletion.
  - The deleted user no longer appears in the results table.
  - The page remains responsive and no stale errors remain.

#### 1.7. Validation and empty-result handling work correctly

**File:** `tests/admin/user-management-page.spec.ts`

**Steps:**
  1. Attempt a search with a username that does not exist.
  2. Attempt a search with an employee name that does not exist.
  3. Leave required Add User fields blank and click Save.
  4. Try to add a user with mismatched passwords or invalid employee details.

**Expected Results:**
  - No-result or empty-state messaging appears when the filter matches no records.
  - Validation errors are displayed for required/mismatched fields.
  - The form prevents invalid submissions and retains user input for correction.
