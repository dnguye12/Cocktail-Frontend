import { Link } from "react-router-dom"

import HomeLeft from "../../public/left_home.png"
import HomeCenter from "../../public/center_home.png"
import HomeRight from "../../public/right_home.png"
import Navbar from "../navbar/Navbar"

const Home = () => {
    return (
        <>
            <Navbar />
            <div className="2xl:grid hidden 2xl:grid-cols-3 gap-4 px-8 py-4 bg-neutral-950" style={{ height: "calc(100vh - 64px" }}>
                <Link className="home-card home-card-center shadow-md rounded"
                    to='/search'
                    style={{
                        backgroundImage: `url(${HomeLeft})`,
                    }}
                >
                    <h1 className="absolute top-16 text-6xl text-my-pink font-boba font-semibold drop-shadow text-center">Search For<br />Cocktails</h1>

                </Link>

                <Link
                    to='/random-cocktails'
                    className="home-card home-card-center shadow-md rounded"
                    style={{
                        backgroundImage: `url(${HomeCenter})`,
                    }}
                >
                    <h1 className="absolute bottom-72 text-6xl text-my-orange font-boba font-semibold drop-shadow">Random Cocktail</h1>
                </Link>

                <Link to="/all-cocktails" className="home-card home-card-center shadow-md rounded"
                    style={{
                        backgroundImage: `url(${HomeRight})`,
                    }}
                >
                    <h1 className="absolute top-16 text-6xl text-my-dark-blue font-boba font-semibold drop-shadow text-center">All The<br />Cocktails</h1>
                </Link>
            </div>



            <div className="grid grid-cols-1 grid-rows-3 2xl:hidden gap-4 px-8 py-4 bg-neutral-950" style={{ height: "calc(100vh - 64px" }}>
                <Link
                    to='/search'
                    className="home-card home-card-center shadow-md rounded flex justify-center items-center"
                    style={{
                        background: "linear-gradient(90deg, rgba(3,25,59,1) 40%, rgba(88,101,242,1) 100%)"
                    }}
                >
                    <h1 className="text-4xl sm:text-6xl text-my-pink font-boba font-semibold drop-shadow text-center">Search For<br />Cocktails</h1>
                </Link>

                <Link
                    to='/random-cocktails'
                    className="home-card home-card-center shadow-md rounded flex justify-center items-center bg-red-900"
                    style={{
                        background: "linear-gradient(90deg, rgba(244,164,96,1) 40%, rgba(255,239,193,1) 100%)"
                    }}
                >
                    <h1
                        className="text-4xl sm:text-6xl text-my-orange font-boba font-semibold drop-shadow text-center"
                    >Random Cocktail</h1>
                </Link>

                <Link to="/all-cocktails" className="home-card home-card-center shadow-md rounded flex justify-center items-center bg-pink-700"
                    style={{
                        background: "linear-gradient(90deg, rgba(174,63,77,1) 40%, rgba(255,167,173,1) 100%)"
                    }}
                >
                    <h1 className="text-4xl sm:text-6xl text-my-dark-blue font-boba font-semibold drop-shadow text-center">All The<br />Cocktails</h1>
                </Link>
            </div>
        </>
    )
}

export default Home