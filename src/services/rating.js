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

export const deleteRating = async (id) => {
    let query = baseUrl + `/rating?id=${id}`

    try {
        const request = await axios.delete(query)
        return request.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export const updateRating = async (id, newContent, newRating) => {
    let query = baseUrl + `/rating?id=${id}`

    try {
        const request = await axios.patch(query, {
            newContent,
            newRating
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

export const getRatingByUser = async (userId) => {
    let query = baseUrl + `/rating/by-user?userId=${userId}`

    try {
        const request = await axios.get(query)
        return request.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getUserHasRatedCocktail = async (userId, cocktailId) => {
    let query = baseUrl + `/rating/user-has-rated-cocktail?userId=${userId}&cocktailId=${cocktailId}`

    try {
        const request = await axios.get(query)
        return request.data
    } catch (error) {
        console.log(error)
        return null
    }
}