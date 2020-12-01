import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import data from './db/menu.json';
import {saveState, loadState} from "./localstorage";

import Home from "./pages/Home";
import Alacarte from "./pages/Alacarte";
import VisibleItemList from "./pages/Menu3";
import Favorite from "./pages/Favorite";
import VisibleCart from "./pages/OrderSummary";
import Signup from "./pages/Signup";
import Choice from "./pages/Choice";

const persistedState = loadState("shoppingCart");
const store = createStore(reducer, {shoppingCart: persistedState});
data.forEach((item) => store.dispatch({
    "type" : "ADD_LISTING",
    "item" : item
}));
store.subscribe(() => saveState("shoppingCart", store.getState()["shoppingCart"]));



function App() {
    return (
        <Provider store={store}>
            <Router itemListing = {store.getState()["itemListing"]}>
                <Route exact path="/" component={Home}/>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/alacarte" component={Alacarte}/>
                <Route exact path="/menu" component={VisibleItemList}/>
                <Route exact path="/choice" component={Choice}/>
                <Route exact path="/favorite" component={Favorite}/>
                <Route exact path="/ordersummary" component={VisibleCart}/> 
                <Route exact path="/SignUp" component={Signup}/>
            </Router>
        </Provider>
    );
}

export default App;