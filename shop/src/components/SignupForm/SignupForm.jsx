import { useState } from "react";
import "./SignupForm.css";
import { v4 as uuidv4 } from "uuid";


function SignupForm() {
  const [formData, setFormData] = useState({
    id: uuidv4(),
    name: "",
    surname: "",
    patronymic: "",
    email: "",
    phone: "",
    date:'',
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  console.log('привет')

    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    await res.json();
  };

  return (

      <form className="S" onSubmit={handleSubmit}>
        <img className="logo" src="/file.svg" alt="logo" />

        <strong>
          <span className="title">Регистрация</span>
        </strong>

        <input
          placeholder="Введите имя"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          placeholder="Введите фамилию"
          type="text"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
        />

        <input
          placeholder="Введите отчество"
          type="text"
          name="patronymic"
          value={formData.patronymic}
          onChange={handleChange}
        />

        <input
          placeholder="Введите почту"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          placeholder="+7"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
        
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <input
          placeholder="Введите пароль"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button className="btn" type="submit" name="button" id="myBtn">Зарегистрироваться</button>
      </form>
  

  );
}

export default SignupForm;
