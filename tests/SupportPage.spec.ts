import { expect } from '@playwright/test'
import { test } from '../fixtures/PageManager'
import { UserDropdownMenuItem } from '../enums/userDropdownMenuItem'

test('navigate to support page', async ({ page, supportPage }) => {
    await supportPage.goto()

    await expect(page).toHaveURL(
        new RegExp(UserDropdownMenuItem.SUPPORT.toLowerCase())
    )
    await expect(supportPage.title).toBeVisible()
})