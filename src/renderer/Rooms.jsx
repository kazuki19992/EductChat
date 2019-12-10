import React from "react";
import { Link } from "react-router";

export default class Rooms extends React.Component {
    render() {
        return (
            <div>
                <h2>Rooms...</h2>
                <ul>
                    <li><Link to="/rooms/1">Room 1</Link></li>
                    <li><Link to="/rooms/2">Room 2</Link></li>
                </ul>
                <div>{this.props.children}</div>
            </div>
        );
    }
}