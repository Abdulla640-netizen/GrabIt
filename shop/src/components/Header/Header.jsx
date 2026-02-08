import "./Header.css";
function Header() {
  return (
    <header>
      <div className="Header">
        <img  src="/file.svg" alt="logo" />
         <input className="search" placeholder="Найти на GrabIt..." type="search" />
        <div className="link">
      <a href="/signup">Войти</a>
          <span>Для бизнеса</span>
          <span>Корзина</span>
        </div>
      </div>
    </header>
  );
}
export default Header;
