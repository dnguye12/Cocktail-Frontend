/* eslint-disable react/prop-types */
const LastCocktails = ({ lastCocktails, handleClickOnLastCocktails }) => {
    const helper = [
        ...lastCocktails,
        ...Array(Math.max(0, 4 - lastCocktails.length)).fill({
            name: "helper name",
        }),
    ];

    return (
        <div className="my-container pb-8">
            <h2 className=" text-4xl font-semibold shadow mb-6 lg:mb-4">Last generated cocktails</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
                {
                    helper.map((cocktail) => {
                        return cocktail.name === "helper name"
                            ?
                            (
                                <div></div>
                            )
                            :
                            (
                                <div onClick={() => {handleClickOnLastCocktails(cocktail)}} className="group p-6 lg:p-4 my-card transition duration-300 hover:scale-105 hover:bg-neutral cursor-pointer tooltip tooltip-accent" data-tip="See this cocktail again">
                                    <img src={cocktail.strDrinkThumb} className="rounded-md drop-shadow border border-neutral"/>
                                    <p className="font-semibold text-xl lg:text-lg mt-4 lg:mt-3 pointer-events-none text-center group-hover:text-my-orange">{cocktail.name}</p>
                                    
                                </div>
                            )
                    })
                }
            </div>
        </div>
    )
}

export default LastCocktails