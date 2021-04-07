import {createStore,applyMiddleware,compose} from 'redux';//compose is used when multiple 
//enhancers are used but here is its no use because only thunk is used here.
import thunk from 'redux-thunk';
import rootReducer from './redux/rootReducer';

const initialState={};

const middleware=[thunk];

const store=createStore(rootReducer,initialState,compose(applyMiddleware(...middleware)))

export default store;