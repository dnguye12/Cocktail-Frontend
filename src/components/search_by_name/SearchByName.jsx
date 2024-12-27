import { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { searchCocktailsByName } from "../../services/cocktail";
import { useNavigate, useParams } from "react-router-dom";

const SearchByName = () => {
    const navigate = useNavigate()
    const searchName = useParams().searchName

    const [name, setName] = useState('')
    const [cocktails, setCocktails] = useState(null)

    useEffect(() => {
        if (searchName && !cocktails) {
            const fetchSearch = async () => {
                try {
                    const request = await searchCocktailsByName(searchName)
                    if (request) {
                        setCocktails(request)
                    }
                } catch (error) {
                    console.log(error)
                    setCocktails([])
                }
            }

            fetchSearch()
        }
    }, [cocktails, searchName])

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleNameSubmit = async (e) => {
        e.preventDefault()
        try {
            const request = await searchCocktailsByName(name)
            if (request) {
                setCocktails(request)
            }
        } catch (error) {
            console.log(error)
        }
        navigate(`/search/${name}`)
        setName('')
    }

    return (
        <div className="bg-neutral-950 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow px-6 py-8">
                <div className="my-container">
                    <h2 className=" text-3xl font-semibold shadow mb-6 lg:mb-4">Search for a drink</h2>
                    <form className="flex mt-4" onSubmit={(e) => { handleNameSubmit(e) }}>
                        <input type="text" value={name} onChange={handleNameChange} placeholder="Type cocktail name here" className="input w-full rounded-r-none bg-neutral-950 border border-r-0 border-neutral-700 shadow-md" />
                        <button type="submit" className={`btn btn-accent ${name === "" && "btn-disabled"} rounded-l-none shadow-md`}><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />Search</button>
                    </form>
                </div>
                {
                    cocktails?.length > 0 &&
                    (
                        <div className="my-container mt-8">
                            <h2 className=" text-3xl font-semibold shadow mb-6 lg:mb-4">Search result</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
                                {
                                    cocktails.map((cocktail) => (
                                        <a target="_blank" href={`/random-cocktails/${cocktail.id}`} key={`pop-${cocktail.id}`} className="group p-6 lg:p-4 my-card transition duration-300 hover:scale-105 hover:bg-neutral cursor-pointer tooltip tooltip-accent" data-tip={`See this cocktail`}>
                                            <img src={cocktail.strDrinkThumb} className="rounded-md drop-shadow border border-neutral" />
                                            <p className="font-semibold text-xl lg:text-lg mt-3 lg:mt-2 pointer-events-none text-center group-hover:text-my-orange">{cocktail.name}</p>
                                            <div className="mt-3 lg:mt-2 flex items-center justify-center">
                                                {
                                                    cocktail.ratings.length > 0
                                                        ?
                                                        (
                                                            <>
                                                                {[1, 2, 3, 4, 5].map((value) => {
                                                                    const star = (cocktail.ratings.reduce((acc, cock) => acc + cock.stars, 0)) / cocktail.ratings.length
                                                                    if (star >= value) {
                                                                        return <FontAwesomeIcon key={`star-${value}`} icon="fa-solid fa-star" className="text-xl text-orange-400" />
                                                                    } else if (star > value - 1 && star < value) {
                                                                        return <FontAwesomeIcon key={`star-${value}`} icon="fa-solid fa-star-half" className="text-xl text-orange-400" />
                                                                    } else {
                                                                        return <FontAwesomeIcon key={`star-${value}`} icon="fa-solid fa-star" className="text-xl text-orange-400 opacity-20" />
                                                                    }
                                                                })
                                                                }
                                                                <span className="text-neutral-content text-sm ms-1">({cocktail.ratings.length})</span>
                                                            </>
                                                        )
                                                        :
                                                        (
                                                            <span className="text-neutral-content text-sm ms-1 italic">No user rating yet</span>
                                                        )
                                                }

                                            </div>
                                        </a>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </main >
            <Footer />

        </div >
    );
}

export default SearchByName;