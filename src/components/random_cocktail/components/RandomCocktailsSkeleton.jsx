const RandomCocktailsSkeleton = () => {
    return (
        <div className="my-container grid grid-cols-2 gap-6 pb-8" style={{
            minHeight: "calc(100vh - 192px)"
        }}>
            <div className="skeleton rounded-xl shadow-md"></div>
            <div className="skeleton rounded-xl shadow-md"></div>
        </div>
    )
}

export default RandomCocktailsSkeleton