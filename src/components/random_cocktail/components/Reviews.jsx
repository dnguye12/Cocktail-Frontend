/* eslint-disable react/prop-types */
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import EmojiPicker from "./EmojiPicker";
import { deleteRating, getRatingByCocktail, getUserHasRatedCocktail, postRating, updateRating } from "../../../services/rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from 'moment';

const Reviews = ({ cocktail }) => {
    const { isLoaded, user } = useUser()

    const [isLoading, setIsLoading] = useState(false)
    const [content, setContent] = useState('')
    const [rating, setRating] = useState(0)

    const [myComment, setMyComment] = useState(null)
    const [fetchedMyComment, setFetchedMyComment] = useState(false)
    const [comments, setComments] = useState([])
    const [fetchedComments, setFetchedComments] = useState(false)

    const [isEditing, setIsEditing] = useState(false)
    const [editContent, setEditContent] = useState('')
    const [editRating, setEditRating] = useState(0)

    useEffect(() => {
        if (!fetchedMyComment) {
            const fetchMyComment = async () => {
                try {
                    const request = await getUserHasRatedCocktail(user.id, cocktail.id)
                    setMyComment(request)
                    setFetchedMyComment(true)
                    setEditContent(request.comment)
                    setEditRating(request.stars)
                } catch (error) {
                    console.log(error)
                    setFetchedMyComment(true)
                }
            }

            fetchMyComment()
        }
    }, [user, cocktail, fetchedMyComment])

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
                setMyComment(request)
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

    const handleDelete = async () => {
        try {
            setIsLoading(true)
            const request = await deleteRating(myComment.id)
            console.log(request)
            if (request) {
                setComments((prev) => (prev.filter((c) => c.id !== myComment.id)))
                setMyComment(null)
            }
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        console.log(editContent)
        console.log(editRating)
        console.log(myComment)
        try {
            setIsLoading(true)
            const request = await updateRating(myComment.id, editContent, editRating)
            setIsLoading(false)

            setEditContent(request.comment)
            setEditRating(request.stars)
            setComments((prev) => (prev.map((c) => c.id !== request.id ? c : request)))
            setMyComment(request)
        } catch (error) {
            console.log(error)
        }
        setIsEditing(false)
    }

    const handleChangeEdit = (e) => {
        setEditContent(e.target.value)
    }

    const handleRatingChangeEdit = (value) => {
        if (editRating === value) {
            setEditRating(myComment.stars)
        } else {
            setEditRating(value);
        }
    };

    const handleCancelEdit = async (e) => {
        e.preventDefault()
        setEditContent(myComment.comment)
        setEditRating(myComment.stars)
        setIsEditing(false)
    }

    const handleEmojiEdit = (e) => {
        setEditContent((prev) => `${prev}${e}`)
    }

    if (!isLoaded) {
        return <div className="skeleton my-container pb-8 h-32"></div>
    }

    return (
        <div className="container max-w-5xl mx-auto pb-8">
            <h2 className=" text-3xl font-semibold shadow">Reviews</h2>
            <div className="my-card p-4 my-4">
                <p className="text-neutral-content">Your review for {cocktail.name}</p>
                {
                    user && fetchedMyComment
                    &&
                    (
                        !myComment
                            ?
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
                                                        readOnly
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="relative my-6">
                                            <input disabled={isLoading} type="text" value={content} onChange={handleChange} placeholder={`Write your review here`} className="input w-full p-6 bg-neutral-950 border border-neutral-700 text-white" />
                                            <div className="absolute bottom-3 right-6">
                                                <EmojiPicker handleEmoji={handleEmoji} />
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-end">
                                            <button onClick={(e) => { handleCancel(e) }} type="button" className="btn mr-2">Cancel</button>
                                            <button disabled={isLoading} type="submit" className={`btn btn-accent ${(content === "" || rating === 0) && "btn-disabled"}`}>
                                                Post
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )
                            :
                            isEditing
                                ?
                                (
                                    <form className="flex flex-col" onSubmit={(e) => { handleEdit(e) }}>
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
                                                            name="edit-rating"
                                                            checked={editRating === value}
                                                            onClick={() => handleRatingChangeEdit(value)}
                                                            className={`mask mask-star-2 ${editRating >= value ? "bg-orange-400" : `bg-orange-400 ${editRating === 0 && 'opacity-20'}`
                                                                }`}
                                                            readOnly
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="relative my-6">
                                                <input disabled={isLoading} type="text" value={editContent} onChange={handleChangeEdit} placeholder={`Write your review here`} className="input w-full p-6 bg-neutral-950 border border-neutral-700 text-white" />
                                                <div className="absolute bottom-3 right-6">
                                                    <EmojiPicker handleEmoji={handleEmojiEdit} />
                                                </div>
                                            </div>
                                            <div className="w-full flex justify-end">
                                                <button onClick={(e) => { handleCancelEdit(e) }} type="button" className="btn mr-2">Cancel</button>
                                                <button disabled={isLoading} type="submit" className={`btn btn-accent ${(myComment.comment === editContent && myComment.stars === editRating) && "btn-disabled"}`}>
                                                    Post
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                )
                                :
                                (
                                    <div className="flex flex-col">
                                        <div className="text-neutral-content">
                                            <div className="p-4 flex">
                                                <img className="w-10 h-10 rounded-full drop-shadow-md border border-neutral-700" src={user.imageUrl} />
                                                <div className="flex-grow px-3">
                                                    <p className="text-lg text-white font-semibold">{user.username || user.fullName || user.emailAddresses[0].emailAddress}</p>
                                                    <p className="text-sm">{myComment.updatedAt ? moment(myComment.updatedAt).format('hh:mm, D MMM YYYY') : myComment.createAt ? moment(myComment.createAt).format('hh:mm, D MMM YYYY') : ""}</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-center">
                                                <div className="rating rating-lg">
                                                    {[1, 2, 3, 4, 5].map((value) => (
                                                        <FontAwesomeIcon key={myComment.id + value} className={` text-4xl ${myComment.stars >= value ? "text-orange-400" : "text-orange-400 opacity-20"}`} icon="fa-solid fa-star" />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="relative m-6 p-6 rounded-md shadow-md">
                                                <p>{myComment.comment}</p>
                                            </div>
                                            <div className="w-full flex justify-end">
                                                <button onClick={handleDelete} className="btn btn-error mr-2"><FontAwesomeIcon icon="fa-solid fa-trash-can" /> Delete</button>
                                                <button onClick={() => setIsEditing(!isEditing)} className="btn"><FontAwesomeIcon icon="fa-solid fa-pen" />Edit review</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                    )
                }
            </div>

            {
                fetchedComments && comments.length > 0
                    ?
                    (
                        <div className="grid grid-cols-2 gap-4">
                            {
                                comments.map((c) => {
                                    if (c.id !== myComment?.id) {
                                        return (
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
                                        )
                                    }
                                })}
                        </div>
                    )
                    :
                    (
                        <p className="text-center text-neutral-content p-4">No reviews to display, be the first to leave your comment.</p>
                    )
            }

        </div>
    );
}

export default Reviews;