/* eslint-disable react/prop-types */
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, fab, far);

import { Route, Routes } from "react-router-dom"
import { useUser } from "@clerk/clerk-react";

import Home from "./components/home/Home"
import RandomCocktails from "./components/random_cocktail/RandomCocktails"
import SearchByName from "./components/search_by_name/SearchByName";
import SignInPage from "./components/sign-in/SignInPage";
import SignUpPage from "./components/sign-up/SignUpPage";
import { useEffect } from "react";
import { getUser, postUser } from "./services/user";
import AllCocktails from "./components/all_cocktails/AllCocktails";

const CheckUser = ({ children }) => {
  const { user, isLoaded } = useUser()

  useEffect(() => {
    if (user) {
      const helper = async () => {
        try {
          const request = await getUser(user.id)
          if (request?.status === 404) {
            const helperImage = user.hasImage ? user.imageUrl : ""
            const helperEmail = user.emailAddresses.length > 0 ? user.emailAddresses[0].emailAddress : ""
            await postUser(user.id, user.fullName, helperImage, helperEmail)
          }
        } catch (error) {
          console.log(error)
        }
      }
      helper()
    }
  }, [user])

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return children;
}

function App() {
  return (
    <CheckUser>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />
        <Route path="/random-cocktails" element={<RandomCocktails />} />
        <Route path="/random-cocktails/:cocktail/*" element={<RandomCocktails />} />
        <Route path="/search" element={<SearchByName />} />
        <Route path="/all-cocktails" element={<AllCocktails/>} />
      </Routes>
    </CheckUser>
  )
}

export default App
