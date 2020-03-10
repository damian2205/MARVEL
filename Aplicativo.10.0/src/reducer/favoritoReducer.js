import * as Type from '../actions/actionType';
import initialState from '../reducer/initialState';

const favoritoReducer = (state = initialState.favoritos, action) => {
    if (action.type === Type.ADD_FAVORITO){
        return {
            ...state,
            favoritos: state.favoritos.concat(action.heroe),
            heroes: state.heroes.filter(ok => ok.value !== action.heroe.value)
        }
    }

    if (action.type === Type.DELETE_FAVORITO){
        return{
            ...state,
            favoritos: state.favoritos.filter(ok => ok.value !== action.heroe.value),
            heroes: state.heroes.concat(action.heroe)
        }
    }
    

}

export default favoritoReducer;