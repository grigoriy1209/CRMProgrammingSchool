import { apiService } from "./apiService";
import { urls } from "../constants/urls";

const applicationService = {
    getAll: (page, searchParams) => {
        return apiService.get(urls.application.base, {
            params: {
                page: page,
                ...Object.fromEntries(searchParams.entries()),
            }
        });
    },
    getById: (id) => apiService.get(urls.application.byId(id)),
    create(data) {
        return apiService.post(urls.application.base, data);
    }
};

export { applicationService };
