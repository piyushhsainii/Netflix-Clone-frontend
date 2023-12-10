import { createStore , applyMiddleware , combineReducers  } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools }  from 'redux-devtools-extension'
import UserLoginReducer, { LoadUser, signUpReducer, updateUser } from './reducers/user'
import { DeleteListElementReducer, createListReducer, getListReducer, getListReducer2 } from './reducers/listReducer'
import { getRandomMovieReducer } from './reducers/movieReducer'


const reducer = combineReducers(
  {
      userLogin : UserLoginReducer,
      signUp: signUpReducer,
      User : LoadUser,
      updateUserInfo : updateUser,
      List : getListReducer,
      AllList : getListReducer2,
      RandomMovie : getRandomMovieReducer,
      MyList : createListReducer,
      RemoveFromList :DeleteListElementReducer
  }
)

const initalState = {}

const middleware = [ thunk ]
 const store = createStore(
    reducer,
    initalState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
