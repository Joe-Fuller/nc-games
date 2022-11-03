import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Frontpage from "./components/Frontpage";
import CategoryPage from "./components/CategoryPage";
import SingleReviewPage from "./components/SingleReviewPage";
import ActiveUserContext from "./contexts/ActiveUser";
import ErrorComponent from "./components/ErrorComponent";

function App() {
  const user = {
    username: "test user",
    name: "Test User",
    avatar_url: "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
  };
  const [activeUser, setActiveUser] = useState(user);
  const [sorting, setSorting] = useState(null);
  const [needsSortDropdown, setNeedsSortDropdown] = useState(true);

  return (
    <BrowserRouter>
      <div className="App">
        <ActiveUserContext.Provider value={{ activeUser, setActiveUser }}>
          <Header />
          <Navbar
            setSorting={setSorting}
            needsSortDropdown={needsSortDropdown}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Frontpage
                  sorting={sorting}
                  setNeedsSortDropdown={setNeedsSortDropdown}
                />
              }
            ></Route>
            <Route
              path="/categories/:category"
              element={
                <CategoryPage
                  sorting={sorting}
                  setNeedsSortDropdown={setNeedsSortDropdown}
                />
              }
            ></Route>
            <Route
              path="/reviews/:review_id"
              element={
                <SingleReviewPage setNeedsSortDropdown={setNeedsSortDropdown} />
              }
            ></Route>
            <Route
              path="/*"
              element={
                <ErrorComponent error={{ message: "404: Route Not Found" }} />
              }
            ></Route>
          </Routes>
        </ActiveUserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
