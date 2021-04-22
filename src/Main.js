import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Home from "./Home";
import Summary from "./Summary";
import Order from "./OrderMatching";

class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <h1>Refferal Dashboard</h1>
                    <ul className="header">
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li><NavLink to="/Summary">Summary</NavLink></li>
                        <li><NavLink to="/OrderMatching">Order Matching</NavLink></li>
                        <li><NavLink to="/OrderSearch">Order Search</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Home} />
                        <Route path="/summary" component={Summary} />
                        <Route path="/OrderMatching" component={Order} />

                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default Main;
