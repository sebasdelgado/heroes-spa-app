import { heroes } from '../data/heroes';

export const getHeroById = ( id ) => {

    //Si existe el id regresa el hero, si no existe regresa un undefined
    return heroes.find( hero => hero.id === id );
}