import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Navbar from "../navbar/Navbar"
import { getCocktailRandom } from "../../services/cocktail"
import RandomCocktailsSkeleton from "./components/RandomCocktailsSkeleton"

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
    const [cocktail, setCocktail] = useState(null)
    const [showIngredients, setShowIngredients] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    const [checkedIngredients, setCheckedIngredients] = useState({})
    const [checkedInstructions, setCheckedInstructions] = useState({})

    const handleGetRandomCocktail = async () => {
        setIsLoading(true)
        try {
            const cock = await getRandomCocktail();
            if (cock) {
                setCocktail(cock);
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

    return (
        <div className="bg-neutral-950">
            <Navbar />

            {
                isLoading && (
                    <RandomCocktailsSkeleton />
                )
            }

            {
                !isLoading && cocktail &&
                (
                    <div className="container max-w-5xl mx-auto grid grid-cols-2 gap-8 my-8" style={{
                        minHeight: "calc(100vh - 128px)"
                    }}>
                        <div className="my-card p-8 flex flex-col items-start">
                            <img src={cocktail.strDrinkThumb} className="border border-neutral-700 rounded drop-shadow w-80 z-10 mx-auto" alt="" />

                            <div className="w-80 mx-auto mt-8">
                                <h2 className="text-xl text-accent tooltip tooltip-accent font-medium" data-tip="Drink category">
                                    <FontAwesomeIcon className="mr-2" icon="fa-solid fa-tag" />{cocktail.category}
                                </h2>
                                {
                                    cocktail.isAlcoholic
                                        ?
                                        (
                                            <p className="block text-start my-2 text-xl text-accent font-medium tooltip tooltip-accent" data-tip="This drink IS alcoholic"><FontAwesomeIcon className="mr-2" icon="fa-solid fa-wine-bottle" />Alcoholic</p>
                                        )
                                        :
                                        (
                                            <p className="block text-start my-2 text-xl text-accent font-medium tooltip tooltip-accent" data-tip="This drink IS NOT alcoholic"><FontAwesomeIcon className="mr-2" icon="fa-solid fa-bottle-water" />Non Alcoholic</p>
                                        )
                                }
                                {
                                    cocktail.glass && (
                                        <p className="text-xl text-accent font-medium tooltip tooltip-accent block text-start" data-tip="Recommended serving glass"><FontAwesomeIcon className="mr-2" icon="fa-solid fa-martini-glass" />{cocktail.glass}</p>
                                    )
                                }
                            </div>
                        </div>


                        <div className="my-card py-8 flex flex-col items-center justify-between">
                            <div className="w-full">
                                <h1 className="text-accent font-poppins text-5xl font-semibold drop-shadow text-center mb-6">{cocktail.name}</h1>
                                <div className="w-full mb-6">
                                    <div className="flex justify-center items-center">
                                        <button onClick={() => { setShowIngredients(true) }} className={`btn ${showIngredients ? "btn-accent" : "btn-ghost"} rounded-none transition duration-300 flex-1`}>Ingredients</button>
                                        <button onClick={() => { setShowIngredients(false) }} className={`btn ${showIngredients ? "btn-ghost" : "btn-accent"} rounded-none transition duration-300 flex-1`}>Instructions</button>
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
                                                                        <td><input type="checkbox" className="checkbox" checked={checkedInstructions[idx] || false} onChange={() => handleInstructionsCheck(idx)}/></td>

                                                                        <td><span>{idx}.</span> {ins}.</td>

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
                            <div className="w-full px-8">
                                {
                                    showIngredients
                                    ?
                                    (
                                        <button className="btn btn-outline w-full border-neutral-700 hover:scale-[1.01] shadow">Start mixing</button>
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

            <button className="btn" onClick={handleGetRandomCocktail}>Button</button>

            {
                cocktail && <p>{cocktail.name}</p>
            }
        </div>
    )
}

export default RandomCocktails