import {combineReducers} from 'redux';
import Errors from './errorReducer';
import Users from './authReducer';
import Status from './statusreducer';
import Job from './jobReducer';
import { accept } from './acceptReducer';

const rootReducer=combineReducers({
    error:Errors,
    users:Users,
    status:Status,
    job:Job,
    accept:accept
    
})

export default rootReducer;