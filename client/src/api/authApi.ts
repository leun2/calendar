import { apiClient } from "api/apiClient"

export const signUp = (email: string, password: string, name: string, provider: string) =>
    apiClient.post('/v1/user', {
        email,
        password,
        name,
        provider
    });

export const signIn = (email: string, password: string) => 
    apiClient.post('/v1/auth/login' , {
        email,
        password
    })
