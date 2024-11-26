const RandomCocktailsSkeleton = () => {
    return (
        <div className="container max-w-7xl mx-auto grid grid-cols-2 gap-6 my-8" style={{
            minHeight: "calc(100vh - 128px)"
        }}>
            <div className="skeleton"></div>
            <div className="skeleton"></div>
        </div>
    )
}

export default RandomCocktailsSkeleton