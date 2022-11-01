import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Frontpage from "./components/Frontpage";
import CategoryPage from "./components/CategoryPage";
import SingleReviewPage from "./components/SingleReviewPage";
import ActiveUserContext from "./contexts/ActiveUser";

function App() {
  const user = {
    username: "tickle122",
    name: "Tom Tickle",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
  };
  const [activeUser, setActiveUser] = useState(user);

  return (
    <BrowserRouter>
      <div className="App">
        <ActiveUserContext.Provider value={{ activeUser, setActiveUser }}>
          <Header />
          <Navbar />
          <Routes>
            <Route path="/" element={<Frontpage />}></Route>
            <Route
              path="/categories/:category"
              element={<CategoryPage />}
            ></Route>
            <Route
              path="/reviews/:review_id"
              element={<SingleReviewPage />}
            ></Route>
          </Routes>
        </ActiveUserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
