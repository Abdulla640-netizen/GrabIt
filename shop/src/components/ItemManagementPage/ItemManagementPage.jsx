import "./ItemManagementPage.css";
import { TiLocation } from "react-icons/ti";
import { IoWallet } from "react-icons/io5";
import { RiDiscountPercentFill } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import ItemManagementOverlayContainer from "../ItemManagementOverlayContainer/ItemManagementOverlayContainer";
import { useEffect, useRef, useState } from "react";
import { IoMdPricetag } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { Await, useParams } from "react-router-dom";
import { LuImagePlus } from "react-icons/lu";

function useOutsideAlerter(ref) {
  useEffect(() => {
    function handleOutsideClick(event, callback) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  });
}

function ItemManagementPage() {
  const [item, setItem] = useState({});

  const [locationToggle, setLocationToggle] = useState(false);
  const [titleToggle, setTitleToggle] = useState(false);
  const [oldPriceToggle, setOldPriceToggle] = useState(false);
  const [newPriceToggle, setNewPriceToggle] = useState(false);
  const [descriptionToggle, setDescriptionToggle] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAddImageModal, setShowAddImageModal] = useState(false);
  const [selectedImagesURL, setSelectedImagesURL] = useState("");
  const [imageUrl, setImageUrl] = useState("")

  const textareaRef = useRef(null);

  const { id } = useParams();

  useEffect(() => {
    const getItem = async () => {
      const res = await fetch(`http://localhost:3000/items/${id}`);
      const data = await res.json();
      setItem(data);
    };

    getItem();
  }, [item]);

  const handleInput = () => {
    const el = textareaRef.current;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  const handleEnter = async () => {
    await fetch(`http://localhost:3000/items/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        old_price: item.old_price,
        new_price: item.new_price,
        name: item.name,
        location: item.location,
        description: item.description,
      }),
    });
  };

  const handleDelete = async () => {
    await fetch(`http://localhost:3000/images/${id}`, {
      body: JSON.stringify({
        url: selectedImagesURL,
      }),
      headers: {
        "content-Type": "application/json",
      },

      method: "DELETE",
    });
  };
  const handleAddImage = async () => {
    await fetch(`http://localhost:3000/images/${id}`, {
      body: JSON.stringify({
        url: imageUrl,
      }),
      headers: {
        "content-Type": "application/json",
      },

      method: "POST",
    });
  };

  return (
    <div className="item-management-page">
      <div className="item-management-container">
        <div className="item-management-images">
          {item.images?.map((image) => (
            <div
              onClick={() => {
                setShowModal(true);
                setSelectedImagesURL(image);
              }}
            >
              <div className="container">
                <img src={image} onClick={() => setShowModal(true)} alt="" />
                <div className="overlay">
                  <div className="images-delete">
                    <FaTrashAlt size={40} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="item-images-btn "
          onClick={() => setShowAddImageModal(true)}
        >
          Добавить изображение
        </button>
        <div className="useState-container">
          <div className="description box">
            <b>
              {" "}
              <CgDetailsMore /> Описание
            </b>
            {descriptionToggle ? (
              <textarea
                className="Description-input useState input"
                onKeyDown={(e) => {
                  if (e.key === "Enter") setDescriptionToggle(false);
                }}
                style={{ overflow: "hidden", resize: "none" }}
                ref={textareaRef}
                value={item.description}
                onInput={(e) => {
                  setItem({ ...item, description: e.target.value });
                  handleInput();
                }}
              />
            ) : (
              <p
                className="Description-p useState"
                onClick={() => setDescriptionToggle(true)}
              >
                {item.description}
              </p>
            )}
          </div>
          <div className="location box">
            <b>
              {" "}
              <MdLocationPin />
              Локация
            </b>{" "}
            {locationToggle ? (
              <input
                className="location-input useState input"
                type="text"
                value={item.location}
                onChange={(e) => setItem({ ...item, location: e.target.value })}
              />
            ) : (
              <p
                className="location-p useState"
                onClick={() => setLocationToggle(true)}
              >
                {item.location}
              </p>
            )}
          </div>

          <p>
            <div className="title box">
              <b>
                {" "}
                <MdDriveFileRenameOutline />
                Название
              </b>
              {titleToggle ? (
                <input
                  className="title-input useState input"
                  type="text"
                  value={item.name}
                  onChange={(e) => setItem({ ...item, name: e.target.value })}
                />
              ) : (
                <p
                  className="title-p useState"
                  onClick={() => setTitleToggle(true)}
                >
                  {item.name}
                </p>
              )}
            </div>
          </p>
          <p>
            <div className="newPrice box">
              <b>
                {" "}
                <IoWallet />
                Цена
              </b>

              {oldPriceToggle ? (
                <input
                  className="oldPrice-input useState input"
                  type="text"
                  value={item.old_price}
                  onChange={(e) =>
                    setItem({ ...item, old_price: e.target.value })
                  }
                />
              ) : (
                <p
                  className="oldPrice-p useState"
                  onClick={() => setOldPriceToggle(true)}
                >
                  {item.old_price}
                </p>
              )}
            </div>
          </p>
          <p>
            <div className="oldPrice box">
              <b>
                {" "}
                <IoMdPricetag /> Цена со скидкой
              </b>
              {newPriceToggle ? (
                <input
                  className="newPrice-input useState input"
                  type="text"
                  value={item.new_price}
                  onChange={(e) =>
                    setItem({ ...item, new_price: e.target.value })
                  }
                />
              ) : (
                <p
                  className="newPrice-p useState"
                  onClick={() => setNewPriceToggle(true)}
                >
                  {item.new_price}
                </p>
              )}
            </div>
          </p>
        </div>
        <button className="item-edit-btn" onClick={handleEnter}>
          Изменить товар
        </button>
      </div>

      {showModal && (
        <div style={styles.overlay} onClick={() => setShowModal(false)}>
          <div style={styles.Modal} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <FaTrashAlt size={60} />
              <h4>Вы уверены что хотите удалить это фото?</h4>
            </div>
            <p className="delete-description">
              Это действие удалит фото из базы данных навсегда.Вернуть
              изображение больше будет невозможно
            </p>
            <div className="modal-btn">
              <button className="delete-btn " onClick={() => handleDelete()}>
                Удалить
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Отменить
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddImageModal && (
        <div style={styles.overlay} onClick={() => setShowModal(false)}>
          <div style={styles.Modal} onClick={(e) => e.stopPropagation()}>
            <div className=" modal-header">
              <LuImagePlus size={70} />
              <h3>Введите ссылку на изображение</h3>
            </div>
            <p className="modal-description">
              Для того чтобы добавить изображение нужно ввести ссылку на
              изображение в поле ввода ниже
            </p>
            <input value={imageUrl}
            onInput={(e)=> setImageUrl(e.target.value)}
              className="input-modal"
              type="text"
              placeholder="Ссылка на изображение..."
            />
            <div className="modal-btn">
              <button className="add-btn " onClick={() => handleAddImage()}>
                Добавить
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowAddImageModal(false)}
              >
                Отменить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
const styles = {
  overlay: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  Modal: {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    minWidth: "300px",
    width: "450px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
};
export default ItemManagementPage;
