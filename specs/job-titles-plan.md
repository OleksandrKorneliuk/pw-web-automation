# OrangeHRM Job Titles Test Plan

## Application Overview

Test plan for the OrangeHRM job titles administration page, covering page load, filtering, creation, validation, edit, deletion, and access restrictions.

## Test Scenarios

### 1. job-title-management

**Seed:** `tests/seed.spec.ts`

#### 1.1. Load job titles page and verify default content

**File:** `specs/job-titles-plan.md`

**Steps:**

1. Open the page https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewJobTitleList
2. Wait for the page to load and verify the job titles table is visible
3. Check that the page header/title is displayed and the table contains expected columns (Job Title, Job Description, Job Specification, Added By, Actions)
4. Verify the Add button is visible and enabled

**Expected Results:**

- The page loads successfully without errors
- The job titles list is visible and table headers are present
- The Add button is available for creating a new job title

#### 1.2. Create a new job title with valid data

**File:** `specs/job-titles-plan.md`

**Steps:**

1. Open the job titles page
2. Click the Add button
3. Fill in a unique job title name and description
4. Optionally add a valid job specification file or leave it blank if the field is optional
5. Save the new job title
6. Confirm the new record appears in the job titles list

**Expected Results:**

- A new job title is created successfully
- The saved record appears in the table with correct values
- The page remains stable after save

#### 1.3. Attempt to create a new job title with invalid or missing required data

**File:** `specs/job-titles-plan.md`

**Steps:**

1. Open the job titles page
2. Click the Add button
3. Leave required fields empty and attempt to save
4. Check validation messages for missing title name or invalid inputs
5. Try saving with an invalid specification format if applicable

**Expected Results:**

- The form does not submit successfully
- Validation errors are visible and understandable
- The user stays on the form and can correct the issue

#### 1.4. Edit an existing job title

**File:** `specs/job-titles-plan.md`

**Steps:**

1. Open the job titles page
2. Find an existing job title in the list
3. Click the Edit action for that record
4. Modify the job title name or description
5. Save the changes
6. Verify the updated values are visible in the list

**Expected Results:**

- The record updates successfully
- The modified values are shown in the list
- The user is returned to the list view

#### 1.5. Delete an existing job title

**File:** `specs/job-titles-plan.md`

**Steps:**

1. Open the job titles page
2. Select a job title that can be safely deleted
3. Click the Delete action for the record
4. Confirm the deletion in the confirmation dialog if shown
5. Verify the job title is removed from the list

**Expected Results:**

- The record is deleted successfully
- The deletion is confirmed in the UI
- The removed title is no longer shown in the table

#### 1.6. Pagination and row actions behavior

**File:** `specs/job-titles-plan.md`

**Steps:**

1. Open the job titles page with enough records to exceed a single page
2. Observe pagination controls if present
3. Navigate to the next page and verify rows update
4. Return to a previous page and verify the list is consistent
5. Check that row action buttons remain available on each page

**Expected Results:**

- Pagination works correctly and rows update between pages
- Actions remain functional on each page
- No duplicate or missing records occur when navigating

#### 1.7. Access restrictions and permissions

**File:** `specs/job-titles-plan.md`

**Steps:**

1. Open the page as a user without admin/job-title permissions
2. Attempt to load the page and review available controls
3. Check whether unauthorized users are redirected, blocked, or see reduced controls

**Expected Results:**

- The app enforces access rules consistently
- Unauthorized users cannot complete privileged actions like Add/Edit/Delete
- The user sees a clear permission-related response if access is denied
