import React from 'react'
import "./Header.css";
import { FaShoppingCart } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { MdBusinessCenter } from "react-icons/md";
import { tokenStorage } from "../../shared/auth/tokenStorage";
import { useEffect, useState } from "react";
import { ImExit } from "react-icons/im";
import { LuImagePlus } from "react-icons/lu";
import { Link } from "@mui/material";
import { setSearch } from "../../features/search/search";
import { useDispatch, useSelector } from "react-redux";


function Header() {
const [loggedIn,setLoggedIn ] = useState(!!tokenStorage.get())

const [showModal, setShowModal] = useState(false);

const logOut =()=> {
  tokenStorage.remove()
  window.location.reload()
}
  
const search = useSelector((state)=> state.search.value)
const dispatch = useDispatch()




  return (
    <header>
      <div className="Header">
        {/* <div className="logo-Header">
        <img  src="/logo.svg" alt="logo" />
        </div> */}
        <div className="logo">
        
          <span className="logo-first logo-color" >G</span>{" "}
          <span className="logo-second logo-color">rab</span>{" "}
          <span className="logo-third logo-color">I</span>{" "}
          <span className="logo-second logo-color">t</span>
        </div>

        <input
        value={search}
        onChange={(e)=> dispatch(setSearch(e.target.value))}
          className="search"
          placeholder="Найти на GrabIt..."
          type="search"
        />
        <div className="link">
          {!loggedIn && (
            <a href="/login" className="Header-link">
              <div className="icons">
                <IoPerson size={24} />
                <span> Войти</span>
              </div>
            </a>
          )}

   {loggedIn && (
            <a href="#"onClick={()=>setShowModal(true)} className="Header-link">
              <div className="icons">
                <ImExit size={24 } color="#4a54df" />
                <span> Выйти</span>
              </div>
            </a>
          )}

          <a href="" className="Header-link">
            <div className="icons">
              <MdBusinessCenter size={24} color="#4a54df" />
             <span>Для бизнеса</span>
            </div>
          </a>
          <a href="" className="Header-link">
            <div className="icons" color="#4a54df">
              {" "}
              <FaShoppingCart size={24} />
              <Link to='/card'> Корзина</Link>
            </div>
          </a>
        </div>
      </div>
      {showModal && (
              <div style={styles.overlay} onClick={() => setShowModal(false)}>
                <div style={styles.Modal} onClick={(e) => e.stopPropagation()}>
                  <div className=" modal-header">
                    <ImExit size={70 }/>
                    <h3>Вы уверены что хотите выйти из учетной записи?</h3>
                  </div>
                  <p className="modal-description">
                    Для того чтобы снова войти в аккаунт нужно будет ввести данные учетной записи на странице входа
                  </p>
                  
                  <div className="modal-btn">
                    <button className="delete-btn " onClick={() => logOut()}>
                      Выйти 
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
    </header>
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
export default Header;
