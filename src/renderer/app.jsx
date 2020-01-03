import React from "react";
import { render } from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import Login from "./Login";
import Signup from "./Signup";
import Rooms from "./Rooms";
import Room from "./Room";
import firebase from "firebase/firebase-browser";

// Firebaseの初期化
const firebaseConfig = {
    apiKey: "AIzaSyAKNawBrTxK5ZIDMugNMTWupsN7e0x8SHU",
    authDomain: "eductchat.firebaseapp.com",
    databaseURL: "https://eductchat.firebaseio.com",
    projectId: "eductchat",
    storageBucket: "eductchat.appspot.com",
    messagingSenderId: "993742711394",
    appId: "1:993742711394:web:e80a20361c71f298267f3b",
    measurementId: "G-R0GNB73ELV"
};

// Routingの定義を行う
const appRouting = (
    <Router history={hashHistory}>
        <Route path="/">
            <Route path="login" component={Login} />
            <Route path="signup" component={Signup} />
            <Route path="rooms" component={Rooms}>
                <Route path=":roomId" component={Room} />
            </Route>
        </Route>
    </Router>
);

// Routingの初期化
if(!location.hash.length){
    location.hash = "#/login";
}


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Applicationの描画
render(appRouting, document.getElementById("app"));
