import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://lavishly-fogless-sang.ngrok-free.dev",
    headers: {
        "ngrok-skip-browser-warning": "69420",
    },
});
