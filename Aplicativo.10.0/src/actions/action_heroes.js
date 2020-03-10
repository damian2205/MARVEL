import api_marvel from '../api/marvel';
import * as Type from '../actions/actionType';

  export function  characters() {
    console.log("ENTRO HERO")
    return (dispatch) => {
        return api_marvel.Marvel().then(response => {
          dispatch(charContent(response))
        }).catch(err => console.error(err))
        dispatch("HELLO MEN")
        }
    }

export function charContent(response) {
    console.log("hero", response)
    return { type: Type.ADD_HERO, response};
  }