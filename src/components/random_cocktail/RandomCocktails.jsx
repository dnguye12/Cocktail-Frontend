import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { getCocktailByID, getCocktailRandom } from "../../services/cocktail"

import Navbar from "../navbar/Navbar"
import RandomCocktailsSkeleton from "./components/RandomCocktailsSkeleton"
import LastCocktails from "./components/LastCocktails"
import Footer from "../footer/Footer"
import Reviews from "./components/Reviews"

const getRandomCocktail = async () => {
    try {
        const cocktail = await getCocktailRandom()
        return cocktail
    } catch (error) {
        console.log(error)
        return null
    }
}

const RandomCocktails = () => {
    const navigate = useNavigate()
    const cocktailId = useParams().cocktail

    const [cocktail, setCocktail] = useState(null)
    const [lastCocktails, setLastCocktails] = useState([])
    const [showIngredients, setShowIngredients] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const [checkedIngredients, setCheckedIngredients] = useState({})
    const [checkedInstructions, setCheckedInstructions] = useState({})

    useEffect(() => {
        if (cocktailId && !cocktail) {
            const fetchCocktail = async () => {
                try {
                    const cock = await getCocktailByID(cocktailId)
                    if (cock) {
                        setCocktail(cock)
                        setIsLoading(false)
                        setShowIngredients(true)
                        setCheckedIngredients({})
                        setCheckedInstructions({})
                    }
                } catch (error) {
                    console.log(error)
                }
            }

            fetchCocktail()
        }
    }, [cocktail, cocktailId])

    const handleGetRandomCocktail = async () => {
        setIsLoading(true)
        try {
            if (cocktail) {
                const updatedLastCocktails = [cocktail, ...lastCocktails]
                if (updatedLastCocktails.length > 4) {
                    updatedLastCocktails.pop()
                }
                setLastCocktails(updatedLastCocktails)
            }
            setIsLoading(true)
            const cock = await getRandomCocktail();
            if (cock) {
                setCocktail(cock);
                setShowIngredients(true)
                setCheckedIngredients({})
                setCheckedInstructions({})
                navigate(`/random-cocktails/${cock.id}`)
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    const handleIngredientsCheck = (i) => {
        setCheckedIngredients((prev) => ({
            ...prev,
            [i]: !prev[i]
        }))
    }

    const handleInstructionsCheck = (i) => {
        setCheckedInstructions((prev) => ({
            ...prev,
            [i]: !prev[i]
        }))
    }

    const handleClickOnLastCocktails = (cock) => {
        setLastCocktails((prev) => {
            const updatedLastCocktails = prev.filter((c) => c !== cock)
            return [cocktail, ...updatedLastCocktails]
        })
        setCocktail(cock)
        navigate(`/random-cocktails/${cock.id}`)
    }

    return (
        <div className="bg-neutral-950 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow px-6">
                <div className="my-container my-8 flex justify-center items-center">
                    <button className="btn btn-accent w-full sm:px-16 h-16 text-xl font-semibold shadow hover:scale-105 tooltip" data-tip="Click to generate another cocktail" onClick={handleGetRandomCocktail}>Generate a random cocktail</button>
                </div>

                {
                    isLoading && (
                        <RandomCocktailsSkeleton />
                    )
                }

                {
                    !isLoading && cocktail &&
                    (
                        <div className="my-container grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8" >
                            <div className="my-card p-8 flex flex-col items-start">
                                <img src={cocktail.strDrinkThumb} className="border border-neutral-700 rounded drop-shadow w-80 z-10 mx-auto" alt="" />

                                <div className="w-80 mx-auto mt-6 z-50 flex flex-col items-start">
                                    {
                                        cocktail.IBA
                                        && (
                                            <h3 className="text-start my-1 text-lg text-accent font-medium tooltip tooltip-accent" data-tip="International Bartenders Association category"><FontAwesomeIcon className="mr-2" icon="fa-solid fa-medal" />{cocktail.IBA}</h3>
                                        )
                                    }
                                    <h2 className="text-lg text-accent tooltip tooltip-accent font-medium" data-tip="Drink category">
                                        <FontAwesomeIcon className="mr-2" icon="fa-solid fa-tag" />{cocktail.category}
                                    </h2>
                                    {
                                        cocktail.isAlcoholic
                                            ?
                                            (
                                                <h3 className="text-start my-1 text-lg text-accent font-medium tooltip tooltip-accent" data-tip="This drink IS alcoholic"><FontAwesomeIcon className="mr-2" icon="fa-solid fa-wine-bottle" />Alcoholic</h3>
                                            )
                                            :
                                            (
                                                <h3 className="text-start my-1 text-lg text-accent font-medium tooltip tooltip-accent" data-tip="This drink IS NOT alcoholic"><FontAwesomeIcon className="mr-2" icon="fa-solid fa-bottle-water" />Non Alcoholic</h3>
                                            )
                                    }
                                    {
                                        cocktail.glass && (
                                            <h3 className="text-lg text-accent font-medium tooltip tooltip-accent block text-start" data-tip="Recommended serving glass"><FontAwesomeIcon className="mr-2" icon="fa-solid fa-martini-glass" />{cocktail.glass}</h3>
                                        )
                                    }
                                </div>
                            </div>


                            <div className="my-card py-8 flex flex-col items-center justify-between">
                                <div className="w-full">
                                    <h1 className="text-accent font-poppins text-5xl font-semibold drop-shadow text-center mb-6">{cocktail.name}</h1>
                                    <div className="w-full mb-6">
                                        <div className="flex justify-center items-center">
                                            <button onClick={() => { setShowIngredients(true) }} className={`btn ${showIngredients ? "btn-accent" : "btn-ghost"} rounded-none transition duration-300 flex-1 tooltip`} data-tip="Click to show the list of ingredients to make this cocktail">Ingredients</button>
                                            <button onClick={() => { setShowIngredients(false) }} className={`btn ${showIngredients ? "btn-ghost" : "btn-accent"} rounded-none transition duration-300 flex-1 tooltip`} data-tip="Click to show the instruction to mix this cocktail.">Instructions</button>
                                        </div>
                                    </div>
                                    {
                                        showIngredients
                                            ?
                                            (
                                                <div className="w-full form-control px-8 overflow-x-auto">
                                                    <table className="table">
                                                        <tbody>
                                                            {cocktail.ingredients.map((ingredient, idx) => {
                                                                return (
                                                                    <tr key={idx} className="hover">
                                                                        <td><input type="checkbox" className="checkbox" checked={checkedIngredients[idx] || false} onChange={() => handleIngredientsCheck(idx)} /></td>
                                                                        <td>{ingredient.ingredient}</td>
                                                                        <td>{ingredient.measure}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )
                                            :
                                            (
                                                <div className="w-full form-control px-8 overflow-x-auto">
                                                    <table className="table">
                                                        <tbody>
                                                            {cocktail.strInstructions.split('.').map((ins, idx) => {
                                                                if (ins !== "") {
                                                                    return (
                                                                        <tr key={idx} className="hover">
                                                                            <td><input type="checkbox" className="checkbox" checked={checkedInstructions[idx] || false} onChange={() => handleInstructionsCheck(idx)} /></td>

                                                                            <td><span>{idx + 1}.</span> {ins}.</td>

                                                                        </tr>
                                                                    )
                                                                }
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )
                                    }
                                </div>
                                <div className="w-full px-8 mt-6">
                                    {
                                        showIngredients
                                            ?
                                            (
                                                <button onClick={() => { setShowIngredients(false) }} className="btn btn-outline w-full border-neutral-700 hover:scale-[1.01] hover:bg-accent shadow">Start mixing</button>
                                            )
                                            :
                                            (
                                                <button className="btn btn-outline btn-accent hover:scale-[1.01] w-full shadow">Finish</button>
                                            )
                                    }
                                </div>
                            </div>

                        </div>
                    )
                }
                {
                    lastCocktails?.length > 0 &&
                    (
                        <LastCocktails lastCocktails={lastCocktails} handleClickOnLastCocktails={handleClickOnLastCocktails} />
                    )
                }
                {
                    cocktail && <Reviews cocktail={cocktail} />
                }
            </main>
            <Footer />
        </div>
    )
}

export default RandomCocktails