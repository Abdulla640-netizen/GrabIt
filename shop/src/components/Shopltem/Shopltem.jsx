import { useNavigate } from "react-router-dom";
import "./ShopItem.css";


function Shopltem(props) {

  const navigate = useNavigate();


  const handleClick = (id) => {
    navigate(`/item/${id}`); // Переход на страницу товара с id
  };
  return (
    <div className="product">
      <img className="img-item" src={props.product.image} alt="" />
      <div className="producttop">
        <strong>{props.product.name}</strong>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 21s-5.052-3.563-7.535-6.046C2.162 12.652 2 10.08 3.636 8.444a5 5 0 0 1 7.071 0L12 9.737l1.293-1.293a5 5 0 0 1 7.071 7.071C17.052 17.437 12 21 12 21z" />
        </svg>
      </div>
      <span>{props.product.price}</span>
      <div>
        <svg
          version="1.0"
          width="15"
          height="15"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 64 64"
          enableBackground="new 0 0 64 64"
          xmlSpace="preserve"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <g>
              <path
                fill="#231F20"
                d="M32,0C18.745,0,8,10.745,8,24c0,5.678,2.502,10.671,5.271,15l17.097,24.156C30.743,63.686,31.352,64,32,64 s1.257-0.314,1.632-0.844L50.729,39C53.375,35.438,56,29.678,56,24C56,10.745,45.255,0,32,0z M32,38c-7.732,0-14-6.268-14-14 s6.268-14,14-14s14,6.268,14,14S39.732,38,32,38z"
              ></path>
              <path
                fill="#231F20"
                d="M32,12c-6.627,0-12,5.373-12,12s5.373,12,12,12s12-5.373,12-12S38.627,12,32,12z M32,34 c-5.523,0-10-4.478-10-10s4.477-10,10-10s10,4.478,10,10S37.523,34,32,34z"
              ></path>
            </g>
          </g>
        </svg>
        <span>{props.product.location}</span>
      </div>
      <button
        className="btn-detailed"
        onClick={() => handleClick(props.product.id)}
      >
        Посмотреть товар
      </button>
      {/* <span> {products.filter((p)=>p.category === props.product.category)}</span> */}
    </div>
  );
}
export default Shopltem;
