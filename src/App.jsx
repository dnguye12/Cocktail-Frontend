import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, fab, far);

import { Route, Routes } from "react-router-dom"
import Home from "./components/home/Home"
import RandomCocktails from "./components/random_cocktail/RandomCocktails"
import SearchByName from "./components/search_by_name/SearchByName";
import SignInPage from "./components/sign-in/SignInPage";
import SignUpPage from "./components/sign-up/SignUpPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in/*" element={<SignInPage />} />
      <Route path="/sign-up/*" element={<SignUpPage />} />
      <Route path="/random-cocktails" element={<RandomCocktails />} />
      <Route path="/random-cocktails/:cocktail/*" element={<RandomCocktails />} />
      <Route path="/search-by-name" element={<SearchByName />} />
    </Routes>
  )
}

export default App
