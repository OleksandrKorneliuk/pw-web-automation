import { request } from '@playwright/test';

export function createApiContext() {
    return request.newContext({ storageState: 'playwright/.auth/user.json' });
}