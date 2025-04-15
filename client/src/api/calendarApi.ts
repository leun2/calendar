import { apiClient } from "api/apiClient"


export const getEventsByUnitWithDate = 
    (unit : String, year : number, month : number, day : number) => 
        apiClient.get(`/v1/calendar/${unit}/${year}/${month}/${day}`)    