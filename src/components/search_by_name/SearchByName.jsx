import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

const SearchByName = () => {
    return (
        <div className="bg-neutral-950 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow px-6">
                <div className="my-container my-8 flex justify-center items-center">
                    <div></div>
                    <div></div>
                </div>
            </main>
            <Footer />

        </div>
    );
}

export default SearchByName;