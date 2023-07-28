import { Navigate, useParams, useNavigate } from "react-router-dom";
import { getHeroById } from "../helpers";
import { useMemo } from 'react';

export const HeroPage = () => {

  //Obtenemos los argumentos de la URL que se especifican
  const { id } = useParams();
  const navigate = useNavigate();

  //Memorizamos los valores por si el componente se redibuja, 
  //solo se dispara la función del callback si sus dependencias cambian
  const hero = useMemo(() => getHeroById( id ), [ id ]); //Cuando el id cambia se dispara la función  

  if ( !hero ) {
    return <Navigate to = "/marvel" />
  }

  const onNavigateBack = () => {
    navigate(-1); //Con -1 redireccionamos a la pagina anterior 
  }

  return (

    <div className="row mt-5">

      <div className="col-4">

        <img src={ `/assets/heroes/${id}.jpg` } 
          alt= { hero.superhero } 
          className="img-thumbnail animate__animated animate__fadeInLeft"
        />
      </div>

      <div className="col-8">

        <h3>{ hero.superhero }</h3>

        <ul className="list-group list-group-flush">

          <li className="list-group-item"> <b>Alter ego: </b>{ hero.alter_ego }</li>
          <li className="list-group-item"> <b>Publisher: </b>{ hero.publisher }</li>
          <li className="list-group-item"> <b>First appearance: </b>{ hero.first_appearance }</li>
        </ul>

        <h5 className="mt-3">Characters</h5>
        <p>{ hero.characters }</p>

        <button 
          className="btn btn-outline-primary"
          onClick={ onNavigateBack }> 
          Regresar 
        </button>
      </div>
    </div>
  )
}
