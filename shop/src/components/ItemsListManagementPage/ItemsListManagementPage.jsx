import { useEffect, useState } from "react";
import "./ItemsListManagementPage.css";
import { useNavigate } from "react-router-dom";


function ItemsListManagementPage() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      const res = await fetch("http://localhost:3000/items");
      const data = await res.json();
      setItems(data);
    };

    getItems();
  }, [items]);

const navigate = useNavigate();


  const handleClick = (id) => {
    navigate(`/item/management/${id}`); // Переход на страницу товара с id
  };

  return (
    <div className="ItemsListManagementPage">
      {items.map((item) => (
        <div key={item.id} className="product">
          <img src={item.images[0]} alt="" />
          <div className="producttop">
            <strong>{item.name}</strong>
            
          </div>
          <span>{item.price}</span>
          <div>
            <span>{item.location}</span>
          </div>
          <button onClick={()=>handleClick(item.id)} className="btn-detailed">Редактировать</button>
        </div>
      ))}
    </div>
  );
}

export default ItemsListManagementPage;
