import { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import { getHighestRatedCocktails, getLowestRatedCocktails, getMostPopularCocktails } from "../../services/cocktail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "@clerk/clerk-react";
import { getRatingByUser } from "../../services/rating";
import moment from "moment";

const AllCocktails = () => {
    const { user } = useUser()

    const [popular, setPopular] = useState(null)
    const [lowest, setLowest] = useState(null)
    const [highest, setHighest] = useState(null)
    const [myRatings, setMyRatings] = useState(null)

    useEffect(() => {
        if (!popular) {
            const getPopular = async () => {
                try {
                    const request = await getMostPopularCocktails()

                    setPopular(request)
                } catch (error) {
                    console.log(error)
                    setPopular([])
                }
            }
            getPopular()
        }
    }, [popular])

    useEffect(() => {
        if (!lowest) {
            const getLowest = async () => {
                try {
                    const request = await getLowestRatedCocktails()

                    setLowest(request)
                } catch (error) {
                    console.log(error)
                    setLowest([])
                }
            }
            getLowest()
        }
    }, [lowest])

    useEffect(() => {
        if (!highest) {
            const getHighest = async () => {
                try {
                    const request = await getHighestRatedCocktails()

                    setHighest(request)
                } catch (error) {
                    console.log(error)
                    setHighest([])
                }
            }
            getHighest()
        }
    }, [highest])

    useEffect(() => {
        if (!myRatings) {
            const getMyRatings = async () => {
                try {
                    const request = await getRatingByUser(user.id)

                    setMyRatings(request)
                } catch (error) {
                    console.log(error)
                    setMyRatings([])
                }
            }
            getMyRatings()
        }
    }, [myRatings, user])

    return (
        <div className="bg-neutral-950 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow px-6 py-8">
                {
                    popular?.length > 0 &&
                    (
                        <div className="my-container mb-8">
                            <h2 className=" text-3xl font-semibold shadow">Most popular cocktails</h2>
                            <p className="text-neutral-content mb-6 lg:mb-4">Drinks everyone loves and enjoys the most.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
                                {
                                    popular.map((cocktail) => (
                                        <a target="_blank" href={`/random-cocktails/${cocktail.id}`} key={`pop-${cocktail.id}`} className="group p-6 lg:p-4 my-card transition duration-300 hover:scale-105 hover:bg-neutral cursor-pointer tooltip tooltip-accent" data-tip={`See this cocktail`}>
                                            <img src={cocktail.strDrinkThumb} className="rounded-md drop-shadow border border-neutral" />
                                            <p className="font-semibold text-xl lg:text-lg mt-4 lg:mt-3 pointer-events-none text-center group-hover:text-my-orange">{cocktail.name}</p>
                                            <div className="mt-4 lg:mt-3 flex items-center justify-center">
                                                {[1, 2, 3, 4, 5].map((value) => {
                                                    const star = (cocktail.ratings.reduce((acc, cock) => acc + cock.stars, 0)) / cocktail.ratings.length
                                                    if (star >= value) {
                                                        return <FontAwesomeIcon key={`star-${value}`} icon="fa-solid fa-star" className="text-xl text-orange-400" />
                                                    } else if (star > value - 1 && star < value) {
                                                        return <FontAwesomeIcon key={`star-${value}`} icon="fa-solid fa-star-half" className="text-xl text-orange-400" />
                                                    } else {
                                                        return <FontAwesomeIcon key={`star-${value}`} icon="fa-solid fa-star" className="text-xl text-orange-400 opacity-20" />
                                                    }
                                                }
                                                )}
                                                <span className="text-neutral-content text-sm ms-1">({cocktail.ratings.length})</span>
                                            </div>
                                        </a>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }

                {
                    highest?.length > 0 &&
                    (
                        <div className="my-container mb-8">
                            <h2 className=" text-3xl font-semibold shadow">Highest rated cocktails</h2>
                            <p className="text-neutral-content mb-6 lg:mb-4">Top-quality drinks with the best reviews.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
                                {
                                    highest.map((cocktail) => (
                                        <a target="_blank" href={`/random-cocktails/${cocktail._id}`} key={`high-${cocktail._id}`} className="group p-6 lg:p-4 my-card transition duration-300 hover:scale-105 hover:bg-neutral cursor-pointer tooltip tooltip-accent" data-tip={`See this cocktail`}>
                                            <img src={cocktail.strDrinkThumb} className="rounded-md drop-shadow border border-neutral" />
                                            <p className="font-semibold text-xl lg:text-lg mt-4 lg:mt-3 pointer-events-none text-center group-hover:text-my-orange">{cocktail.name}</p>
                                            <div className="mt-4 lg:mt-3 flex items-center justify-center">
                                                {[1, 2, 3, 4, 5].map((value) => {
                                                    const star = (cocktail.ratings.reduce((acc, cock) => acc + cock.stars, 0)) / cocktail.ratings.length
                                                    if (star >= value) {
                                                        return <FontAwesomeIcon key={`star-${value}`} icon="fa-solid fa-star" className="text-xl text-orange-400" />
                                                    } else if (star > value - 1 && star < value) {
                                                        return <FontAwesomeIcon key={`star-${value}`} icon="fa-solid fa-star-half" className="text-xl text-orange-400" />
                                                    } else {
                                                        return <FontAwesomeIcon key={`star-${value}`} icon="fa-solid fa-star" className="text-xl text-orange-400 opacity-20" />
                                                    }
                                                }
                                                )}
                                                <span className="text-neutral-content text-sm ms-1">({cocktail.ratings.length})</span>
                                            </div>
                                        </a>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }

                {
                    lowest?.length > 0 &&
                    (
                        <div className="my-container mb-8">
                            <h2 className=" text-3xl font-semibold shadow">Lowest rated cocktails</h2>
                            <p className="text-neutral-content mb-6 lg:mb-4">Unusual drinks that might not be for everyone, but you might like them.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
                                {
                                    lowest.map((cocktail) => (
                                        <a target="_blank" href={`/random-cocktails/${cocktail._id}`} key={`high-${cocktail._id}`} className="group p-6 lg:p-4 my-card transition duration-300 hover:scale-105 hover:bg-neutral cursor-pointer tooltip tooltip-accent" data-tip={`See this cocktail`}>
                                            <img src={cocktail.strDrinkThumb} className="rounded-md drop-shadow border border-neutral" />
                                            <p className="font-semibold text-xl lg:text-lg mt-4 lg:mt-3 pointer-events-none text-center group-hover:text-my-orange">{cocktail.name}</p>
                                            <div className="mt-4 lg:mt-3 flex items-center justify-center">
                                                {[1, 2, 3, 4, 5].map((value) => {
                                                    const star = (cocktail.ratings.reduce((acc, cock) => acc + cock.stars, 0)) / cocktail.ratings.length
                                                    if (star >= value) {
                                                        return <FontAwesomeIcon key={`star-${value}`} icon="fa-solid fa-star" className="text-xl text-orange-400" />
                                                    } else if (star > value - 1 && star < value) {
                                                        return <FontAwesomeIcon key={`star-${value}`} icon="fa-solid fa-star-half" className="text-xl text-orange-400" />
                                                    } else {
                                                        return <FontAwesomeIcon key={`star-${value}`} icon="fa-solid fa-star" className="text-xl text-orange-400 opacity-20" />
                                                    }
                                                }
                                                )}
                                                <span className="text-neutral-content text-sm ms-1">({cocktail.ratings.length})</span>
                                            </div>
                                        </a>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }

                {
                    myRatings?.length > 0 &&
                    (
                        <div className="my-container mb-8">
                            <h2 className=" text-3xl font-semibold shadow">Cocktails you have reviewed</h2>
                            <p className="text-neutral-content mb-6 lg:mb-4">Your opinions matter.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
                                {
                                    myRatings.map((rating) => (
                                        <a target="_blank" href={`/random-cocktails/${rating.cocktail.id}`} key={`rating-${rating.cocktail.id}`} className="group p-6 lg:p-4 my-card transition duration-300 hover:scale-105 hover:bg-neutral cursor-pointer tooltip tooltip-accent" data-tip={`See this cocktail`}>
                                            <img src={rating.cocktail.strDrinkThumb} className="rounded-md drop-shadow border border-neutral" />
                                            <p className="font-semibold text-xl lg:text-lg mt-4 lg:mt-3 pointer-events-none text-center group-hover:text-my-orange">{rating.cocktail.name}</p>
                                            <div className="my-3 lg:my-2 flex items-center justify-center">
                                                {[1, 2, 3, 4, 5].map((value) => {
                                                    const star = rating.stars
                                                    if (star >= value) {
                                                        return <FontAwesomeIcon key={`star-${value}`} icon="fa-solid fa-star" className="text-xl text-orange-400" />
                                                    } else if (star > value - 1 && star < value) {
                                                        return <FontAwesomeIcon key={`star-${value}`} icon="fa-solid fa-star-half" className="text-xl text-orange-400" />
                                                    } else {
                                                        return <FontAwesomeIcon key={`star-${value}`} icon="fa-solid fa-star" className="text-xl text-orange-400 opacity-20" />
                                                    }
                                                })}
                                            </div>
                                            <p className="text-neutral-content text-sm">{rating.comment}</p>
                                            <p className="mt-2 text-sm italic text-neutral-content opacity-50">{ moment(rating.updatedAt).format('D MMM YYYY')}</p>
                                        </a>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </main>
            <Footer />
        </div>
    );
}

export default AllCocktails;