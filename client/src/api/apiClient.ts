import axios from "axios"

export const apiClient = axios.create (
    {
        // baseURL: 'http://localhost:8080'
        // baseURL: 'http://calendar-env.eba-kp9ipc3q.ap-northeast-2.elasticbeanstalk.com'
        baseURL: 'https://api.calendar.io.kr'
    }
)

export const ping = () => 
        apiClient.get(`/v1/ping`)