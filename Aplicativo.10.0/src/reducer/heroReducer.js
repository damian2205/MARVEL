import * as Type from '../actions/actionType';
import initialState from '../reducer/initialState';

const heroReducer = (state = initialState.datas, action) => {
    if (action.type === Type.ADD_HERO){
        return {
        ...state, 
        hero: action.response}
    }
    

}

export default heroReducer;