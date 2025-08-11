import axios, { type AxiosResponse } from "axios";
import { toast } from 'react-toastify'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    }
});


axiosInstance.interceptors.response.use(
    (response : AxiosResponse) => {
        const data = response?.data;

        console.log("data" , data);

        if (data?.message && typeof data.message === 'string') {
            toast.success(data.message);
        }
        else if (data?.status && typeof data?.status === 'string') {
            toast.success(data.status + `- Status code : ${data.code}`)
        }
        return response;
    },
    (error) => {
        const data = error.response.data;

        if (data?.message && typeof data?.message === 'string') {
            toast.error(data.message);
        } else if (data?.status && typeof data?.status === 'string') {
            toast.error(data.status + ` - Status code: ${data.code}`);
        }

        return Promise.reject(data);
    }
);

axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (userId) {
        config.headers['user_id'] = userId.toString();
    }
    console.log('userId',userId);
    return config;
}, (error) => {
    return Promise.reject(error);
})


export default axiosInstance;