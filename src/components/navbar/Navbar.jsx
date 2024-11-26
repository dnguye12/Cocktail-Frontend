const Navbar = () => {
    return (
        <div className="sticky top-0 left-0 h-16 border-b border-b-neutral-700 bg-black shadow z-50">
            <div className="container navbar max-w-5xl mx-auto">
                <div className="navbar-start">
                    <h1 className="hidden sm:block text-xl font-semibold font-poppins">Cocktail Random</h1>
                    <h1 className="block sm:hidden text-xl font-semibold font-poppins ">CR</h1>
                </div>
                <div className="navbar-end">Things</div>
            </div>
        </div>
    )
}

export default Navbar