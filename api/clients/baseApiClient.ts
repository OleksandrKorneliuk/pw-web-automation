import { APIRequestContext } from "@playwright/test";
import { API_BASE_URL } from "../../playwright.config";

export abstract class BaseApiClient {
    protected apiContext: APIRequestContext;
    protected baseUrl: string;

    constructor(apiContext: APIRequestContext, baseUrl: string = API_BASE_URL) {
        this.apiContext = apiContext;
        this.baseUrl = baseUrl;
    }

    protected async get(endpoint: string, options?: any) {
        return await this.apiContext.get(`${this.baseUrl}${endpoint}`, options);
    }

    protected async post(endpoint: string, data?: any, options?: any) {
        return await this.apiContext.post(`${this.baseUrl}${endpoint}`, {
            data,
            ...options
        });
    }

    protected async delete(endpoint: string, data?: any, options?: any) {
        return await this.apiContext.delete(`${this.baseUrl}${endpoint}`, {
            data,
            ...options
        });
    }

    protected async put(endpoint: string, data?: any, options?: any) {
        return await this.apiContext.put(`${this.baseUrl}${endpoint}`, {
            data,
            ...options
        });
    }
}