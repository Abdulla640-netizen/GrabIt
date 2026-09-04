import { Link, useParams, useSearchParams } from "react-router-dom";
import { products } from "../../App";
import "./ShopltemPage.css";
import { IoWallet } from "react-icons/io5";
import { TiLocation } from "react-icons/ti";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa6";
import { IoLinkOutline } from "react-icons/io5";
import { LuMailWarning } from "react-icons/lu";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { FaBox } from "react-icons/fa";
import { PiCrownSimpleFill } from "react-icons/pi";
import { IoStar } from "react-icons/io5";
import { MdOutlineCurrencyRuble } from "react-icons/md";
import { FaRubleSign } from "react-icons/fa";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment,decrement } from "../../features/counter/counter";


const ShopItemPage = () => {
  const { id } = useParams(); // Получаем id из URL
  
   const dispatch = useDispatch()

  const count = useSelector((state) => state.counter.value);
  console.log(count);
  const [showSellerInfo, setShowSellerInfo] = useState(false);

  const product = products.find((item) => item.id === Number(id));
  if (!product) {
    return <h2 className="not-found">Товар не найден 😢</h2>;
  }

  useEffect(() => {
    console.log(showSellerInfo);
  });
  const [like, setLike] = useState(false);
  return (
    <div className="item-page">
      <div className="back-main">
        <Link to="/">
          <IoIosArrowRoundBack size={40} className="arrow" color="#000000" />
        </Link>
        <div className="like-link-warning">
          {like ? (
            <FaHeart
              size={25}
              onClick={() => setLike(!like)}
              className="like-link"
              fill={like ? "red" : "black"}
              color={like ? "red" : "black"}
            />
          ) : (
            <FaRegHeart
              size={25}
              onClick={() => setLike(!like)}
              className="like-link"
              fill={like ? "red" : "black"}
              color={like ? "red" : "black"}
            />
          )}

          <IoLinkOutline size={30} className="like-link" />
          <LuMailWarning size={27} />
        </div>
      </div>

      <div className="item-container">
        <div className="item-image-block">
          <img src={product.image} alt={product.name} className="item-image" />
        </div>

        <div className="item-info">
          <h3 className="item-name">{product.name}</h3>
          <div className="item-location">
            <TiLocation />
            <span>{product.location}</span>
          </div>
          <div className="item-title">{product.title}</div>
          <p className="item-more_details">{product.more_details}</p>
        </div>
        <div className="block">
          {" "}
          <div className="prices">
            {" "}
            <div className="price-icons">
              <IoWallet size={22} color="red" />
              <p className="item-price">
                {product.price}
                <FaRubleSign />
              </p>
            </div>
            <p className="item-originalPrice">
              {" "}
              {product.originalPrice}
              <FaRubleSign />
            </p>
          </div>
          <div className="buttons">
            {" "}
            <h1>
              {" "}
              
              {count}
            </h1>
            <button onClick={()=>dispatch(increment())}>+</button> 
            <button onClick={()=>dispatch(decrement())}>-</button>
            <button className="order-btn">Добавить в корзину</button>{" "}
            <button className="back-btn">
              <Link to="/" className="back-btn">
                Купить сейчас
              </Link>
            </button>
          </div>
          <div className="delivery-info-crown">
            <div className="delivery-info">
              {" "}
              <FaBox size={10} color="#c4c4d4" />
              Завтра,
              <span className="delivery">грузовая доставка склад продавца</span>
            </div>
            <div
              onMouseEnter={() => setShowSellerInfo(true)}
              className="crown-info"
            >
              <PiCrownSimpleFill color="" /> ИП Ярыкбаев А.З.{" "}
              <IoStar color="#ff8533" /> 5
            </div>
          </div>
          {showSellerInfo ? (
            <div
              className="SelleriInfo"
              onMouseEnter={() => setShowSellerInfo(true)}
              onMouseLeave={() => setShowSellerInfo(false)}
            >
              <div className="additional-infor">
                <span className="name-star name">Дом Зеркал для Ванной</span>
                <div className="name-star star">
                  {" "}
                  <div>
                    <IoStar color="#ff8533" /> 5 · 1 оценки на товары
                  </div>{" "}
                </div>
                <div className="Goods-sold">
                  <div>Товара продано</div> <span>1</span>
                </div>
                <div className="time">
                  На Grabit <span>1 год</span>
                </div>
                <div className="btn-All-products">
                  <Link to="/seller">
                    <button className="All-products ">
                      Все товары продавца
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopItemPage;
