// import { combineReducers } from 'redux'
import favoritoReducer from './favoritoReducer';
import heroeReducer from './heroReducer';
// import initialState from './initialState';

// const appReducer = combineReducers({
//     favoritoReducer,
//     heroeReducer
// })

const rootReducer = (state, action) => {
    return (favoritoReducer(state, action), heroeReducer(state, action));

}

export default rootReducer;