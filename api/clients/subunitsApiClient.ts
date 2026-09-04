import { APIRequestContext } from "@playwright/test";
import { BaseApiClient } from "./baseApiClient";
import { Subunit } from "../../models/subunit";

export class SubunitsApiClient extends BaseApiClient {

    private static SUBUNITS_ENDPOINT = '/admin/subunits';

    constructor(apiContext: APIRequestContext) {
        super(apiContext);
    }

    async postSubunit(subunit: Subunit) {
        return await this.post(SubunitsApiClient.SUBUNITS_ENDPOINT,
            SubunitsApiClient.buildSubunitPayload(subunit)
        );
    }

    async deleteSubunit(id: string) {
        return await this.delete(SubunitsApiClient.SUBUNITS_ENDPOINT + `/${id}`);
    }

    private static buildSubunitPayload(subunit: Subunit) {
        return {
            unitId: subunit.unitId,
            name: subunit.name,
            description: subunit.description,
            parentId: subunit.parentId
        }
    }
}