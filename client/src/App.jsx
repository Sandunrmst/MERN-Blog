import "./App.css";
import Header from "./components/header/header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import AddNewBlog from "./pages/addblog";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/add-blog" element={<AddNewBlog />} />
      </Routes>
    </>
  );
}

export default App;
