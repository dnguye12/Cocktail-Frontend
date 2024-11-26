import { Link } from "react-router-dom"

import HomeLeft from "../../public/left_home.png"
import HomeCenter from "../../public/center_home.png"
import HomeRight from "../../public/right_home.png"

const Home = () => {
    return (
        <div className="grid grid-cols-3 gap-6 p-8 h-screen max-h-screen bg-neutral-950">
            <Link className="home-card"
                style={{
                    backgroundImage: `url(${HomeLeft})`,
                }}
            >
                <h1 className="absolute top-16 text-6xl text-my-pink font-boba font-semibold drop-shadow text-center">Search Cocktails <br/> By Name</h1>

            </Link>

            <Link 
                to='/random-cocktails'
                className="home-card home-card-center"
                style={{
                    backgroundImage: `url(${HomeCenter})`,
                }}
            >
                <h1 className="absolute bottom-72 text-6xl text-my-orange font-boba font-semibold drop-shadow">Random Cocktail</h1>
            </Link>

            <Link className="home-card"
                style={{
                    backgroundImage: `url(${HomeRight})`,
                }}
            >
                <h1 className="absolute top-16 text-6xl text-my-dark-blue font-boba font-semibold drop-shadow text-center">Search Cocktails <br/> By Ingredients</h1>

            </Link>
        </div>
    )
}

export default Home