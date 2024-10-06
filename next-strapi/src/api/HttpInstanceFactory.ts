import axios, {AxiosInstance} from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN || '';

export class HttpInstanceFactory {
    private static httpInstance: AxiosInstance;

    public static getInstance() {
        if (!this.httpInstance) {
            this.httpInstance = axios.create({
                baseURL: BACKEND_URL,
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`, 
                }
            })
        }

        return this.httpInstance;
    }
}   