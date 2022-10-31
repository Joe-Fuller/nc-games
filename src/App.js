import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Frontpage from "./components/Frontpage";
import CategoryPage from "./components/CategoryPage";
import SingleReviewPage from "./components/SingleReviewPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
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
      </div>
    </BrowserRouter>
  );
}

export default App;
