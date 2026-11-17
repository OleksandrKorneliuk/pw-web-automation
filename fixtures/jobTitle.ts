import { test as base } from "./PageManager";
import { JobTitle } from "../models/jobTitle";
import { createApiContext } from "../helpers/apiContext.helper";
import { JobTitlesService } from "../api/services/jobTitlesService";
import { createRandomJobTitle } from "../tests/factorys/jobTitleFactory";

export const test = base.extend<{ jobTitle: JobTitle; }>({
    jobTitle: async ({ }, use) => {
        const apiContext = await createApiContext();

        const jobTitleService = new JobTitlesService(apiContext);
        const randomJobTitle = await createRandomJobTitle();
        const jobTitle = await jobTitleService.createJobTitleAndExpect(randomJobTitle);

        await use(jobTitle);

        await jobTitleService.deleteJobTitleAndExpect(jobTitle.id);
    }
});