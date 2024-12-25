import axios from 'axios'
import { setupCache } from 'axios-cache-interceptor';

const baseUrl = import.meta.env.VITE_API_URL

const dailyAxios = setupCache(axios.create(), {
    ttl: 3600000, // 1 hour cache for daily data
});

export const getUser = async (id) => {
    let query = baseUrl + `/user?id=${id}`

    try {
        const request = await dailyAxios.get(query)
        return request.data
    } catch (error) {
        return (error)
    }
}

export const postUser = async (id, name, imageUrl, email) => {
    let query = baseUrl + '/user'

    try {
        const request = await axios.post(query, {
            id, name, imageUrl, email
        })
        return request.data
    } catch (error) {
        console.log(error)
        return null
    }
}