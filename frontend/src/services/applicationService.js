import {apiService} from "./apiService";
import {urls} from "../constants/urls";

const applicationService = {
    getAll:(page,limit)=> {
        return apiService.get(urls.application,{
            params:{
                page:page,
                limit:limit


            }
        })
    },
    create(data) {
        return apiService.post(urls.application, data);
    }
}
export {applicationService}