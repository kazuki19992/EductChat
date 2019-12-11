import React from "react";
import { render } from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import Login from "./Login";
import Signup from "./Signup";
import Rooms from "./Rooms";
import Room from "./Room";
import firebase from "firebase/firebase-browser";

// Routingの定義を行う
const appRouting = (
    <Router history={hashHistory}>
        <Route path="/">
            <Route path = "login" component = {Login} />
            <Route path = "signup" component = {Signup} />
            <Route path = "rooms" component = {Rooms}>
                <Route path = "room" component = {Room} />
            </Route>
        </Route>
    </Router>
);

// Routingの初期化
if(!location.hash.length){
    location.hash = "#/login";
}

// Firebaseの初期化
const firebaseConfig = {
    apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "yyyyyyyy.firebaseapp.com",
    databaseURL: "https://yyyyyyyyyyy.firebaseio.com",
    projectId: "yyyyyyyyyy",
    storageBucket: "yyyyyyyyyy.appspot.com",
    messagingSenderId: "zzzzzzzzzzzzzzzzzzz",
    appId: "y:zzzzzzzzzzzzzzzzzzzz:web:xxxxxxxxxxxxxxxxxxxx",
    measurementId: "XXXXXXXXXXXXXXXXXXXXX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Applicationの描画
render(appRouting, document.getElementById("app"));
