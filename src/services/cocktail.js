import axios from 'axios'
import { setupCache } from 'axios-cache-interceptor';

const baseUrl = import.meta.env.VITE_API_URL

const dailyAxios = setupCache(axios.create(), {
    ttl: 3600000, // 1 hour cache for daily data
});

export const getCocktailByName = async (name) => {
    let query = baseUrl + `name?name=${name}`

    try {
        const request = await dailyAxios.get(query)
        return request.data
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const getCocktailByID = async(id) => {
    let query = baseUrl + `id?id=${id}`

    try {
        const request = await dailyAxios.get(query)
        return request.data
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const getCocktailRandom = async() => {
    let query = baseUrl + 'random'

    try {
        const request = await dailyAxios.get(query)
        return request.data
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const getCocktailByIngredient = async(ing) => {
    let query = baseUrl + `/ingredient?name=${ing}`

    try {
        const request = await dailyAxios.get(query)
        return request.data
    }catch (error) {
        console.log(error)
        throw new Error(error)
    }
}