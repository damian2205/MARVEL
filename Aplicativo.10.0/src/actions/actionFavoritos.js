import * as Type from '../actions/actionType';

export function actionFavoritos() {
    console.log("ENTRO FAV")
    return (dispatch) =>{
        dispatch('Hello')
        };
    };

export function favContent(response) {
    console.log("fav", response)
    return { type: Type.ADD_FAVORITO, response },
            { type: Type.DELETE_FAVORITO, response };
  }
  