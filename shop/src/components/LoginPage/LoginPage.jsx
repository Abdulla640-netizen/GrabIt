import { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { tokenStorage } from "../../shared/auth/tokenStorage";
import React from 'react'


function LoginPage() {
  const [formData, setFormData] = useState({

    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();



    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Статус:", res.status);
      console.log(JSON.stringify(formData));
      const text = await res.json();
      tokenStorage.set(text.token)
      navigate('/')
      console.log("Ответ сервера:", text);
    } catch (err) {
      console.log("Ошибка запроса:", err);
    }
  };
  return (
    <div className="LoginPage">
      <form className="S" onSubmit={handleSubmit}>
        <img className="logo" src="/file.svg" alt="logo" />

        <strong>
          <span className="title">Вход</span>
        </strong>

        <input
          placeholder="Введите почту"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          placeholder="Введите пароль"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

 <a className="Link-signup"  href="/signup">Регистрация </a>


        <button className="btn" type="submit" name="button">
          Войти
        </button>
      </form>
      <footer className="footer">
        <div className="footer-elements">
          <div className="footer-element">
            <p>© 2025 GrabIt</p>
            <a href="" className="footer-link">
              Правила
            </a>
          </div>

          <div className="footer-element">
            <a href="" className="footer-link">
              {" "}
              Применяются рекомендательные технологии
            </a>
            <a href="" className="footer-link">
              Разработчикам
            </a>
          </div>

          <p className="footer-element">Русский</p>
        </div>
      </footer>
    </div>
  );
}
export default LoginPage;
