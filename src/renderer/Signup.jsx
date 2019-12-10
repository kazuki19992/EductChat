import React from "react";
import { Link } from "react-router";

export default class Signup extends React.Component {
    render(){
        return(
            <div>
                <h2>Signup...</h2>
                <Link to="/rooms">Create new Account</Link> <br />
                <Link to="/login">Calcel</Link>
            </div>
        );
    }
}