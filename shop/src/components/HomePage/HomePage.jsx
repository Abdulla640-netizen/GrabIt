import React from "react";
import { useEffect, useState } from "react";
import { categories, products } from "../../App";
import ShopItemsList from "../ShopItemsList/ShopItemList";
import "./HomePage.css";
import { tokenStorage } from "../../shared/auth/tokenStorage";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../app/store";
import {
  getCategories,
  setCategories,
} from "../../features/categories/categories";
import { setProducts } from "../../features/products/products";

function HomePage() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [allCategories, setAllCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();
  const storeCategories = useSelector((state) => state.categories);
  const storeProducts = useSelector((state) => state.products);
  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch("http://localhost:3000/categories");
      const data = await res.json();

      const result = data.map((el) => Object.values(el)[1]);
      console.log(storeCategories);
      setCategories(result);
      useDispatch(setCategories(categories));
      setAllCategories(["Все", ...categories]);
      console.log(allCategories);
    };
    getCategories();
  });

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((response) => {
        response.json();
      })
      .then((data) => {
        dispatch(setProducts(data));
      });
  },[dispatch]);
  
  const filteredProducts = activeCategory === "Все" 
  ?products
  :products.filter((product)=>{
    product.title
    .toLowerCase()
    .includes(setSearch.toLowerCase())
  })
  


  const handleClick = (category) => {
    setActiveCategory(category);
  };
  const styles = {
    container: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      padding: "16px",
    },
    button: (isActive) => ({
      padding: "10px 18px",
      borderRadius: "12px",
      border: isActive ? "2px solid #007bff" : "1px solid #ccc",
      backgroundColor: isActive ? "#e7f1ff" : "#fff",
      color: isActive ? "#007bff" : "#333",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s ease-in-out",
      marginTop: "10%",
    }),
  };
  console.log(tokenStorage.get());
  // Добавляем "Все" к списку категорий

  // Фильтруем товары
  

  return (
    <div className="Home">
      <div style={styles.container}>
        {allCategories.map((category) => (
          <button
            className="btn-category"
            key={category}
            style={styles.button(activeCategory === category)}
            onClick={() => handleClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Передаём отфильтрованные товары */}
      <ShopItemsList products={filteredProducts} />
    </div>
  );
}

export default HomePage;
