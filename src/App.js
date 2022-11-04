import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Frontpage from "./components/Frontpage";
import CategoryPage from "./components/CategoryPage";
import SingleReviewPage from "./components/SingleReviewPage";
import ActiveUserContext from "./contexts/ActiveUser";
import SortingContext from "./contexts/Sorting";
import ErrorComponent from "./components/ErrorComponent";

function App() {
  console.log("rerendering");

  const user = {
    username: "test user",
    name: "Test User",
    avatar_url: "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
  };
  const [activeUser, setActiveUser] = useState(user);

  // const sortingDefault = ["created_at", true];
  const [sorting, setSorting] = useState(null);

  return (
    <BrowserRouter>
      <div className="App">
        <ActiveUserContext.Provider value={{ activeUser, setActiveUser }}>
          <Header />

          <SortingContext.Provider value={{ sorting, setSorting }}>
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
              <Route
                path="/*"
                element={
                  <ErrorComponent error={{ message: "404: Route Not Found" }} />
                }
              ></Route>
            </Routes>
          </SortingContext.Provider>
        </ActiveUserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
