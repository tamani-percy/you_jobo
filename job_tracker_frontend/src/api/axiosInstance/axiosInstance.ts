import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_JOB_TRACKER_BACKEND,
    headers: {
        'Content-Type': 'application/json'
    },
})
export default axiosInstance
