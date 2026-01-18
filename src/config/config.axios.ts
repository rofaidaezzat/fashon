import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://fz-designer.vercel.app/",
    headers: {
        "ngrok-skip-browser-warning": "69420",
    },
});
