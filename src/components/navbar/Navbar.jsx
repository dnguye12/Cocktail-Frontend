import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
    const { isSignedIn, user, isLoaded } = useUser()
    return (
        <div className="sticky top-0 left-0 h-16 border-b border-b-neutral-700 bg-black shadow z-50">
            <div className="navbar my-container">
                <div className="navbar-start">
                    <h1 className="hidden sm:block text-xl font-semibold font-poppins ms-4">Cocktail Random</h1>
                    <h1 className="block sm:hidden text-xl font-semibold font-poppins ms-4">CR</h1>
                </div>
                <div className="navbar-end">
                    <Link className="btn btn-ghost mr-2 h-9 max-h-9 min-h-9 px-3 rounded" to="/"><FontAwesomeIcon icon="fa-solid fa-house" /> Back To Home</Link>

                    {
                        isSignedIn && user
                            ?
                            (
                                <UserButton appearance={{
                                    elements: {
                                        avatarBox: "h-9 w-9 shadow-md"
                                    }
                                }} />
                            )
                            :
                            (
                                <SignInButton>
                                    <div className="w-9 h-9 max-h-9 min-h-9 btn btn-ghost shadow-md border border-neutral-700 rounded-full">
                                        <FontAwesomeIcon className=" text-lg" icon="fa-solid fa-user" />
                                    </div>
                                </SignInButton>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar