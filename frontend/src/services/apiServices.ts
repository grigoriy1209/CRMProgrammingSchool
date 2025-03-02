import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { baseURL } from "../constants/urls";
import { authServices } from "./authServices";
import { router } from "../router";

let isRefreshing = false;
type IWaitList = () => void;
const waitList: IWaitList[] = [];

const apiServices = axios.create({ baseURL });

apiServices.interceptors.request.use(
    (req) => {
        const token = localStorage.getItem("access");
        if (token) {
            req.headers.Authorization = `Bearer ${token}`;
        }
        return req;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiServices.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && originalRequest) {
            if (originalRequest._retry) {
                authServices.deleteToken();
                await router.navigate('/applications?SessionExpired=true');
                return Promise.reject(error);
            }

            if (!isRefreshing) {
                isRefreshing = true;
                originalRequest._retry = true;

                try {
                    await authServices.getRefreshToken();
                    runAfterRefresh();
                } catch (e) {
                    authServices.deleteToken();
                    await router.navigate('/applications?SessionExpired=true');
                    return Promise.reject(e);
                } finally {
                    isRefreshing = false;
                }

                return apiServices(originalRequest);
            } else {
                return new Promise((resolve) => {
                    waitList.push(() => resolve(apiServices(originalRequest)));
                });
            }
        }
        return Promise.reject(error);
    }
);

const runAfterRefresh = (): void => {
    while (waitList.length) {
        const cb = waitList.pop();
        if (cb) cb();
    }
};

export { apiServices };
