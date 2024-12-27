import axios from 'axios'
import { setupCache } from 'axios-cache-interceptor';

const baseUrl = import.meta.env.VITE_API_URL

const dailyAxios = setupCache(axios.create(), {
    ttl: 3600000, // 1 hour cache for daily data
});

export const getCocktailByName = async (name) => {
    let query = baseUrl + `/cocktail/name?name=${name}`

    try {
        const request = await dailyAxios.get(query)
        return request.data
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const getCocktailByID = async(id) => {
    let query = baseUrl + `/cocktail/id?id=${id}`

    try {
        const request = await dailyAxios.get(query)
        return request.data
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const getCocktailRandom = async() => {
    let query = baseUrl + '/cocktail/random'

    try {
        const request = await axios.get(query)
        return request.data
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const getCocktailByIngredient = async(ing) => {
    let query = baseUrl + `/cocktail/ingredient?name=${ing}`

    try {
        const request = await dailyAxios.get(query)
        return request.data
    }catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const getMostPopularCocktails = async() => {
    let query = baseUrl + '/cocktail/popular'

    try {
        const request = await dailyAxios.get(query)
        return request.data
    }catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const getLowestRatedCocktails = async() => {
    let query = baseUrl + '/cocktail/lowest-rated'

    try {
        const request = await dailyAxios.get(query)
        return request.data
    }catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const getHighestRatedCocktails = async() => {
    let query = baseUrl + '/cocktail/highest-rated'

    try {
        const request = await dailyAxios.get(query)
        return request.data
    }catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const searchCocktailsByName = async(name) => {
    let query = baseUrl + `/cocktail/search-name?name=${name}`

    try {
        const request = await dailyAxios.get(query)
        return request.data
    }catch (error) {
        console.log(error)
        throw new Error(error)
    }
}