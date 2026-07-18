import { useEffect, useState } from "react";
import { categories, products } from "../../App";
import ShopItemsList from "../ShopItemsList/ShopItemList";
import { tokenStorage } from "../../shared/auth/tokenStorage";
import "./SellerPage.css";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidShoppingBag } from "react-icons/bi";
import { AiTwotoneShop } from "react-icons/ai";
// import { Switch } from "@mui/material";
import React from "react";
import Select from "react-select";

import { IoWallet } from "react-icons/io5";
import { TiLocation } from "react-icons/ti";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa6";
import { IoLinkOutline } from "react-icons/io5";
import { LuMailWarning } from "react-icons/lu";

import { FaHeart } from "react-icons/fa6";
import { FaBox } from "react-icons/fa";
import { PiCrownSimpleFill } from "react-icons/pi";
import { IoStar } from "react-icons/io5";
import { MdOutlineCurrencyRuble } from "react-icons/md";
import { FaRubleSign } from "react-icons/fa";

const sortOptions = [
  { value: "media", label: "По популярности" },
  { value: "rating", label: "По рейтингу" },
  { value: "big-price", label: "По возрастанию цены" },
  { value: "small-price", label: "По убыванию цены" },
  { value: "new", label: "По новинкам" },
];

const sellerOptions = [
  { value: "sport", label: "Спортивный товар " },
  { value: "cosmetic", label: "Косметика" },
  { value: "techniqe", label: "Электроника" },
  { value: "home", label: "Товары для дома" },
];
const categoriesOptions = [
  { value: "sport", label: "Спорт " },
  { value: "cosmetic", label: "Красота" },
  { value: "techniqe", label: "Техника" },
  { value: "home", label: "Дом" },
];
const deliveryTimeOptions = [
  { value: "any", label: "Любой " },
  { value: "tomorrow", label: "Завтра" },
  { value: "day after tomorrow", label: "Послезавтра" },
  { value: " up to 3 days", label: "До 3 днейм" },
];


function SellerPage() {
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const [deliveryTimeOption, setDeliveryTimeOption] = useState(deliveryTimeOptions[0]);
  const [categoriesOption, setCategoriesOption] = useState(categoriesOptions[0]);
  const [sellerOption, setSellerOption] = useState(sellerOptions[0]);
 

  const [activeCategory, setActiveCategory] = useState("Все");
  const [allCategories, setAllCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch("http://localhost:3000/categories");
      const data = await res.json();
      const result = data.map((el) => Object.values(el)[1]);
      setCategories(result);
      setAllCategories(["Все", ...categories]);
      console.log(allCategories);
    };
    getCategories();
  });

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
  const filteredProducts =
    activeCategory === "Все"
      ? products
      : products.filter((p) => {
          console.log(p.category);
          console.log(activeCategory);
          console.log(p.category === activeCategory);
          return p.category === activeCategory;
        });

  return (
    <div className="Home">
      <div>
        <div className="back-main">
          <Link to="/">
            <IoIosArrowRoundBack size={40} className="arrow" color="#000000" />
          </Link>
          <div className="like-link-warning">
            <FaHeart size={25} className="like-link" />

            <FaRegHeart size={25} className="like-link" />

            <IoLinkOutline size={30} className="like-link" />
            <LuMailWarning size={27} />
          </div>
        </div>
      </div>
      <div className="seller-container">
        <div className="-seller-block">
          <div className="seller">ИП Ярыкбаев А.З.</div>{" "}
          <div className="seller-stars">
            {" "}
            <IoStar color="#ff8533" /> 5{" "}
            <span className="dop-info">· 1 оценки на товары</span>
          </div>
        </div>
        <div className="seller-info">
          <div className="seller-info-container">
            <div className="seller-info-container-top">
              <BiSolidLike /> 47 595
            </div>
            <span className="dop-info"> товаров продано</span>
          </div>
          <div className="seller-info-container">
            <div className="seller-info-container-top">
              <BiSolidShoppingBag /> 94%{" "}
            </div>
            <span className="dop-info"> заказов выкуплено</span>
          </div>
          <div className="seller-info-container">
            {" "}
            <div className="seller-info-container-top">
              <AiTwotoneShop /> 1 год
            </div>
            <span className="dop-info"> на GrabIt</span>
          </div>
        </div>
      </div>
      <div className="items-title">
        <div className="title">
          <h2>Все товары</h2>{" "}
          <span className="quantity-of-goods">16 товаров</span>
        </div>
      </div>
      <div className="btns-seller-item">
        <Select
          defaultValue={sortOption}
          onChange={setSortOption}
          options={sortOptions}
        />
        <Select
          defaultValue={deliveryTimeOption}
          onChange={setDeliveryTimeOption}
          options={deliveryTimeOptions}
        />
        <Select
          defaultValue={categoriesOption}
          onChange={setCategoriesOption}
          options={categoriesOptions}
        />
        <Select
          defaultValue={sellerOption}
          onChange={setSellerOption}
          options={sellerOptions}
        
        />
        <button className="btn-seller-item">По популярности</button>
        <button className="btn-seller-item">Все фильтры</button>
        <button className="btn-seller-item">товары продавца</button>
        <button className="btn-seller-item">Категория</button>
        <button className="btn-seller-item">Цена, ₽</button>
        <button className="btn-seller-item">Срок доставки</button>
        <button className="btn-seller-item">С рейтингом от 4,7</button>
        <button className="btn-seller-item">Оригинал</button>
      </div>
      {/* Передаём отфильтрованные товары */}
      <ShopItemsList products={filteredProducts} />
    </div>
  );
}

export default SellerPage;
