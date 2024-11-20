const Navbar = () => {
    return (
        <div className="navbar sticky top-0 left-0 h-16 border-b border-b-my-border shadow">
            <div className="container mx-auto flex justify-between max-w-4xl px-6">
                <div>
                    <h1 className="hidden sm:block text-xl font-semibold font-boba text-my-orange">Cocktail Random</h1>
                    <h1 className="block sm:hidden text-xl font-semibold font-boba text-my-orange">CR</h1>
                </div>
                <div>Things</div>
            </div>

        </div>
    )
}

export default Navbar