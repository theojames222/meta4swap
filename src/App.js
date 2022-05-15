import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import Create from "./components/pages/Create";
import Shop from "./components/pages/Shop";
import Product from "./components/pages/Product";
import Order from "./components/pages/Order";
import Category from "./components/pages/Category";

function App() {
  return (
    <Router>
      <div className="flex flex-col">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/create" element={<Create />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product" element={<Product />} />
            <Route path="/order" element={<Order />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
