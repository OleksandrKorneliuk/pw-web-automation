import { JobTitle } from '../../models/jobTitle';

export async function createRandomJobTitle() {
    const jobTitle: JobTitle = {
        title: `Automation QA Engineer ${Date.now()}`,
        description: `Created via Playwright automation ${Date.now()}`
    };

    return jobTitle;
}