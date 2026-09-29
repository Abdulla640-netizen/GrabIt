import React from "react";
import "./CardPage.css";
import { useEffect, useState } from "react";
import { categories, products } from "../../App";
import ShopItemsList from "../ShopItemsList/ShopItemList";
import { tokenStorage } from "../../shared/auth/tokenStorage";
import { useSelector } from "react-redux";

function CardPage() {
   const storeCard = useSelector((state) => state.card.value);
   console.log(storeCard, 'корзина')
  return <div>
   <div className="storeCard">
      <div className="">
        {/* <img src={storeCard[0].image} /> */}
      </div>
   </div>
  </div>;
}

export default CardPage;
