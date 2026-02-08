import SignupForm from "../SignupForm/SignupForm";
import "./SignupPage.css";

function SignupPage() {
  return (
    <div className="SignupPage">
      <SignupForm></SignupForm>
      <footer className="footer">
        <div className="footer-elements">

          <div className="footer-element">
            <p >© 2025 GrabIt</p>
           <a href="" className="footer-link">Правила</a> 
          </div>

          <div className="footer-element">
        <a href="" className="footer-link"> Применяются рекомендательные технологии</a> 
          <a href="" className="footer-link">Разработчикам</a> 
          </div>
       
            <p className="footer-element">Русский</p>         

        </div>
      </footer>
    </div>
  );
}

export default SignupPage;
