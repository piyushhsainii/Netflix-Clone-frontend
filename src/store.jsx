import { createStore , applyMiddleware , combineReducers  } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools }  from 'redux-devtools-extension'
import UserLoginReducer, { LoadUser } from './reducers/user'


const reducer = combineReducers(
  {
      userLogin : UserLoginReducer,
      loadUser : LoadUser

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
