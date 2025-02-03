import { Header } from "./containers/Header/Header";
import { Footer } from "./containers/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { DeliveryPage } from "./pages/DeliveryPage";
import { ReturnsPage } from "./pages/ReturnsPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactsPage } from "./pages/ContactsPage";
import { ProductPage } from "./pages/ProductPage";
import { useEffect, useState } from "react";
import axios from "axios";
import { CategoriesPage } from "./pages/CategoryPage";
import { ProductListPage } from "./pages/ProductListPage";
import { OrderPage } from "./pages/OrderPage";
import { BasketReducer } from "./reducers/BasketReducer";
import { TestimonialsPage } from "./pages/TestimonialsPage";
import { OrderSuccess } from "./pages/OrderSuccess";

function App() {
  const url = import.meta.env.VITE_BACKEND_BASE_URL;

  const [categories, setCategories] = useState(null);

  const getCategories = async () => {
    const res = await axios.get(`${url}/api/categories/?populate[0]=logo`);
    console.log(res.data.data);

    const cat = res.data.data.map((category) => {
      return (
        <>
          <Route
            path={`/product_list/:category?/`}
            element={<CategoriesPage />}
            key={category.attributes.titleForNav}
          />
          <Route
            path={`/product_list/:${category.attributes.titleForNav}?/:productId?/*`}
            element={<ProductPage />}
            key={"category-" + category.attributes.titleForNav + "-product"}
          />
        </>
      );
    });
    setCategories(cat);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <BasketReducer>
        <Header />
        <Routes>
          <Route path="/" key="index" element={<HomePage />} />
          <Route path="/delivery" key="delivery" element={<DeliveryPage />} />
          <Route path="/returns" key="returns" element={<ReturnsPage />} />
          <Route path="/about" key="about" element={<AboutPage />} />
          <Route path="/contacts" key="contacts" element={<ContactsPage />} />
          <Route
            path="/product_list"
            key="product_list"
            element={<ProductListPage />}
          />
          <Route path="/basket" key="basket" element={<OrderPage />} />
          <Route
            path="/testimonials"
            key="testimonials"
            element={<TestimonialsPage />}
          />
          <Route
            path="/order_success"
            key="order_success"
            element={<OrderSuccess />}
          />
          {categories}
        </Routes>
        <Footer />
      </BasketReducer>
    </>
  );
}

export default App;
