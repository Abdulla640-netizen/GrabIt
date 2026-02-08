import { useState } from "react";
import { categories, products } from "../../App";
import ShopItemsList from "../ShopItemsList/ShopItemList";
import './HomePage.css'

function HomePage() {
  const [activeCategory, setActiveCategory] = useState("Все");

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
        marginTop:'70px'
    }),
  };

  // Добавляем "Все" к списку категорий
  const allCategories = ["Все", ...categories];

  // Фильтруем товары
  const filteredProducts =
    activeCategory === "Все"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="Home">

      <div style={styles.container}>
        {allCategories.map((category) => (
          <button
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