import { apiClient } from "api/apiClient"

interface EventRequestDto {
    title: string;
    description: string;
    location: string;
    startTime: string;
    endTime: string;
    color: string;
}

export const createEventApi =
    ( values : EventRequestDto ) =>
        apiClient.post(
            `/v1/event`, 
            values, 
            { headers: { "Content-Type": "application/json" } }
        );

export const deleteEventApi =
    (event_id : number) => 
        apiClient.delete(`/v1/event/${event_id}`)