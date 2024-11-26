/* eslint-disable react/prop-types */
const CocktailCard = ({cocktail}) => {
    return (
        <div>
            {
                cocktail.strDrinkThumb && (
                    <img src={cocktail.strDrinkThumb}/>
                )
            }
        </div>
    )
}

export default CocktailCard