import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, fab, far);

import { Route, Routes } from "react-router-dom"
import Home from "./components/home/Home"
import RandomCocktails from "./components/random_cocktail/RandomCocktails"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/random-cocktails" element={<RandomCocktails />} />
    </Routes>
  )
}

export default App
