import {urls} from "../constants/urls";
import {apiService} from "./apiService";

const authService = {
    async login(user) {
        const {data:{access}} = await apiService.post(urls.auth.login, user);
        localStorage.setItem('access', access);
    }
}
export {
    authService
}