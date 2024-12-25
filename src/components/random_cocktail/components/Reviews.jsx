/* eslint-disable react/prop-types */
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import EmojiPicker from "./EmojiPicker";
import { getRatingByCocktail, postRating } from "../../../services/rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Reviews = ({ cocktail }) => {
    const { isLoaded, user } = useUser()

    const [isLoading, setIsLoading] = useState(false)
    const [content, setContent] = useState('')
    const [rating, setRating] = useState(0)

    const [comments, setComments] = useState([])
    const [fetchedComments, setFetchedComments] = useState(false)

    useEffect(() => {
        if (!fetchedComments) {
            const fetchComments = async () => {
                try {
                    const request = await getRatingByCocktail(cocktail.id)
                    setComments(request.ratings)
                    setFetchedComments(true)
                } catch (error) {
                    console.log(error)
                    setFetchedComments(true)
                }
            }

            fetchComments()
        }
    }, [cocktail, fetchedComments])

    const handleChange = (e) => {
        setContent(e.target.value)
    }

    const handleRatingChange = (value) => {
        if (rating === value) {
            setRating(0)
        } else {
            setRating(value);
        }
    };

    const handleEmoji = (e) => {
        setContent((prev) => `${prev}${e}`)
    }

    const handleSubmit = async (e) => {
        if (content !== "") {
            e.preventDefault()
            try {
                setIsLoading(true)
                const request = await postRating(user.id, cocktail.id, rating, content)

                setIsLoading(false)
                setContent("")
                setRating(0)
                setComments([...comments, request])
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleCancel = async (e) => {
        e.preventDefault()
        setContent("")
        setRating(0)
    }

    if (!isLoaded) {
        return <div className="skeleton my-container pb-8 h-32"></div>
    }

    console.log(comments)
    return (

        <div className="container max-w-5xl mx-auto pb-8">
            <h2 className=" text-3xl font-semibold shadow">Reviews</h2>
            <div className="my-card p-4 my-4">
                <p className="text-neutral-content">Your review for {cocktail.name}</p>
                {
                    user
                    &&
                    (
                        <form className="flex flex-col" onSubmit={(e) => { handleSubmit(e) }}>
                            <div className="text-neutral-content">
                                <div className="p-4 flex">
                                    <img className="w-10 h-10 rounded-full drop-shadow-md border border-neutral-700" src={user.imageUrl} />
                                    <div className="flex-grow px-3">
                                        <p className="text-lg text-white font-semibold">{user.username || user.fullName || user.emailAddresses[0].emailAddress}</p>
                                        <p className="text-sm">Your review will be posted publicly.</p>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="rating rating-lg">
                                        {[1, 2, 3, 4, 5].map((value) => (
                                            <input
                                                key={value}
                                                type="radio"
                                                name="rating"
                                                checked={rating === value}
                                                onClick={() => handleRatingChange(value)}
                                                className={`mask mask-star-2 ${rating >= value ? "bg-orange-400" : `bg-orange-400 ${rating === 0 && 'opacity-20'}`
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="relative my-6">
                                    <input type="text" value={content} onChange={handleChange} placeholder={`Write your review here`} className="input w-full p-6 bg-neutral-950 border border-neutral-700 text-white" />
                                    <div className="absolute bottom-3 right-6">
                                        <EmojiPicker handleEmoji={handleEmoji} />
                                    </div>
                                </div>
                                <div className="w-full flex justify-end">
                                    <button onClick={(e) => { handleCancel(e) }} type="button" className="btn mr-2">Cancel</button>
                                    <button type="submit" className={`btn btn-accent ${(content === "" || rating === 0) && "btn-disabled"}`}>
                                        Post
                                    </button>
                                </div>

                            </div>
                        </form>
                    )
                }
            </div>
            <div className="grid grid-cols-2 gap-4">
                {
                    fetchedComments && comments.length > 0
                    &&
                    (
                        comments.map((c) => (
                            <div key={c.id} className="my-card p-6">
                                <div className="w-full flex">
                                    <img className="w-10 h-10 rounded-full drop-shadow-md border border-neutral-700" src={c.user.imageUrl} />
                                    <div className="flex-grow px-3">
                                        <p className="text-lg text-white font-semibold">{c.user.name || c.user.email}</p>
                                        <div className="rating rating-sm">
                                            {[1, 2, 3, 4, 5].map((value) => (
                                                <FontAwesomeIcon key={c.id + value} className={`${c.stars >= value ? "text-orange-400" : "text-orange-400 opacity-20"}`} icon="fa-solid fa-star" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-neutral-content">{c.comment}</p>
                            </div>
                        ))

                    )
                }
            </div>
        </div>
    );
}

export default Reviews;