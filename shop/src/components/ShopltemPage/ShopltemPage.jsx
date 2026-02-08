import { Link, useParams } from "react-router-dom";
import { products } from "../../App";
import "./ShopltemPage.css";

const ShopItemPage = () => {
  const { id } = useParams(); // Получаем id из URL
  const product = products.find((item) => item.id === Number(id));
  if (!product) {
    return <h2 className="not-found">Товар не найден 😢</h2>;
  }

  return (
    <div className="item-page">
      <div className="item-container">
        <div className="item-image-block">
          <img src={product.image} alt={product.name} className="item-image" />
        </div>

        <div className="item-info">
          <h3 className="item-name">{product.name}</h3>
          <p className="item-location">📍 {product.location}</p>
          <div className="item-title">{product.title}</div>
          <p className="item-more_details">{product.more_details}</p>
        </div>
        <div className="block">
          {" "}
          <div className="prices">
            {" "}
            <p className="item-price">{product.price}</p>
            <p className="item-originalPrice"> {product.originalPrice} </p>
          </div>
          <div className="buttons">
            {" "}
            <button className="order-btn">Добавить в корзину</button>{" "}
            <button className="back-btn">
              <Link to="/" className="back-btn">
                Купить сейчас
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopItemPage;
