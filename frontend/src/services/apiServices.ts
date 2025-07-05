import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { baseURL } from "../constants/urls";
import { authServices } from "./authServices";
import { router } from "../router";

let isRefreshing = false;
type IWaitList = () => void;
const waitList: IWaitList[] = [];

const apiServices = axios.create({ baseURL });

// Додаємо access токен до кожного запиту
apiServices.interceptors.request.use(
    (req) => {
        const token = authServices.getAccessToken();
        if (token) {
            req.headers.Authorization = `Bearer ${token}`;
        }
        return req;
    },
    (error) => Promise.reject(error)
);

// Перехоплюємо 401 помилки
apiServices.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && originalRequest) {
            // Якщо вже пробували — просто logout
            if (originalRequest._retry) {
                authServices.deleteToken();
                await router.navigate('/applications?SessionExpired=true');
                return Promise.reject(error);
            }

            // Якщо ще ні — спробувати оновити токен
            if (!isRefreshing) {
                isRefreshing = true;
                originalRequest._retry = true;

                try {
                    const refresh = authServices.getRefreshToken();
                    if (!refresh) throw new Error("No refresh token");

                    // 🔥 Робимо запит на оновлення токена
                    const { data } = await axios.post(`${baseURL}/all_users/auth/refresh`, { refresh });

                    const newAccess = data.access;

                    // Зберігаємо новий токен
                    authServices.setToken({ access: newAccess, refresh });

                    // Повторити всі запити, які чекали
                    runAfterRefresh();

                    // Прописати новий токен в заголовок і повторити поточний запит
                    originalRequest.headers = {
                        ...originalRequest.headers,
                        Authorization: `Bearer ${newAccess}`,
                    };

                    return apiServices(originalRequest);
                } catch (e) {
                    authServices.deleteToken();
                    await router.navigate('/applications?SessionExpired=true');
                    return Promise.reject(e);
                } finally {
                    isRefreshing = false;
                }

            } else {
                // Якщо refresh уже триває — додаємо запит у чергу
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
