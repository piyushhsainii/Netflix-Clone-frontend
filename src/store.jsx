import { createStore , applyMiddleware , combineReducers  } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools }  from 'redux-devtools-extension'
import UserLoginReducer, { LoadUser, signUpReducer } from './reducers/user'
import { getListReducer } from './reducers/listReducer'
import { getRandomMovieReducer } from './reducers/movieReducer'


const reducer = combineReducers(
  {
      userLogin : UserLoginReducer,
      signUp: signUpReducer,
      User : LoadUser,
      List : getListReducer,
      RandomMovie : getRandomMovieReducer,

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
