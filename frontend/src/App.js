import React from 'react';
import AppNavbar from './Components/LandingPage/appNavbar/appNavbar';
import {Provider} from 'react-redux';
import store from './store';
import MainPage from './Components/mainComponent'


function App() {

  return (
    <Provider store={store}>
    <div className="App" >
       <AppNavbar/> 
       <MainPage/>
    </div>
    </Provider>
  );
}

export default App
