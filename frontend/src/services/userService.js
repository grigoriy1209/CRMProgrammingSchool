import {apiService} from "./apiService";
import {urls} from "../constants/urls";

const userService = {
    getAll:()=> apiService.get(urls.users.base),
    create:(data)=> apiService.post(urls.users.base, data),
    getById:(id)=> apiService.get(urls.users.byId(id)),
}
export {
    userService
}