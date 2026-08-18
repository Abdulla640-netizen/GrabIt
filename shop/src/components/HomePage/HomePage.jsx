import React from 'react'
import { useEffect, useState } from "react";
import { categories, products } from "../../App";
import ShopItemsList from "../ShopItemsList/ShopItemList";
import './HomePage.css'
import { tokenStorage } from "../../shared/auth/tokenStorage";

function HomePage() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [allCategories, setAllCategories] = useState([])
  const [categories, setCategories] = useState([])

 useEffect(() => {
    const getCategories = async () => {
      const res = await fetch("http://localhost:3000/categories");
      const data = await res.json();
      const result = data.map(el=>Object.values(el)[1])
      setCategories(result);
      setAllCategories(["Все",...categories])
      console.log(allCategories)
    };
    getCategories()
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
        marginTop:'10%',
    }),
  };
console.log(tokenStorage.get())
  // Добавляем "Все" к списку категорий

  

  // Фильтруем товары
  const filteredProducts =
    activeCategory === "Все"
      ? products
      : products.filter((p) =>{
        console.log(p.category)
        console.log(activeCategory)
        console.log(p.category===activeCategory)
        return p.category === activeCategory
      }) 

  return (
    <div className="Home">

      <div style={styles.container}>
        {allCategories.map((category) => (
          <button className="btn-category"
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