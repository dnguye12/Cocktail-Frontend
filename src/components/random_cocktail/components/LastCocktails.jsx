/* eslint-disable react/prop-types */
const LastCocktails = ({ lastCocktails }) => {
    const helper = [
        ...lastCocktails,
        ...Array(Math.max(0, 4 - lastCocktails.length)).fill({
            name: "helper name",
        }),
    ];

    return (
        <div className="my-container pb-8">
            <h2 className=" text-4xl font-semibold shadow mb-3">Last generated cocktails</h2>
            <div className="grid grid-cols-4 gap-4">
                {
                    helper.map((cocktail) => {
                        return cocktail.name === "helper name"
                            ?
                            (
                                <div></div>
                            )
                            :
                            (
                                <div className="group p-4 my-card transition duration-300 hover:scale-105 hover:bg-neutral cursor-pointer">
                                    <img src={cocktail.strDrinkThumb} className="rounded-md drop-shadow border border-neutral"/>
                                    <p className="font-semibold text-lg mt-3 pointer-events-none text-center group-hover:text-my-orange">{cocktail.name}</p>
                                    
                                </div>
                            )
                    })
                }
            </div>
        </div>
    )
}

export default LastCocktails