import axios from 'axios'
import { setupCache } from 'axios-cache-interceptor';

const baseUrl = import.meta.env.VITE_API_URL

const dailyAxios = setupCache(axios.create(), {
    ttl: 3600000, // 1 hour cache for daily data
});

export const getRating = async (id) => {
    let query = baseUrl + `/rating?id=${id}`

    try {
        const request = await dailyAxios.get(query)
        return request.data
    } catch (error) {
        return (error)
    }
}

export const postRating = async (user, cocktail, stars, comment) => {
    let query = baseUrl + '/rating'

    try {
        const request = await axios.post(query, {
            user, cocktail, stars, comment
        })
        return request.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getRatingByCocktail = async (cocktailId) => {
    let query = baseUrl + `/rating/by-cocktail?cocktailId=${cocktailId}`

    try {
        const request = await axios.get(query)
        return request.data
    } catch (error) {
        console.log(error)
        return null
    }
}