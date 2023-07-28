import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const LoginPage = () => {

  const { login } = useContext( AuthContext );

  const navigate = useNavigate();

  const onLogin = () => {

    const lastPath = localStorage.getItem('lastpath') || '/'; //Si es nulo lo enviamos a la raiz

    login('Sebastian Delgado');

    navigate(lastPath, {
      replace: true //Replace true evita que pueda regresar a la pagina anterior
    });
  }

  return (

    <div className="container mt-5">
      <h1>Login</h1>
      <hr />

      <button className="btn btn-primary" onClick={ onLogin }>
        Login
      </button>
    </div>
  )
}
